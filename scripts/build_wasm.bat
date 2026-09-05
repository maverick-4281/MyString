@echo off
echo Building MyString WebAssembly module using em++...

IF NOT EXIST "web\wasm" mkdir "web\wasm"

where em++ >nul 2>nul
IF %ERRORLEVEL% EQU 0 (
    echo Using em++ from PATH...
) ELSE IF EXIST "C:\Users\aditya\emsdk\emsdk_env.bat" (
    echo Activating EMSDK from C:\Users\aditya\emsdk...
    call "C:\Users\aditya\emsdk\emsdk_env.bat" >nul
) ELSE IF DEFINED EMSDK (
    echo Activating EMSDK from %EMSDK%...
    call "%EMSDK%\emsdk_env.bat" >nul
)

em++ --bind -O2 cpp\MyString.cpp cpp\bindings.cpp -o web\wasm\mystring.js -s WASM=1 -s EXPORTED_RUNTIME_METHODS="['ccall','cwrap']" -s ALLOW_MEMORY_GROWTH=1 -s SINGLE_FILE=0

IF %ERRORLEVEL% EQU 0 (
    echo WASM build successful! Module saved in web\wasm\mystring.js and mystring.wasm
) ELSE (
    echo WASM build failed!
)
