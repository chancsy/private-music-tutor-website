"""Generate the WhatsApp QR code used on the website and poster.

Usage:
    python generate_qr.py +60123456789

Requires: pip install qrcode[pil]
"""

import sys
from pathlib import Path

import qrcode

OUTPUT_PATH = Path(__file__).resolve().parent.parent / "assets" / "qr" / "whatsapp-qr.png"

PLACEHOLDER_NUMBER = "+60000000000"


def wa_link(phone_number: str) -> str:
    digits = "".join(ch for ch in phone_number if ch.isdigit())
    return f"https://wa.me/{digits}"


def main() -> None:
    phone_number = sys.argv[1] if len(sys.argv) > 1 else PLACEHOLDER_NUMBER
    if phone_number == PLACEHOLDER_NUMBER:
        print(f"No phone number given — using placeholder {PLACEHOLDER_NUMBER}.")
        print("Re-run with the real number once confirmed: python generate_qr.py +60123456789")

    link = wa_link(phone_number)
    img = qrcode.make(link, box_size=10, border=2)

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUTPUT_PATH)

    print(f"Encoded: {link}")
    print(f"Saved:   {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
