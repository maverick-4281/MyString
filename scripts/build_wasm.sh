#!/usr/bin/env bash
set -e

echo "Building MyString WebAssembly module using em++..."

mkdir -p web/wasm

if ! command -v em++ &> /dev/null; then
    if [ -n "$EMSDK" ] && [ -f "$EMSDK/emsdk_env.sh" ]; then
        source "$EMSDK/emsdk_env.sh"
    fi
fi

em++ --bind -O2 cpp/MyString.cpp cpp/bindings.cpp -o web/wasm/mystring.js -s WASM=1 -s EXPORTED_RUNTIME_METHODS="['ccall','cwrap']" -s ALLOW_MEMORY_GROWTH=1 -s SINGLE_FILE=0

echo "WASM build successful! Module saved in web/wasm/mystring.js and mystring.wasm"
