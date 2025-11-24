#!/usr/bin/env python3
"""
Add 'use client' to all admin page files that have buttons with onClick.
"""

from pathlib import Path

def add_use_client(file_path):
    """Add 'use client' directive if not present."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already has 'use client'
    if "'use client'" in content or '"use client"' in content:
        return False
    
    # Add 'use client' at the beginning
    new_content = "'use client';\n\n" + content
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    return True

def main():
    base = Path("/Users/aphilack/Downloads/namngarm-main-main")
    
    # All admin pages that have <button> elements
    files = [
        "src/app/admin/users/page.tsx",
        "src/app/admin/categories/[id]/edit/page.tsx",
        "src/app/admin/media/page.tsx",
        "src/app/admin/categories/page.tsx",
        "src/app/admin/dashboard/page.tsx",
        "src/app/admin/products/page.tsx",
        "src/app/admin/products/[id]/edit/page.tsx",
        "src/app/admin/quick-links/page.tsx",
        "src/app/admin/articles/page.tsx",
        "src/app/admin/faqs/FAQsClient.tsx",
        "src/app/admin/articles/[id]/edit/page.tsx",
        "src/app/admin/settings/page.tsx",
    ]
    
    updated = 0
    for file_rel in files:
        file_path = base / file_rel
        if file_path.exists():
            if add_use_client(file_path):
                print(f"✓ {file_rel}")
                updated += 1
            else:
                print(f"- {file_rel} (already has 'use client')")
        else:
            print(f"✗ {file_rel} (not found)")
    
    print(f"\nAdded 'use client' to {updated} files")

if __name__ == "__main__":
    main()
