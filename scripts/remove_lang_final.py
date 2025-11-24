#!/usr/bin/env python3
"""
Final pass - specifically target destructuring and property assignments in API routes.
"""

import re
from pathlib import Path

def remove_from_destructuring(content: str) -> str:
    """Remove _th and _zh from destructuring patterns."""
    # Pattern: { name_lo, name_th, name_zh, name_en, ... }
    def clean_destructure(match):
        items = [item.strip() for item in match.group(1).split(',')]
        # Keep only items that don't end with _th or _zh
        cleaned = [item for item in items if not re.search(r'\w+_(th|zh)$', item.strip())]
        return '{ ' + ', '.join(cleaned) + ' }'
    
    # Match destructuring patterns
    content = re.sub(
        r'\{\s*([^}]+)\s*\}',
        lambda m: clean_destructure(m) if any(x in m.group(1) for x in ['_th', '_zh']) else m.group(0),
        content
    )
    
    return content

def remove_from_objects(content: str) -> str:
    """Remove _th and _zh from object literals."""
    lines = content.split('\n')
    new_lines = []
    
    for line in lines:
        # Skip lines that are just property assignments like "name_th,"
        if re.match(r'^\s+\w+_(th|zh),?\s*$', line):
            continue
        new_lines.append(line)
    
    return '\n'.join(new_lines)

def process_file(file_path: Path) -> bool:
    """Process a single file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        
        # Remove from destructuring
        content = remove_from_destructuring(content)
        
        # Remove from object literals
        content = remove_from_objects(content)
        
        # Clean up
        content = re.sub(r'\n\s*\n\s*\n+', '\n\n', content)
        content = re.sub(r',(\s*[}\]])', r'\1', content)
        
        if content != original:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
        
    except Exception as e:
        print(f"Error: {e}")
        return False

def main():
    base = Path("/Users/aphilack/Downloads/namngarm-main-main")
    
    # Files that still have _th/_zh
    files = [
        "src/app/admin/settings/page.tsx",
        "src/app/admin/quick-links/page.tsx",
        "src/app/admin/faqs/FAQForm.tsx",
        "src/app/admin/media/page.tsx",
        "src/app/api/settings/route.ts",
        "src/app/api/products/route.ts",
        "src/app/api/products/[id]/route.ts",
        "src/app/api/articles/route.ts",
        "src/app/api/articles/[id]/route.ts",
        "src/app/api/about/route.ts",
        "src/app/api/tags/route.ts",
        "src/app/api/faqs/route.ts",
        "src/app/api/faq-categories/route.ts",
        "src/app/api/categories/route.ts",
        "src/components/AboutContent.tsx",
        "src/components/admin/forms/AboutForm.tsx",
        "src/components/product/ProductDetailClient.tsx",
        "src/components/product/PremiumProductCard.tsx",
    ]
    
    updated = 0
    for file_rel in files:
        file_path = base / file_rel
        if file_path.exists():
            if process_file(file_path):
                print(f"✓ {file_rel}")
                updated += 1
            else:
                print(f"- {file_rel}")
    
    print(f"\nUpdated {updated}/{len(files)} files")

if __name__ == "__main__":
    main()
