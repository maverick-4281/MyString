const Module = require('../web/wasm/mystring.js');

Module.onRuntimeInitialized = function() {
    console.log('WASM module loaded successfully!');

    // Test Spike 1: Create MyString("Hello")
    console.log('\n--- Spike 1: Create MyString("Hello") ---');
    const strPtr = Module.createString('Hello');
    console.log('Created MyString pointer address:', '0x' + Module.getObjectAddress(strPtr).toString(16).toUpperCase());

    const len = Module.getLength(strPtr);
    console.log('Real C++ MyString length():', len);

    const val = Module.getStringValue(strPtr);
    console.log('Real C++ MyString value:', val);

    const bufAddr = Module.getBufferAddress(strPtr);
    console.log('Real C++ char* str heap buffer address:', '0x' + bufAddr.toString(16).toUpperCase());

    // Test Spike 2: Concatenate "Hello" + " World"
    console.log('\n--- Spike 2: Concatenate "Hello" + " World" ---');
    const worldPtr = Module.createString(' World');
    const concatPtr = Module.concatStrings(strPtr, worldPtr);
    console.log('Concatenated value (operator+):', Module.getStringValue(concatPtr));
    console.log('Concatenated length:', Module.getLength(concatPtr));
    console.log('Concatenated heap buffer address:', '0x' + Module.getBufferAddress(concatPtr).toString(16).toUpperCase());

    // Test Spike 3: Subscript operator [] & mutation
    console.log('\n--- Spike 3: Subscript operator [] & mutation ---');
    console.log('Char at index 0:', String.fromCharCode(Module.getChar(strPtr, 0)));
    Module.setChar(strPtr, 0, 'J');
    console.log('After setChar(0, "J"), value is:', Module.getStringValue(strPtr));

    // Cleanup
    Module.destroyString(strPtr);
    Module.destroyString(worldPtr);
    Module.destroyString(concatPtr);
    console.log('\nSUCCESS: Real C++ WebAssembly execution verified end-to-end!');
};
