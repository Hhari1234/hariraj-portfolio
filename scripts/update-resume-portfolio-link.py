"""
Surgically repoint the "Portfolio" hyperlink in public/resume.pdf at the
canonical production URL.

Only the /URI value of a single link annotation is rewritten. The page content
streams (which carry the blue external-link styling) are verified to be
byte-identical before and after, and the extracted text must not change.

Usage: .venv/Scripts/python.exe scripts/update-resume-portfolio-link.py
"""

import hashlib
import sys

import pypdf
from pypdf.generic import TextStringObject

SRC = "public/resume.pdf"
OLD = "https://hariraj-portfolio-3hvj.vercel.app/"
NEW = "https://hariraj-portfolio-1.vercel.app"


def content_bytes(page):
    c = page.get("/Contents")
    if c is None:
        return b""
    return c.get_object().get_data() or b""


def snapshot(reader):
    return {
        "pages": len(reader.pages),
        "text": hashlib.sha256(
            "".join(p.extract_text() or "" for p in reader.pages).encode()
        ).hexdigest(),
        "streams": [
            hashlib.sha256(content_bytes(p)).hexdigest() for p in reader.pages
        ],
        "uris": [
            (i + 1, a.get_object()["/A"].get("/URI"))
            for i, p in enumerate(reader.pages)
            for a in (p.get("/Annots") or [])
            if a.get_object().get("/A")
            and a.get_object()["/A"].get("/URI")
        ],
        "fonts": [
            sorted(
                (p.get("/Resources", {}).get("/Font", {}) or {}).keys()
            )
            for p in reader.pages
        ],
    }


def main():
    reader = pypdf.PdfReader(SRC)
    before = snapshot(reader)
    print("BEFORE pages       :", before["pages"])
    print("BEFORE text sha256 :", before["text"])
    print("BEFORE stream sha  :", [s[:16] for s in before["streams"]])
    print("BEFORE uris        :", len(before["uris"]))

    changed = 0
    for page in reader.pages:
        for annot in page.get("/Annots") or []:
            obj = annot.get_object()
            action = obj.get("/A")
            if action and action.get("/URI") == OLD:
                action[TextStringObject("/URI")] = TextStringObject(NEW)
                changed += 1
    print("annotations rewritten:", changed)
    if changed != 1:
        print("ABORT: expected exactly 1 annotation to change")
        return 1

    writer = pypdf.PdfWriter()
    for page in reader.pages:
        writer.add_page(page)
    if reader.metadata:
        writer.add_metadata(
            {k: str(v) for k, v in reader.metadata.items() if v is not None}
        )
    with open(SRC, "wb") as fh:
        writer.write(fh)

    after = snapshot(pypdf.PdfReader(SRC))
    print("AFTER  pages       :", after["pages"])
    print("AFTER  text sha256 :", after["text"])
    print("AFTER  stream sha  :", [s[:16] for s in after["streams"]])
    print("AFTER  uris        :", len(after["uris"]))

    ok = True
    if before["pages"] != after["pages"]:
        print("FAIL: page count changed")
        ok = False
    if before["text"] != after["text"]:
        print("FAIL: extracted text changed")
        ok = False
    if before["streams"] != after["streams"]:
        print("FAIL: content streams changed (styling may differ)")
        ok = False
    if before["fonts"] != after["fonts"]:
        print("FAIL: font resources changed")
        ok = False
    expected_uris = [
        (pg, NEW if u == OLD else u) for pg, u in before["uris"]
    ]
    if expected_uris != after["uris"]:
        print("FAIL: annotation set changed unexpectedly")
        for e, a in zip(expected_uris, after["uris"]):
            if e != a:
                print(f"   expected {e} got {a}")
        ok = False
    else:
        print("OK: only the portfolio URI differs; all other links preserved")

    print("RESULT:", "PASS" if ok else "FAIL")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
