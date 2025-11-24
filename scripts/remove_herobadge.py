#!/usr/bin/env python3
import re

files = [
    'src/app/api/public/settings/route.ts',
    'src/app/admin/settings/page.tsx',
    'src/components/AboutContent.tsx'
]

for filepath in files:
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        
        original = content
        
        # Remove heroBadge lines
        lines = content.split('\n')
        new_lines = [line for line in lines if 'heroBadge' not in line]
        content = '\n'.join(new_lines)
        
        # Clean up
        content = re.sub(r'\n\s*\n\s*\n+', '\n\n', content)
        
        if content != original:
            with open(filepath, 'w') as f:
                f.write(content)
            print(f'✓ {filepath}')
        else:
            print(f'- {filepath} (no changes)')
    except Exception as e:
        print(f'✗ {filepath}: {e}')
