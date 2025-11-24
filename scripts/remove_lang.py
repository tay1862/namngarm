#!/usr/bin/env python3
"""
Comprehensive script to remove Thai (_th) and Chinese (_zh) language fields.
This will update TypeScript/TSX files to only support Lao (lo) and English (en).
"""

import re
import sys
from pathlib import Path

def remove_th_zh_from_file(file_path: Path) -> bool:
    """Remove _th and _zh fields from a single file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        
        # 1. Remove type/interface field definitions
        content = re.sub(r'^\s+\w+_(th|zh):.*?;\s*$', '', content, flags=re.MULTILINE)
        
        # 2. Remove object property assignments (e.g., name_th: '',)
        content = re.sub(r'^\s+\w+_(th|zh):\s*[^,]+,?\s*$', '', content, flags=re.MULTILINE)
        
        # 3. Remove HTML input/textarea elements for _th/_zh
        # Match multi-line div blocks containing name_th or name_zh
        content = re.sub(
            r'<div[^>]*>\s*<label[^>]*>(?:Thai|Chinese|ไทย|中文)[^<]*</label>\s*<(?:input|textarea)[^>]*name="[^"]*_(th|zh)"[^>]*(?:/>|>[^<]*</(?:input|textarea)>)\s*</div>',
            '',
            content,
            flags=re.DOTALL | re.MULTILINE
        )
        
        # 4. Remove grid column items for Thai/Chinese
        content = re.sub(
            r'<div>\s*<label[^>]*>(?:Thai|Chinese|ไทย|中文)[^<]*</label>\s*<(?:input|textarea)[^>]*name="[^"]*_(th|zh)"[^>]*(?:/>|>[^<]*</(?:input|textarea)>)\s*</div>',
            '',
            content,
            flags=re.DOTALL
        )
        
        # 5. Remove language tab entries
        content = re.sub(
            r"{\s*code:\s*'(th|zh)',\s*label:\s*'[^']+',\s*flag:\s*'[^']+'\s*},?\s*",
            '',
            content
        )
        
        # 6. Clean up empty lines (max 2 consecutive)
        content = re.sub(r'\n\s*\n\s*\n+', '\n\n', content)
        
        # 7. Fix trailing commas in arrays/objects
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
    
    # Files to process (from our earlier search)
    files = [
        "src/app/admin/articles/[id]/edit/page.tsx",
        "src/app/admin/categories/[id]/edit/page.tsx",
        "src/app/admin/faqs/FAQForm.tsx",
        "src/app/admin/faqs/FAQsClient.tsx",
        "src/app/admin/media/page.tsx",
        "src/app/admin/products/[id]/edit/page.tsx",
        "src/app/admin/quick-links/page.tsx",
        "src/app/admin/settings/page.tsx",
        "src/app/api/about/route.ts",
        "src/app/api/articles/[id]/route.ts",
        "src/app/api/articles/route.ts",
        "src/app/api/categories/route.ts",
        "src/app/api/faq-categories/route.ts",
        "src/app/api/faqs/[id]/route.ts",
        "src/app/api/faqs/route.ts",
        "src/app/api/products/[id]/route.ts",
        "src/app/api/products/route.ts",
        "src/app/api/public/settings/route.ts",
        "src/app/api/settings/route.ts",
        "src/app/api/tags/route.ts",
        "src/app/api/upload/[id]/route.ts",
        "src/components/admin/forms/AboutForm.tsx",
    ]
    
    updated = 0
    for file_rel in files:
        file_path = base / file_rel
        if file_path.exists():
            if remove_th_zh_from_file(file_path):
                print(f"✓ {file_rel}")
                updated += 1
            else:
                print(f"- {file_rel} (no changes)")
        else:
            print(f"✗ {file_rel} (not found)")
    
    print(f"\nUpdated {updated}/{len(files)} files")

if __name__ == "__main__":
    main()
