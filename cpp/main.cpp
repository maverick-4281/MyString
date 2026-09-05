#include "MyString.h"
#include <iostream>
using namespace std;

int main() {
    cout << "=== MyString Native C++ Test Suite ===" << endl;

    MyString s1("Hello");
    MyString s2("World");

    cout << "s1 = " << s1 << " (len: " << s1.length() << ")" << endl;
    cout << "s2 = " << s2 << " (len: " << s2.length() << ")" << endl;

    MyString s3 = s1 + MyString(" ") + s2;
    cout << "s1 + s2 = " << s3 << endl;

    MyString s4("Hello");
    cout << "s1 == s4: " << (s1 == s4 ? "true" : "false") << endl;

    s1[0] = 'J';
    cout << "after s1[0] = 'J': " << s1 << endl;

    // Palindrome Test
    MyString pal1("racecar");
    MyString pal2("hello");
    cout << "isPalindrome('racecar'): " << (pal1.isPalindrome() ? "true" : "false") << endl;
    cout << "isPalindrome('hello'): " << (pal2.isPalindrome() ? "true" : "false") << endl;

    // Reverse Test
    MyString rev = s2.reverse();
    cout << "reverse('World'): " << rev << endl;

    // Find Test
    MyString text("hello world from MyString");
    MyString target("world");
    cout << "find('world' in '" << text << "'): " << text.find(target) << endl;

    // Count & Vowels Test
    MyString banana("banana");
    cout << "count('a' in 'banana'): " << banana.count('a') << endl;
    cout << "countVowels('banana'): " << banana.countVowels() << endl;

    // Substring Test
    MyString sub = text.substring(6, 5);
    cout << "substring(6, 5) of '" << text << "': " << sub << endl;

    // Case Conversion Test
    cout << "toUpper('Hello'): " << s4.toUpper() << endl;
    cout << "toLower('World'): " << s2.toLower() << endl;

    // Anagram Test
    MyString ana1("listen");
    MyString ana2("silent");
    cout << "isAnagram('listen', 'silent'): " << (ana1.isAnagram(ana2) ? "true" : "false") << endl;

    // Word Count & Trim Test
    MyString spaced("   Hello world from MyString   ");
    cout << "wordCount: " << spaced.wordCount() << endl;
    cout << "trim: '" << spaced.trim() << "'" << endl;

    // Replace Test
    MyString rep = text.replace(MyString("world"), MyString("antigravity"));
    cout << "replace('world' -> 'antigravity'): " << rep << endl;

    cout << "\nAll native C++ tests completed successfully!" << endl;
    return 0;
}
