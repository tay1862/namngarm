#!/usr/bin/env python3
"""
Add 'use client' to all admin form components that don't have it.
"""

import os
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
    
    # Files to update
    files = [
        "src/components/admin/forms/ImageUploader.tsx",
        "src/components/admin/forms/RichTextEditor.tsx",
        "src/components/admin/forms/EnhancedRichTextEditor.tsx",
        "src/components/admin/forms/ArticleForm.tsx",
        "src/components/admin/forms/AboutForm.tsx",
        "src/components/admin/forms/ImagePicker.tsx",
        "src/components/admin/forms/ProductForm.tsx",
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
