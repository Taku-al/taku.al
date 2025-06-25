#!/bin/bash

# Version Management Script
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

# Function to get current version
get_current_version() {
    node -p "require('./package.json').version"
}

# Function to update version
update_version() {
    local version_type=$1
    local current_version=$(get_current_version)
    
    print_header "Version Management"
    print_status "Current version: $current_version"
    
    case $version_type in
        "patch")
            print_status "Bumping patch version..."
            npm version patch --workspaces
            ;;
        "minor")
            print_status "Bumping minor version..."
            npm version minor --workspaces
            ;;
        "major")
            print_status "Bumping major version..."
            npm version major --workspaces
            ;;
        *)
            print_error "Invalid version type. Use: patch, minor, or major"
            exit 1
            ;;
    esac
    
    local new_version=$(get_current_version)
    print_status "New version: $new_version"
    
    # Create git tag
    print_status "Creating git tag..."
    git add .
    git commit -m "chore: bump version to $new_version"
    git tag -a "v$new_version" -m "Release version $new_version"
    
    print_status "Version updated successfully!"
    print_status "Don't forget to: git push && git push --tags"
}

# Function to show version history
show_version_history() {
    print_header "Version History"
    git tag --sort=-version:refname | head -10
}

# Function to show current status
show_status() {
    print_header "Current Status"
    print_status "Root version: $(get_current_version)"
    print_status "API version: $(node -p "require('./api/package.json').version")"
    print_status "Client version: $(node -p "require('./client/package.json').version")"
    echo
    print_status "Git status:"
    git status --porcelain
}

# Main script logic
case "${1:-}" in
    "patch")
        update_version "patch"
        ;;
    "minor")
        update_version "minor"
        ;;
    "major")
        update_version "major"
        ;;
    "status")
        show_status
        ;;
    "history")
        show_version_history
        ;;
    *)
        echo "Usage: $0 {patch|minor|major|status|history}"
        echo
        echo "Commands:"
        echo "  patch   - Bump patch version (1.0.0 -> 1.0.1)"
        echo "  minor   - Bump minor version (1.0.0 -> 1.1.0)"
        echo "  major   - Bump major version (1.0.0 -> 2.0.0)"
        echo "  status  - Show current version status"
        echo "  history - Show version history"
        exit 1
        ;;
esac 