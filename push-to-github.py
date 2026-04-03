#!/usr/bin/env python3
"""Push all tracked git files to GitHub via REST API.
This bypasses the broken git push on this system.
"""
import subprocess
import json
import base64
import os
import sys

OWNER = "WGhaly"
REPO = "SGAD"
BRANCH = "main"

def gh_api(endpoint, method="GET", data=None, allow_fail=False):
    """Call GitHub API via gh CLI."""
    cmd = ["gh", "api", endpoint, "--method", method]
    if data:
        cmd.extend(["--input", "-"])
    result = subprocess.run(cmd, capture_output=True, text=True,
                          input=json.dumps(data) if data else None)
    if result.returncode != 0:
        if allow_fail:
            return None
        print(f"API Error: {endpoint}", file=sys.stderr)
        print(result.stderr, file=sys.stderr)
        sys.exit(1)
    return json.loads(result.stdout) if result.stdout.strip() else {}

def get_commit_sha():
    """Get current local HEAD commit SHA."""
    result = subprocess.run(["git", "rev-parse", "HEAD"], capture_output=True, text=True)
    return result.stdout.strip()

def get_tracked_files():
    """Get all tracked files (including staged new ones)."""
    result = subprocess.run(["git", "ls-files"], capture_output=True, text=True)
    return result.stdout.strip().split('\n')

def is_binary(filepath):
    """Check if a file is binary."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            f.read(8192)
        return False
    except (UnicodeDecodeError, ValueError):
        return True

def create_blob(filepath):
    """Create a blob on GitHub for a file."""
    if is_binary(filepath):
        with open(filepath, 'rb') as f:
            content = base64.b64encode(f.read()).decode('ascii')
        encoding = "base64"
    else:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        encoding = "utf-8"
    
    data = {"content": content, "encoding": encoding}
    result = gh_api(f"/repos/{OWNER}/{REPO}/git/blobs", "POST", data)
    return result["sha"]

def main():
    os.chdir(subprocess.run(["git", "rev-parse", "--show-toplevel"], 
                           capture_output=True, text=True).stdout.strip())
    
    files = get_tracked_files()
    print(f"Found {len(files)} tracked files")
    
    # Create blobs for all files
    tree_items = []
    for i, filepath in enumerate(files):
        if not os.path.exists(filepath):
            print(f"  SKIP (missing): {filepath}")
            continue
        print(f"  [{i+1}/{len(files)}] Creating blob: {filepath}")
        blob_sha = create_blob(filepath)
        
        # Determine file mode
        if os.access(filepath, os.X_OK):
            mode = "100755"
        else:
            mode = "100644"
        
        tree_items.append({
            "path": filepath,
            "mode": mode,
            "type": "blob",
            "sha": blob_sha
        })
    
    print(f"\nCreating tree with {len(tree_items)} items...")
    tree_data = {"tree": tree_items}
    tree_result = gh_api(f"/repos/{OWNER}/{REPO}/git/trees", "POST", tree_data)
    tree_sha = tree_result["sha"]
    print(f"Tree SHA: {tree_sha}")
    
    # Get the local commit info for the commit message
    commit_msg = subprocess.run(
        ["git", "log", "-1", "--format=%B"], capture_output=True, text=True
    ).stdout.strip()
    
    commit_author = subprocess.run(
        ["git", "log", "-1", "--format=%an"], capture_output=True, text=True
    ).stdout.strip()
    
    commit_email = subprocess.run(
        ["git", "log", "-1", "--format=%ae"], capture_output=True, text=True
    ).stdout.strip()
    
    # Get the current remote HEAD to use as parent (if it exists)
    remote_ref = gh_api(f"/repos/{OWNER}/{REPO}/git/ref/heads/{BRANCH}", allow_fail=True)
    if remote_ref:
        remote_sha = remote_ref["object"]["sha"]
        parents = [remote_sha]
        print(f"\nCreating commit (parent: {remote_sha[:7]}...)...")
    else:
        parents = []
        print(f"\nCreating orphan commit...")
    
    print(f"  Message: {commit_msg[:80]}...")
    
    commit_data = {
        "message": commit_msg,
        "tree": tree_sha,
        "parents": parents,
        "author": {
            "name": commit_author,
            "email": commit_email
        }
    }
    commit_result = gh_api(f"/repos/{OWNER}/{REPO}/git/commits", "POST", commit_data)
    commit_sha = commit_result["sha"]
    print(f"Commit SHA: {commit_sha}")
    
    # Force update the branch ref
    print(f"\nForce-updating refs/heads/{BRANCH} to {commit_sha}...")
    ref_data = {"sha": commit_sha, "force": True}
    gh_api(f"/repos/{OWNER}/{REPO}/git/refs/heads/{BRANCH}", "PATCH", ref_data)
    
    print(f"\nDone! Branch '{BRANCH}' now points to {commit_sha}")
    print("Vercel should pick up this commit for a new deployment.")

if __name__ == "__main__":
    main()
