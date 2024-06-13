#!/bin/bash

index_html_path="./../resources/static/index.html"
assets_folder_path="./../resources/static/assets"
build_folder="./dist"

# Check if index.html and assets folder exist
if [ -e "$index_html_path" ] && [ -d "$assets_folder_path" ]; then
    # If both exist, remove them
    rm "$index_html_path"
    rm -r "$assets_folder_path"
    echo "Removed existing index.html and assets folder"
fi

# Copy new index.html and assets folder from "../build"
cp "$build_folder/index.html" "$index_html_path"
cp -r "$build_folder/assets" "$assets_folder_path"

echo "Copied new index.html and assets folder from $build_folder"
