#!/usr/bin/env python3
"""
Ultra-aggressive final pass - remove ALL _th and _zh references including string literals.
"""

import re
from pathlib import Path

def ultra_clean(content: str) -> str:
    """Remove all _th/_zh references aggressively."""
    lines = content.split('\n')
    cleaned = []
    
    for line in lines:
        # Skip any line containing '_th' or '_zh' (except in comments about locale)
        if ('_th' in line or '_zh' in line) and 'locale' not in line.lower():
            # But keep lines that are just accessing locale (like locale === 'th')
            if re.search(r"locale\s*===?\s*['\"](?:th|zh)['\"]", line):
                cleaned.append(line)
            continue
        cleaned.append(line)
    
    content = '\n'.join(cleaned)
    
    # Clean up multiple empty lines
    content = re.sub(r'\n\s*\n\s*\n+', '\n\n', content)
    
    # Fix trailing commas in arrays/objects
    content = re.sub(r',(\s*[}\]])', r'\1', content)
    
    return content

def process(file_path: Path) -> bool:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        content = ultra_clean(content)
        
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
    
    files = [
        "src/app/admin/settings/page.tsx",
        "src/app/admin/quick-links/page.tsx",
        "src/app/admin/faqs/FAQForm.tsx",
        "src/app/admin/media/page.tsx",
        "src/app/api/articles/route.ts",
        "src/app/api/tags/route.ts",
        "src/components/AboutContent.tsx",
        "src/components/admin/forms/AboutForm.tsx",
        "src/components/product/ProductDetailClient.tsx",
        "src/components/product/PremiumProductCard.tsx",
    ]
    
    updated = 0
    for file_rel in files:
        file_path = base / file_rel
        if file_path.exists():
            if process(file_path):
                print(f"✓ {file_rel}")
                updated += 1
            else:
                print(f"- {file_rel}")
    
    print(f"\nCleaned {updated}/{len(files)} files")

if __name__ == "__main__":
    main()
