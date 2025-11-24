#!/usr/bin/env python3
"""
Script to remove Thai (_th) and Chinese (_zh) language fields from TypeScript/TSX files.
This will clean up forms, APIs, and type definitions to only support Lao (lo) and English (en).
"""

import re
import os
from pathlib import Path

def remove_language_fields(content: str, lang_suffix: str) -> str:
    """Remove all occurrences of fields with the given language suffix."""
    
    # Pattern 1: Remove lines with field definitions (e.g., name_th: string)
    content = re.sub(rf'^\s*\w+{lang_suffix}:.*?[,;]\s*$', '', content, flags=re.MULTILINE)
    
    # Pattern 2: Remove lines with zod schema definitions (e.g., name_th: z.string())
    content = re.sub(rf'^\s*\w+{lang_suffix}:\s*z\..*?[,;]\s*$', '', content, flags=re.MULTILINE)
    
    # Pattern 3: Remove lines with default values (e.g., name_th: '',)
    content = re.sub(rf'^\s*\w+{lang_suffix}:\s*[\'"].*?[\'"],?\s*$', '', content, flags=re.MULTILINE)
    
    # Pattern 4: Remove lines with initialData assignments (e.g., name_th: initialData?.name_th || '',)
    content = re.sub(rf'^\s*\w+{lang_suffix}:\s*.*?\|\|.*?[,;]\s*$', '', content, flags=re.MULTILINE)
    
    # Pattern 5: Remove Input/Textarea components with name_th/name_zh
    content = re.sub(rf'<(?:Input|Textarea)[^>]*name="{lang_suffix}"[^>]*>.*?</(?:Input|Textarea)>', '', content, flags=re.DOTALL)
    content = re.sub(rf'<(?:Input|Textarea)[^>]*name="{lang_suffix}"[^>]*/>', '', content)
    
    # Pattern 6: Remove onChange handlers for _th/_zh fields
    content = re.sub(rf"onChange=\{{.*?'{lang_suffix}'.*?\}}", '', content)
    
    # Clean up multiple empty lines
    content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)
    
    return content

def process_file(file_path: Path):
    """Process a single file to remove _th and _zh fields."""
    print(f"Processing: {file_path}")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Remove _th fields
        content = remove_language_fields(content, '_th')
        
        # Remove _zh fields  
        content = remove_language_fields(content, '_zh')
        
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  ✓ Updated {file_path}")
            return True
        else:
            print(f"  - No changes needed for {file_path}")
            return False
            
    except Exception as e:
        print(f"  ✗ Error processing {file_path}: {e}")
        return False

def main():
    base_path = Path("/Users/aphilack/Downloads/namngarm-main-main")
    
    # Directories to process
    directories = [
        base_path / "src/components/admin/forms",
        base_path / "src/app/admin",
        base_path / "src/app/api",
    ]
    
    files_processed = 0
    files_updated = 0
    
    for directory in directories:
        if not directory.exists():
            print(f"Directory not found: {directory}")
            continue
            
        print(f"\nProcessing directory: {directory}")
        
        # Find all .ts and .tsx files
        for file_path in directory.rglob("*.ts*"):
            if file_path.is_file():
                files_processed += 1
                if process_file(file_path):
                    files_updated += 1
    
    print(f"\n{'='*60}")
    print(f"Summary:")
    print(f"  Files processed: {files_processed}")
    print(f"  Files updated: {files_updated}")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()
