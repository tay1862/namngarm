#!/usr/bin/env python3
import re

with open('prisma/schema.prisma', 'r') as f:
    content = f.read()

# Make _th and _zh fields optional by adding ? if not already present
lines = content.split('\n')
new_lines = []

for line in lines:
    # Check if line contains _th or _zh field definition
    if re.search(r'(\w+_(th|zh))\s+(String|Json)\s*(@|$)', line):
        # Check if it's not already optional
        if '?' not in line.split('@')[0]:  # Check before any @ attributes
            # Add ? after the type
            line = re.sub(r'(\w+_(th|zh)\s+)(String|Json)(\s+)', r'\1\3?\4', line)
    new_lines.append(line)

content = '\n'.join(new_lines)

with open('prisma/schema.prisma', 'w') as f:
    f.write(content)

print('✓ Updated Prisma schema - all _th and _zh fields are now optional')
