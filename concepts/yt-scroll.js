/* YouTube players that auto-play (muted) when their section is on screen, via the IFrame Player API.
   Browsers only allow un-gestured autoplay when muted, so pages expose a [data-sound-toggle] button.
   Usage: var p = YTScroll.create(container, videoId, { controls: false, start: 0 });
          YTScroll.play(p) / YTScroll.pause(p) / YTScroll.load(p, otherId, start) */
(function () {
  var players = [], apiReady = false, pending = [], muted = true, seq = 0;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.onYouTubeIframeAPIReady = function () {
    apiReady = true;
    pending.forEach(function (fn) { fn(); });
    pending = [];
  };
  var s = document.createElement('script');
  s.src = 'https://www.youtube.com/iframe_api';
  s.async = true;
  document.head.appendChild(s);

  function poster(container, videoId) {
    container.style.backgroundImage = 'url(https://i.ytimg.com/vi/' + videoId + '/maxresdefault.jpg)';
  }

  function create(container, videoId, opts) {
    opts = opts || {};
    // Each mount needs its own id: the API routes player events by iframe id, so id-less mounts collide.
    var mount = document.createElement('div');
    mount.id = 'yt-player-' + (++seq);
    container.appendChild(mount);
    poster(container, videoId);
    var entry = { container: container, id: videoId, start: opts.start || 0, player: null, ready: false, wantPlay: false, pendingLoad: null };
    function build() {
      entry.player = new YT.Player(mount, {
        host: 'https://www.youtube-nocookie.com',
        videoId: videoId,
        playerVars: {
          autoplay: 0, mute: 1, controls: (opts.controls || reduced) ? 1 : 0, loop: 1, playlist: videoId,
          playsinline: 1, rel: 0, iv_load_policy: 3, disablekb: 1, start: opts.start || 0
        },
        events: {
          onReady: function () {
            entry.ready = true;
            entry.player.mute();
            if (entry.pendingLoad) { var l = entry.pendingLoad; entry.pendingLoad = null; load(entry, l.id, l.start); }
            if (entry.wantPlay && !reduced) entry.player.playVideo();
          },
          // 101/150 = the owner does not allow this video in embedded players; pick another video.
          onError: function (e) {
            entry.error = e.data;
            if (window.console) console.warn('YouTube player error ' + e.data + ' for video ' + entry.id);
          }
        }
      });
    }
    apiReady ? build() : pending.push(build);
    players.push(entry);
    return entry;
  }

  function play(entry) {
    entry.wantPlay = true;
    if (entry.ready && !reduced) { if (!muted) entry.player.unMute(); entry.player.playVideo(); }
  }
  function pause(entry) {
    entry.wantPlay = false;
    if (entry.ready) entry.player.pauseVideo();
  }
  function load(entry, videoId, start) {
    start = start || 0;
    if (entry.id === videoId) {
      // Same video, different section: just jump to that section's start point.
      if (entry.ready && entry.start !== start) entry.player.seekTo(start, true);
      entry.start = start;
      return;
    }
    entry.id = videoId;
    entry.start = start;
    poster(entry.container, videoId);
    if (!entry.ready) { entry.pendingLoad = { id: videoId, start: start }; return; }
    entry.player.loadVideoById({ videoId: videoId, startSeconds: start });
    if (!entry.wantPlay || reduced) entry.player.pauseVideo();
  }
  function setMuted(m) {
    muted = m;
    players.forEach(function (p) { if (p.ready) { m ? p.player.mute() : p.player.unMute(); } });
    document.documentElement.dataset.sound = m ? 'off' : 'on';
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-sound-toggle]');
    if (t) setMuted(!muted);
  });
  document.documentElement.dataset.sound = 'off';

  window.YTScroll = { create: create, play: play, pause: pause, load: load, setMuted: setMuted, reduced: reduced, players: players };
})();
