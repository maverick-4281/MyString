#include "MyString.h"

// finds length of a normal c-string
int MyString::getLen(const char* s) const {
    if (s == nullptr) return 0;
    int count = 0;
    while (s[count] != '\0') {
        count++;
    }
    return count;
}

MyString::MyString() {
    len = 0;
    str = new char[1];
    str[0] = '\0';
}

MyString::MyString(const char* s) {
    if (s == nullptr) {
        len = 0;
        str = new char[1];
        str[0] = '\0';
    } else {
        len = getLen(s);
        str = new char[len + 1];
        for (int i = 0; i < len; i++) {
            str[i] = s[i];
        }
        str[len] = '\0';
    }
}

// deep copy, so both objects don't point to the same memory
MyString::MyString(const MyString& other) {
    len = other.len;
    str = new char[len + 1];
    for (int i = 0; i < len; i++) {
        str[i] = other.str[i];
    }
    str[len] = '\0';
}

MyString::~MyString() {
    delete[] str;
}

MyString& MyString::operator=(const MyString& other) {
    if (this == &other) {
        return *this;
    }

    char* newStr = new char[other.len + 1];
    for (int i = 0; i < other.len; i++) {
        newStr[i] = other.str[i];
    }
    newStr[other.len] = '\0';

    delete[] str;
    str = newStr;
    len = other.len;

    return *this;
}

MyString MyString::operator+(const MyString& other) const {
    int newLen = len + other.len;
    char* buffer = new char[newLen + 1];

    for (int i = 0; i < len; i++) {
        buffer[i] = str[i];
    }
    for (int i = 0; i < other.len; i++) {
        buffer[len + i] = other.str[i];
    }
    buffer[newLen] = '\0';

    MyString result(buffer);
    delete[] buffer;
    return result;
}

bool MyString::operator==(const MyString& other) const {
    if (len != other.len) {
        return false;
    }
    for (int i = 0; i < len; i++) {
        if (str[i] != other.str[i]) {
            return false;
        }
    }
    return true;
}

char& MyString::operator[](int index) {
    return str[index];
}

const char& MyString::operator[](int index) const {
    return str[index];
}

std::ostream& operator<<(std::ostream& out, const MyString& s) {
    out << s.str;
    return out;
}

std::istream& operator>>(std::istream& in, MyString& s) {
    char buffer[1000];
    in >> buffer;

    delete[] s.str;
    s.len = s.getLen(buffer);
    s.str = new char[s.len + 1];
    for (int i = 0; i < s.len; i++) {
        s.str[i] = buffer[i];
    }
    s.str[s.len] = '\0';

    return in;
}

int MyString::length() const {
    return len;
}

const char* MyString::c_str() const {
    return str;
}

// Check if string is a palindrome (two-pointer approach)
bool MyString::isPalindrome() const {
    if (len <= 1) return true;
    int left = 0;
    int right = len - 1;
    while (left < right) {
        if (str[left] != str[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

// Return a new MyString with reversed characters
MyString MyString::reverse() const {
    char* buffer = new char[len + 1];
    for (int i = 0; i < len; i++) {
        buffer[i] = str[len - 1 - i];
    }
    buffer[len] = '\0';

    MyString res(buffer);
    delete[] buffer;
    return res;
}

// Search for substring; returns first index or -1 if not found
int MyString::find(const MyString& sub) const {
    if (sub.len == 0) return 0;
    if (sub.len > len) return -1;

    for (int i = 0; i <= len - sub.len; i++) {
        bool match = true;
        for (int j = 0; j < sub.len; j++) {
            if (str[i + j] != sub.str[j]) {
                match = false;
                break;
            }
        }
        if (match) return i;
    }
    return -1;
}

// Count occurrences of a specific character
int MyString::count(char ch) const {
    int count = 0;
    for (int i = 0; i < len; i++) {
        if (str[i] == ch) {
            count++;
        }
    }
    return count;
}

// Extract substring starting at 'start' for 'count' characters
MyString MyString::substring(int start, int count) const {
    if (start < 0 || start >= len || count <= 0) {
        return MyString("");
    }
    int subLen = (start + count > len) ? (len - start) : count;
    char* buffer = new char[subLen + 1];
    for (int i = 0; i < subLen; i++) {
        buffer[i] = str[start + i];
    }
    buffer[subLen] = '\0';

    MyString res(buffer);
    delete[] buffer;
    return res;
}

// Convert all ASCII characters to uppercase
MyString MyString::toUpper() const {
    char* buffer = new char[len + 1];
    for (int i = 0; i < len; i++) {
        if (str[i] >= 'a' && str[i] <= 'z') {
            buffer[i] = str[i] - 32;
        } else {
            buffer[i] = str[i];
        }
    }
    buffer[len] = '\0';

    MyString res(buffer);
    delete[] buffer;
    return res;
}

// Convert all ASCII characters to lowercase
MyString MyString::toLower() const {
    char* buffer = new char[len + 1];
    for (int i = 0; i < len; i++) {
        if (str[i] >= 'A' && str[i] <= 'Z') {
            buffer[i] = str[i] + 32;
        } else {
            buffer[i] = str[i];
        }
    }
    buffer[len] = '\0';

    MyString res(buffer);
    delete[] buffer;
    return res;
}

// Count vowels (A, E, I, O, U case-insensitive)
int MyString::countVowels() const {
    int vowels = 0;
    for (int i = 0; i < len; i++) {
        char ch = str[i];
        if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u' ||
            ch == 'A' || ch == 'E' || ch == 'I' || ch == 'O' || ch == 'U') {
            vowels++;
        }
    }
    return vowels;
}

// Check if two strings are anagrams of each other
bool MyString::isAnagram(const MyString& other) const {
    if (len != other.len) return false;

    int freq[256] = {0};
    for (int i = 0; i < len; i++) {
        freq[(unsigned char)str[i]]++;
        freq[(unsigned char)other.str[i]]--;
    }
    for (int i = 0; i < 256; i++) {
        if (freq[i] != 0) return false;
    }
    return true;
}

// Count space-delimited words
int MyString::wordCount() const {
    int words = 0;
    bool inWord = false;
    for (int i = 0; i < len; i++) {
        char ch = str[i];
        if (ch != ' ' && ch != '\t' && ch != '\n' && ch != '\r') {
            if (!inWord) {
                words++;
                inWord = true;
            }
        } else {
            inWord = false;
        }
    }
    return words;
}

// Trim leading and trailing whitespace
MyString MyString::trim() const {
    if (len == 0) return MyString("");

    int start = 0;
    while (start < len && (str[start] == ' ' || str[start] == '\t' || str[start] == '\n' || str[start] == '\r')) {
        start++;
    }
    if (start == len) return MyString("");

    int end = len - 1;
    while (end >= start && (str[end] == ' ' || str[end] == '\t' || str[end] == '\n' || str[end] == '\r')) {
        end--;
    }

    return substring(start, end - start + 1);
}

// Replace occurrences of oldStr with newStr
MyString MyString::replace(const MyString& oldStr, const MyString& newStr) const {
    if (oldStr.len == 0 || len == 0) return *this;

    // Count occurrences of oldStr
    int countMatches = 0;
    int i = 0;
    while (i <= len - oldStr.len) {
        bool match = true;
        for (int j = 0; j < oldStr.len; j++) {
            if (str[i + j] != oldStr.str[j]) {
                match = false;
                break;
            }
        }
        if (match) {
            countMatches++;
            i += oldStr.len;
        } else {
            i++;
        }
    }

    if (countMatches == 0) return *this;

    int newLen = len + countMatches * (newStr.len - oldStr.len);
    char* buffer = new char[newLen + 1];

    int srcIdx = 0;
    int destIdx = 0;

    while (srcIdx < len) {
        bool match = false;
        if (srcIdx <= len - oldStr.len) {
            match = true;
            for (int j = 0; j < oldStr.len; j++) {
                if (str[srcIdx + j] != oldStr.str[j]) {
                    match = false;
                    break;
                }
            }
        }

        if (match) {
            for (int j = 0; j < newStr.len; j++) {
                buffer[destIdx++] = newStr.str[j];
            }
            srcIdx += oldStr.len;
        } else {
            buffer[destIdx++] = str[srcIdx++];
        }
    }
    buffer[destIdx] = '\0';

    MyString res(buffer);
    delete[] buffer;
    return res;
}
