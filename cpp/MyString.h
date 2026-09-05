#ifndef MYSTRING_H
#define MYSTRING_H

#include <iostream>

class MyString {
private:
    char* str;
    int len;

    int getLen(const char* s) const;

public:
    MyString();
    MyString(const char* s);
    MyString(const MyString& other);
    ~MyString();

    MyString& operator=(const MyString& other);
    MyString operator+(const MyString& other) const;
    bool operator==(const MyString& other) const;
    char& operator[](int index);
    const char& operator[](int index) const;

    friend std::ostream& operator<<(std::ostream& out, const MyString& s);
    friend std::istream& operator>>(std::istream& in, MyString& s);

    int length() const;
    const char* c_str() const;

    // Advanced String Algorithms & Utilities
    bool isPalindrome() const;
    MyString reverse() const;
    int find(const MyString& sub) const;
    int count(char ch) const;
    MyString substring(int start, int count) const;
    MyString toUpper() const;
    MyString toLower() const;
    int countVowels() const;
    bool isAnagram(const MyString& other) const;
    int wordCount() const;
    MyString trim() const;
    MyString replace(const MyString& oldStr, const MyString& newStr) const;
};

#endif
