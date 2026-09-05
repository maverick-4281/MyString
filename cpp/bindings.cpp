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

int getLength(MyString& str) {
    return str.length();
}

MyString* concatStrings(const MyString& a, const MyString& b) {
    MyString res = const_cast<MyString&>(a) + const_cast<MyString&>(b);
    return new MyString(res);
}

bool equalsStrings(const MyString& a, const MyString& b) {
    return const_cast<MyString&>(a) == const_cast<MyString&>(b);
}

char getChar(MyString& str, int index) {
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
}
