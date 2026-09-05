#include "MyString.h"
#include <emscripten/bind.h>
#include <string>
#include <cstdint>

using namespace emscripten;

// WebAssembly Binding Layer for MyString
// Exposes object creation, inspection, and operations to JS without modifying MyString core logic.

MyString* createString(std::string s) {
    return new MyString(s.c_str());
}

MyString* copyString(const MyString& other) {
    return new MyString(other);
}

void destroyString(MyString* str) {
    if (str != nullptr) {
        delete str;
    }
}

std::string getStringValue(const MyString& str) {
    return std::string(str.c_str());
}

int getLength(const MyString& str) {
    return str.length();
}

MyString* concatStrings(const MyString& a, const MyString& b) {
    MyString res = a + b;
    return new MyString(res);
}

bool equalsStrings(const MyString& a, const MyString& b) {
    return a == b;
}

char getChar(const MyString& str, int index) {
    if (index < 0 || index >= str.length()) {
        return '\0';
    }
    return str[index];
}

void setChar(MyString& str, int index, std::string chStr) {
    if (index >= 0 && index < str.length() && !chStr.empty()) {
        str[index] = chStr[0];
    }
}

void assignString(MyString& target, const MyString& source) {
    target = source;
}

uintptr_t getBufferAddress(const MyString& str) {
    return reinterpret_cast<uintptr_t>(str.c_str());
}

uintptr_t getObjectAddress(const MyString& str) {
    return reinterpret_cast<uintptr_t>(&str);
}

// Bindings for Expanded Algorithms
bool isPalindrome(const MyString& str) {
    return str.isPalindrome();
}

MyString* reverseString(const MyString& str) {
    MyString res = str.reverse();
    return new MyString(res);
}

int findString(const MyString& str, const MyString& sub) {
    return str.find(sub);
}

int countChar(const MyString& str, std::string chStr) {
    if (chStr.empty()) return 0;
    return str.count(chStr[0]);
}

MyString* substring(const MyString& str, int start, int count) {
    MyString res = str.substring(start, count);
    return new MyString(res);
}

MyString* toUpper(const MyString& str) {
    MyString res = str.toUpper();
    return new MyString(res);
}

MyString* toLower(const MyString& str) {
    MyString res = str.toLower();
    return new MyString(res);
}

int countVowels(const MyString& str) {
    return str.countVowels();
}

bool isAnagram(const MyString& a, const MyString& b) {
    return a.isAnagram(b);
}

int wordCount(const MyString& str) {
    return str.wordCount();
}

MyString* trimString(const MyString& str) {
    MyString res = str.trim();
    return new MyString(res);
}

MyString* replaceString(const MyString& str, const MyString& oldStr, const MyString& newStr) {
    MyString res = str.replace(oldStr, newStr);
    return new MyString(res);
}

EMSCRIPTEN_BINDINGS(mystring_module) {
    class_<MyString>("MyString")
        .constructor<>()
        .constructor<const char*>()
        .function("length", &MyString::length);

    function("createString", &createString, allow_raw_pointers());
    function("copyString", &copyString, allow_raw_pointers());
    function("destroyString", &destroyString, allow_raw_pointers());
    function("getStringValue", &getStringValue);
    function("getLength", &getLength);
    function("concatStrings", &concatStrings, allow_raw_pointers());
    function("equalsStrings", &equalsStrings);
    function("getChar", &getChar);
    function("setChar", &setChar);
    function("assignString", &assignString);
    function("getBufferAddress", &getBufferAddress);
    function("getObjectAddress", &getObjectAddress);

    // New Algorithms Bindings
    function("isPalindrome", &isPalindrome);
    function("reverseString", &reverseString, allow_raw_pointers());
    function("findString", &findString);
    function("countChar", &countChar);
    function("substring", &substring, allow_raw_pointers());
    function("toUpper", &toUpper, allow_raw_pointers());
    function("toLower", &toLower, allow_raw_pointers());
    function("countVowels", &countVowels);
    function("isAnagram", &isAnagram);
    function("wordCount", &wordCount);
    function("trimString", &trimString, allow_raw_pointers());
    function("replaceString", &replaceString, allow_raw_pointers());
}
