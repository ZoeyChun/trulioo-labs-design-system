#!/usr/bin/env python3
"""Read TDS-Component-Tracker.xlsx and print JSON for migrate-tracker-xlsx.mjs."""

import json
import sys
import zipfile
import xml.etree.ElementTree as ET

NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}


def cell_text(cell):
    if cell.get("t") == "inlineStr":
        is_el = cell.find("m:is", NS)
        if is_el is not None:
            return "".join(t.text or "" for t in is_el.findall(".//m:t", NS))
        return ""
    value = cell.find("m:v", NS)
    return value.text if value is not None else ""


def parse_sheet(zf, index):
    root = ET.fromstring(zf.read(f"xl/worksheets/sheet{index}.xml"))
    rows = root.findall(".//m:sheetData/m:row", NS)
    headers = [cell_text(cell) for cell in rows[0].findall("m:c", NS)]
    data = []
    for row in rows[1:]:
        values = [cell_text(cell) for cell in row.findall("m:c", NS)]
        if values and values[0]:
            data.append(dict(zip(headers, values)))
    return data


def main():
    path = sys.argv[1]
    with zipfile.ZipFile(path) as zf:
        payload = {
            "built": parse_sheet(zf, 1),
            "planned": parse_sheet(zf, 2),
        }
    print(json.dumps(payload))


if __name__ == "__main__":
    main()
