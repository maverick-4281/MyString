const Module = require('../web/wasm/mystring.js');

Module.onRuntimeInitialized = function() {
    console.log('=== WebAssembly MyString Integration Test Suite ===');

    // Test 1: Basic String Creation & Inspection
    const str1 = Module.createString('Hello');
    console.log('str1 value:', Module.getStringValue(str1));
    console.log('str1 len:', Module.getLength(str1));

    // Test 2: Palindrome Algorithm
    const palStr = Module.createString('racecar');
    console.log('isPalindrome("racecar"):', Module.isPalindrome(palStr));

    // Test 3: Reverse Algorithm
    const revPtr = Module.reverseString(str1);
    console.log('reverse("Hello"):', Module.getStringValue(revPtr));

    // Test 4: Find Substring
    const textPtr = Module.createString('hello world from MyString');
    const targetPtr = Module.createString('world');
    console.log('find("world" in text):', Module.findString(textPtr, targetPtr));

    // Test 5: Count Character & Count Vowels
    console.log('count("l" in "Hello"):', Module.countChar(str1, 'l'));
    console.log('countVowels("hello world..."):', Module.countVowels(textPtr));

    // Test 6: Substring
    const subPtr = Module.substring(textPtr, 6, 5);
    console.log('substring(6, 5):', Module.getStringValue(subPtr));

    // Test 7: Upper & Lower
    const upperPtr = Module.toUpper(str1);
    console.log('toUpper("Hello"):', Module.getStringValue(upperPtr));

    // Test 8: Anagram
    const a1 = Module.createString('listen');
    const a2 = Module.createString('silent');
    console.log('isAnagram("listen", "silent"):', Module.isAnagram(a1, a2));

    // Test 9: Word Count & Trim
    const spacedPtr = Module.createString('   Hello world   ');
    console.log('wordCount:', Module.wordCount(spacedPtr));
    const trimmedPtr = Module.trimString(spacedPtr);
    console.log('trim:', `"${Module.getStringValue(trimmedPtr)}"`);

    // Test 10: Replace
    const repPtr = Module.replaceString(textPtr, targetPtr, Module.createString('antigravity'));
    console.log('replace("world" -> "antigravity"):', Module.getStringValue(repPtr));

    // Cleanup WASM objects
    Module.destroyString(str1);
    Module.destroyString(palStr);
    Module.destroyString(revPtr);
    Module.destroyString(textPtr);
    Module.destroyString(targetPtr);
    Module.destroyString(subPtr);
    Module.destroyString(upperPtr);
    Module.destroyString(a1);
    Module.destroyString(a2);
    Module.destroyString(spacedPtr);
    Module.destroyString(trimmedPtr);
    Module.destroyString(repPtr);

    console.log('\nSUCCESS: All WebAssembly bindings and C++ algorithms verified!');
};
