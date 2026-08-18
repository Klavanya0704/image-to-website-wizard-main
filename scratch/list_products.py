import os
import re

with open(r'src/lib/catalog.ts', 'r', encoding='utf-8') as f:
    text = f.read()

pattern = r'id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*slug:\s*"([^"]+)",\s*category:\s*"([^"]+)"'
matches = re.findall(pattern, text)
print(f"Total catalog products in catalog.ts: {len(matches)}\n")
for i, m in enumerate(matches, 1):
    print(f"{i:2}. [{m[3]:18}] slug: {m[2]:45} | name: {m[1]}")
