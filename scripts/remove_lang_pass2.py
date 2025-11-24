#!/usr/bin/env python3
"""
Second pass - remove _th/_zh from remaining files including frontend components.
"""

import re
import sys
from pathlib import Path

def remove_th_zh_comprehensive(file_path: Path) -> bool:
    """More aggressive removal of _th and _zh fields."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        
        # Remove all lines containing _th or _zh assignments/definitions
        lines = content.split('\n')
        new_lines = []
        skip_next = False
        
        for i, line in enumerate(lines):
            # Skip lines with _th or _zh in property names/assignments
            if re.search(r'\w+_(th|zh)\s*[:=]', line):
                continue
            # Skip lines that are just accessing _th/_zh properties
            if re.search(r'\.\w+_(th|zh)\b', line) and 'locale' not in line.lower():
                continue
            # Keep the line
            new_lines.append(line)
        
        content = '\n'.join(new_lines)
        
        # Clean up multiple empty lines
        content = re.sub(r'\n\s*\n\s*\n+', '\n\n', content)
        
        # Fix trailing commas
        content = re.sub(r',(\s*[}\]])', r'\1', content)
        
        if content != original:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
        
    except Exception as e:
        print(f"Error processing {file_path}: {e}", file=sys.stderr)
        return False

def main():
    base = Path("/Users/aphilack/Downloads/namngarm-main-main")
    
    # Remaining files from search
    files = [
        "src/app/[locale]/products/[slug]/page.tsx",
        "src/app/[locale]/faq/FAQsClient.tsx",
        "src/app/[locale]/articles/[slug]/page.tsx",
        "src/app/[locale]/tags/[slug]/page.tsx",
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
        "src/components/layout/QuickLinks.tsx",
        "src/components/articles/ArticlesList.tsx",
        "src/components/admin/forms/AboutForm.tsx",
        "src/components/product/ProductDetailClient.tsx",
        "src/components/product/PremiumProductCard.tsx",
        "src/hooks/useSettings.ts",
    ]
    
    updated = 0
    for file_rel in files:
        file_path = base / file_rel
        if file_path.exists():
            if remove_th_zh_comprehensive(file_path):
                print(f"✓ {file_rel}")
                updated += 1
            else:
                print(f"- {file_rel} (no changes)")
        else:
            print(f"✗ {file_rel} (not found)")
    
    print(f"\nUpdated {updated}/{len(files)} files")

if __name__ == "__main__":
    main()
