// MyString Lab — Advanced C++ WebAssembly Workbench & Visualizer Controller

// C++ Source Snippets & Complexity Dictionary
const CPP_SNIPPETS = {
    // Core & Operators
    'concat': {
        complexity: 'Time: O(m + n) | Space: O(m + n)',
        code: `MyString MyString::operator+(const MyString& other) const {
    int newLen = len + other.len;
    char* buffer = new char[newLen + 1];

    for (int i = 0; i < len; i++) buffer[i] = str[i];
    for (int i = 0; i < other.len; i++) buffer[len + i] = other.str[i];
    buffer[newLen] = '\\0';

    MyString result(buffer);
    delete[] buffer;
    return result;
}`
    },
    'compare': {
        complexity: 'Time: O(n) | Space: O(1)',
        code: `bool MyString::operator==(const MyString& other) const {
    if (len != other.len) return false;
    for (int i = 0; i < len; i++) {
        if (str[i] != other.str[i]) return false;
    }
    return true;
}`
    },
    'copy': {
        complexity: 'Time: O(n) | Space: O(n)',
        code: `// Deep copy constructor
MyString::MyString(const MyString& other) {
    len = other.len;
    str = new char[len + 1];
    for (int i = 0; i < len; i++) str[i] = other.str[i];
    str[len] = '\\0';
}`
    },
    'mutate': {
        complexity: 'Time: O(1) | Space: O(1)',
        code: `char& MyString::operator[](int index) {
    return str[index];
}`
    },
    'assign': {
        complexity: 'Time: O(n) | Space: O(n)',
        code: `MyString& MyString::operator=(const MyString& other) {
    if (this == &other) return *this;

    char* newStr = new char[other.len + 1];
    for (int i = 0; i < other.len; i++) newStr[i] = other.str[i];
    newStr[other.len] = '\\0';

    delete[] str;   // Free old buffer
    str = newStr;   // Reassign pointer
    len = other.len;
    return *this;
}`
    },
    'length': {
        complexity: 'Time: O(1) | Space: O(1)',
        code: `int MyString::length() const {
    return len;
}`
    },

    // Algorithms
    'palindrome': {
        complexity: 'Time: O(n) | Space: O(1)',
        code: `bool MyString::isPalindrome() const {
    if (len <= 1) return true;
    int left = 0;
    int right = len - 1;
    while (left < right) {
        if (str[left] != str[right]) return false;
        left++;
        right--;
    }
    return true;
}`
    },
    'reverse': {
        complexity: 'Time: O(n) | Space: O(n)',
        code: `MyString MyString::reverse() const {
    char* buffer = new char[len + 1];
    for (int i = 0; i < len; i++) {
        buffer[i] = str[len - 1 - i];
    }
    buffer[len] = '\\0';

    MyString res(buffer);
    delete[] buffer;
    return res;
}`
    },
    'find': {
        complexity: 'Time: O(n * m) | Space: O(1)',
        code: `int MyString::find(const MyString& sub) const {
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
}`
    },
    'count': {
        complexity: 'Time: O(n) | Space: O(1)',
        code: `int MyString::count(char ch) const {
    int count = 0;
    for (int i = 0; i < len; i++) {
        if (str[i] == ch) count++;
    }
    return count;
}`
    },
    'substring': {
        complexity: 'Time: O(k) | Space: O(k)',
        code: `MyString MyString::substring(int start, int count) const {
    if (start < 0 || start >= len || count <= 0) return MyString("");
    int subLen = (start + count > len) ? (len - start) : count;
    char* buffer = new char[subLen + 1];
    for (int i = 0; i < subLen; i++) buffer[i] = str[start + i];
    buffer[subLen] = '\\0';

    MyString res(buffer);
    delete[] buffer;
    return res;
}`
    },
    'toUpper': {
        complexity: 'Time: O(n) | Space: O(n)',
        code: `MyString MyString::toUpper() const {
    char* buffer = new char[len + 1];
    for (int i = 0; i < len; i++) {
        if (str[i] >= 'a' && str[i] <= 'z') buffer[i] = str[i] - 32;
        else buffer[i] = str[i];
    }
    buffer[len] = '\\0';

    MyString res(buffer);
    delete[] buffer;
    return res;
}`
    },
    'toLower': {
        complexity: 'Time: O(n) | Space: O(n)',
        code: `MyString MyString::toLower() const {
    char* buffer = new char[len + 1];
    for (int i = 0; i < len; i++) {
        if (str[i] >= 'A' && str[i] <= 'Z') buffer[i] = str[i] + 32;
        else buffer[i] = str[i];
    }
    buffer[len] = '\\0';

    MyString res(buffer);
    delete[] buffer;
    return res;
}`
    },
    'vowels': {
        complexity: 'Time: O(n) | Space: O(1)',
        code: `int MyString::countVowels() const {
    int vowels = 0;
    for (int i = 0; i < len; i++) {
        char ch = str[i];
        if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u' ||
            ch == 'A' || ch == 'E' || ch == 'I' || ch == 'O' || ch == 'U') {
            vowels++;
        }
    }
    return vowels;
}`
    },
    'anagram': {
        complexity: 'Time: O(n) | Space: O(1)',
        code: `bool MyString::isAnagram(const MyString& other) const {
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
}`
    },
    'wordCount': {
        complexity: 'Time: O(n) | Space: O(1)',
        code: `int MyString::wordCount() const {
    int words = 0;
    bool inWord = false;
    for (int i = 0; i < len; i++) {
        char ch = str[i];
        if (ch != ' ' && ch != '\\t' && ch != '\\n' && ch != '\\r') {
            if (!inWord) { words++; inWord = true; }
        } else {
            inWord = false;
        }
    }
    return words;
}`
    },
    'trim': {
        complexity: 'Time: O(n) | Space: O(k)',
        code: `MyString MyString::trim() const {
    if (len == 0) return MyString("");
    int start = 0;
    while (start < len && (str[start] == ' ' || str[start] == '\\t' || str[start] == '\\n')) start++;
    if (start == len) return MyString("");
    int end = len - 1;
    while (end >= start && (str[end] == ' ' || str[end] == '\\t' || str[end] == '\\n')) end--;
    return substring(start, end - start + 1);
}`
    },
    'replace': {
        complexity: 'Time: O(n * m) | Space: O(n_new)',
        code: `MyString MyString::replace(const MyString& oldStr, const MyString& newStr) const {
    if (oldStr.len == 0 || len == 0) return *this;
    int countMatches = 0, i = 0;
    while (i <= len - oldStr.len) {
        bool match = true;
        for (int j = 0; j < oldStr.len; j++) {
            if (str[i + j] != oldStr.str[j]) { match = false; break; }
        }
        if (match) { countMatches++; i += oldStr.len; }
        else i++;
    }
    if (countMatches == 0) return *this;

    int newLen = len + countMatches * (newStr.len - oldStr.len);
    char* buffer = new char[newLen + 1];
    int srcIdx = 0, destIdx = 0;
    while (srcIdx < len) {
        bool match = (srcIdx <= len - oldStr.len);
        if (match) {
            for (int j = 0; j < oldStr.len; j++) {
                if (str[srcIdx + j] != oldStr.str[j]) { match = false; break; }
            }
        }
        if (match) {
            for (int j = 0; j < newStr.len; j++) buffer[destIdx++] = newStr.str[j];
            srcIdx += oldStr.len;
        } else {
            buffer[destIdx++] = str[srcIdx++];
        }
    }
    buffer[destIdx] = '\\0';
    MyString res(buffer);
    delete[] buffer;
    return res;
}`
    }
};

const REPO_FILES = {
    'MyString.h': `#ifndef MYSTRING_H
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

#endif`,

    'MyString.cpp': `// Complete C++ MyString Implementation (See repository files for full line-by-line source)`,
    'bindings.cpp': `// Emscripten WebAssembly Bridge Layer (See repository files)`,
    'main.cpp': `// Native C++ Driver Test Suite (See repository files)`
};

// WASM Wrapper Class with Explicit Disposal
class WasmMyString {
    constructor(ptr) {
        this.ptr = ptr;
    }

    getValue() {
        return Module.getStringValue(this.ptr);
    }

    getLength() {
        return Module.getLength(this.ptr);
    }

    getBufferAddress() {
        const addr = Module.getBufferAddress(this.ptr);
        return '0x' + addr.toString(16).toUpperCase().padStart(5, '0');
    }

    getObjectAddress() {
        const addr = Module.getObjectAddress(this.ptr);
        return '0x' + addr.toString(16).toUpperCase().padStart(5, '0');
    }

    dispose() {
        if (this.ptr) {
            Module.destroyString(this.ptr);
            this.ptr = null;
        }
    }
}

// Workbench Tab Definitions
const TAB_OPS = {
    'tab-core': [
        { id: 'construct', label: 'Constructor' },
        { id: 'copy', label: 'Copy Constructor' },
        { id: 'assign', label: 'Copy Assignment' },
        { id: 'destruct', label: 'Destructor' }
    ],
    'tab-operators': [
        { id: 'concat', label: 'Concat (A + B)' },
        { id: 'compare', label: 'Compare (A == B)' },
        { id: 'index', label: 'Subscript A[i]' },
        { id: 'length', label: 'Length()' }
    ],
    'tab-algorithms': [
        { id: 'palindrome', label: 'Palindrome' },
        { id: 'reverse', label: 'Reverse' },
        { id: 'find', label: 'Find Substring' },
        { id: 'substring', label: 'Substring' },
        { id: 'count', label: 'Count Char' },
        { id: 'anagram', label: 'Anagram' },
        { id: 'upper', label: 'toUpper' },
        { id: 'lower', label: 'toLower' },
        { id: 'vowels', label: 'Count Vowels' },
        { id: 'wordCount', label: 'Word Count' },
        { id: 'trim', label: 'Trim' },
        { id: 'replace', label: 'Replace' }
    ],
    'tab-memory': [
        { id: 'mem-inspect', label: 'Byte Inspector' },
        { id: 'mem-lifecycle', label: 'Alloc & Freed Memory' }
    ]
};

// Global Workbench State
let objA = null;
let objB = null;
let objResult = null;
let freedBlocks = [];
let activeTab = 'tab-core';
let activeOp = 'construct';

// Player Engine State
let playerSteps = [];
let playerCurrentStep = 0;
let playerTimer = null;

document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimation();
    initSourceExplorer();
    initWorkbenchTabs();

    if (typeof Module !== 'undefined') {
        if (Module.createString) {
            onWasmReady();
        } else {
            Module.onRuntimeInitialized = onWasmReady;
        }
    }
});

function onWasmReady() {
    const statusDot = document.getElementById('wasm-status-dot');
    const statusText = document.getElementById('wasm-status-text');
    
    if (statusDot) statusDot.style.background = 'var(--teal-live)';
    if (statusText) statusText.textContent = 'WebAssembly C++ Engine Loaded & Ready';

    updateInputObjects();
    bindInputEvents();
    bindPlayerEvents();
    selectTab('tab-core');
}

function updateInputObjects() {
    const valA = document.getElementById('input-a').value || '';
    const valB = document.getElementById('input-b').value || '';

    if (objA) objA.dispose();
    if (objB) objB.dispose();

    objA = new WasmMyString(Module.createString(valA));
    objB = new WasmMyString(Module.createString(valB));

    runActiveOperation();
}

function bindInputEvents() {
    document.getElementById('input-a').addEventListener('input', updateInputObjects);
    document.getElementById('input-b').addEventListener('input', updateInputObjects);
    document.getElementById('input-param').addEventListener('input', runActiveOperation);
}

function initWorkbenchTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            selectTab(tabId);
        });
    });
}

function selectTab(tabId) {
    activeTab = tabId;
    const grid = document.getElementById('op-selector-grid');
    grid.innerHTML = '';

    const ops = TAB_OPS[tabId] || [];
    ops.forEach((op, idx) => {
        const btn = document.createElement('button');
        btn.className = `op-btn ${idx === 0 ? 'active' : ''}`;
        btn.textContent = op.label;
        btn.addEventListener('click', () => {
            document.querySelectorAll('.op-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeOp = op.id;
            runActiveOperation();
        });
        grid.appendChild(btn);
    });

    if (ops.length > 0) {
        activeOp = ops[0].id;
        runActiveOperation();
    }
}

// Execute Active Operation & Render UI
function runActiveOperation() {
    stopPlayer();
    document.getElementById('step-player-controls').style.display = 'none';
    document.getElementById('extra-param-group').style.display = 'none';

    if (!objA || !objA.ptr) return;

    switch (activeOp) {
        // Core Tab
        case 'construct':
            renderMemoryView([ { label: 'a', obj: objA } ]);
            updateCodeSnippet('copy', 'MyString(const char* s)');
            break;
        case 'copy':
            if (objResult) objResult.dispose();
            objResult = new WasmMyString(Module.copyString(objA.ptr));
            renderMemoryView([ { label: 'a', obj: objA }, { label: 'copy (b)', obj: objResult, highlight: true } ]);
            updateCodeSnippet('copy', 'MyString(const MyString& other)');
            break;
        case 'assign':
            const oldAddr = objB.getBufferAddress();
            const oldVal = objB.getValue();
            freedBlocks.unshift({ addr: oldAddr, val: oldVal });
            Module.assignString(objB.ptr, objA.ptr);
            renderMemoryView([ { label: 'a', obj: objA }, { label: 'b (assigned)', obj: objB, highlight: true } ], 'Copy Assignment (b = a): Old buffer was freed via delete[] str', true);
            updateCodeSnippet('assign', 'operator=');
            break;
        case 'destruct':
            renderMemoryView([ { label: 'a', obj: objA } ], 'Destructor: delete[] str frees allocated heap buffer upon object end-of-scope', true);
            updateCodeSnippet('assign', 'MyString::~MyString()');
            break;

        // Operators Tab
        case 'concat':
            if (objResult) objResult.dispose();
            objResult = new WasmMyString(Module.concatStrings(objA.ptr, objB.ptr));
            renderMemoryView([ { label: 'a', obj: objA }, { label: 'b', obj: objB }, { label: 'result (a + b)', obj: objResult, highlight: true } ]);
            updateCodeSnippet('concat', 'operator+');
            break;
        case 'compare':
            const isEqual = Module.equalsStrings(objA.ptr, objB.ptr);
            renderMemoryView([ { label: 'a', obj: objA }, { label: 'b', obj: objB } ], `operator== Result: ${isEqual ? 'TRUE (Exact Character Match)' : 'FALSE (Different Strings)'}`);
            updateCodeSnippet('compare', 'operator==');
            break;
        case 'index':
            document.getElementById('extra-param-group').style.display = 'block';
            document.getElementById('input-param-label').textContent = 'Index i';
            const idxVal = parseInt(document.getElementById('input-param').value) || 0;
            const ch = Module.getChar(objA.ptr, idxVal);
            renderMemoryView([ { label: 'a', obj: objA } ], `operator[${idxVal}] = '${ch === 0 || ch === '\0' ? '\\0' : String.fromCharCode(ch)}'`);
            updateCodeSnippet('mutate', 'operator[]');
            break;
        case 'length':
            renderMemoryView([ { label: 'a', obj: objA } ], `a.length() = ${objA.getLength()}`);
            updateCodeSnippet('length', 'length()');
            break;

        // Algorithms Tab
        case 'palindrome':
            setupPalindromePlayer();
            updateCodeSnippet('palindrome', 'isPalindrome()');
            break;
        case 'reverse':
            if (objResult) objResult.dispose();
            objResult = new WasmMyString(Module.reverseString(objA.ptr));
            renderMemoryView([ { label: 'original (a)', obj: objA }, { label: 'reversed', obj: objResult, highlight: true } ]);
            updateCodeSnippet('reverse', 'reverse()');
            break;
        case 'find':
            const matchIdx = Module.findString(objA.ptr, objB.ptr);
            renderMemoryView([ { label: 'string (a)', obj: objA }, { label: 'target (b)', obj: objB } ], matchIdx !== -1 ? `FOUND substring "${objB.getValue()}" at index ${matchIdx}` : `NOT FOUND (returns -1)`);
            updateCodeSnippet('find', 'find()');
            break;
        case 'substring':
            document.getElementById('extra-param-group').style.display = 'block';
            document.getElementById('input-param-label').textContent = 'Start, Count';
            const startVal = 0, countVal = 3;
            if (objResult) objResult.dispose();
            objResult = new WasmMyString(Module.substring(objA.ptr, startVal, countVal));
            renderMemoryView([ { label: 'a', obj: objA }, { label: `substring(${startVal}, ${countVal})`, obj: objResult, highlight: true } ]);
            updateCodeSnippet('substring', 'substring()');
            break;
        case 'count':
            const chTarget = (objB.getValue() || 'a')[0];
            const countRes = Module.countChar(objA.ptr, chTarget);
            renderMemoryView([ { label: 'a', obj: objA } ], `count('${chTarget}') = ${countRes} occurrences`);
            updateCodeSnippet('count', 'count()');
            break;
        case 'anagram':
            const isAna = Module.isAnagram(objA.ptr, objB.ptr);
            renderAnagramFrequencyTable(isAna);
            updateCodeSnippet('anagram', 'isAnagram()');
            break;
        case 'upper':
            if (objResult) objResult.dispose();
            objResult = new WasmMyString(Module.toUpper(objA.ptr));
            renderMemoryView([ { label: 'a', obj: objA }, { label: 'toUpper()', obj: objResult, highlight: true } ]);
            updateCodeSnippet('toUpper', 'toUpper()');
            break;
        case 'lower':
            if (objResult) objResult.dispose();
            objResult = new WasmMyString(Module.toLower(objA.ptr));
            renderMemoryView([ { label: 'a', obj: objA }, { label: 'toLower()', obj: objResult, highlight: true } ]);
            updateCodeSnippet('toLower', 'toLower()');
            break;
        case 'vowels':
            const vCount = Module.countVowels(objA.ptr);
            renderMemoryView([ { label: 'a', obj: objA } ], `Vowels Count = ${vCount}`);
            updateCodeSnippet('vowels', 'countVowels()');
            break;
        case 'wordCount':
            const wCount = Module.wordCount(objA.ptr);
            renderMemoryView([ { label: 'a', obj: objA } ], `Word Count = ${wCount}`);
            updateCodeSnippet('wordCount', 'wordCount()');
            break;
        case 'trim':
            if (objResult) objResult.dispose();
            objResult = new WasmMyString(Module.trimString(objA.ptr));
            renderMemoryView([ { label: 'original', obj: objA }, { label: 'trimmed', obj: objResult, highlight: true } ]);
            updateCodeSnippet('trim', 'trim()');
            break;
        case 'replace':
            if (objResult) objResult.dispose();
            objResult = new WasmMyString(Module.replaceString(objA.ptr, objB.ptr, new WasmMyString(Module.createString('XYZ'))));
            renderMemoryView([ { label: 'original (a)', obj: objA }, { label: 'replaced', obj: objResult, highlight: true } ]);
            updateCodeSnippet('replace', 'replace()');
            break;

        // Memory Tab
        case 'mem-inspect':
            renderMemoryView([ { label: 'a', obj: objA }, { label: 'b', obj: objB } ]);
            updateCodeSnippet('copy', 'Memory Inspection');
            break;
        case 'mem-lifecycle':
            renderMemoryView([ { label: 'a', obj: objA }, { label: 'b', obj: objB } ], 'Showing active allocations and historical freed heap memory blocks', true);
            updateCodeSnippet('copy', 'Memory Inspection');
            break;
    }
}

// Render Canonical Memory Card with ASCII & Hex byte inspection
function renderObjectCard(label, wasmObj, isHighlight = false, leftPtr = -1, rightPtr = -1) {
    if (!wasmObj || !wasmObj.ptr) return '';

    const val = wasmObj.getValue();
    const len = wasmObj.getLength();
    const bufAddr = wasmObj.getBufferAddress();
    const objAddr = wasmObj.getObjectAddress();
    const allocBytes = len + 1;

    let byteBoxesHtml = '';
    for (let i = 0; i < len; i++) {
        const charStr = val[i];
        const ascii = charStr.charCodeAt(0);
        const hex = '0x' + ascii.toString(16).toUpperCase().padStart(2, '0');

        let cardClass = 'byte-card active';
        let ptrTag = '';
        if (i === leftPtr && i === rightPtr) {
            cardClass += ' pointer-left';
            ptrTag = '<span class="pointer-tag left">L=R</span>';
        } else if (i === leftPtr) {
            cardClass += ' pointer-left';
            ptrTag = '<span class="pointer-tag left">left</span>';
        } else if (i === rightPtr) {
            cardClass += ' pointer-right';
            ptrTag = '<span class="pointer-tag right">right</span>';
        }

        byteBoxesHtml += `
            <div class="${cardClass}">
                <span class="byte-char">${escapeHtml(charStr)}</span>
                <span class="byte-index">i=${i}</span>
                <span class="byte-meta">${ascii}</span>
                <span class="byte-meta">${hex}</span>
                ${ptrTag ? `<div class="pointer-label-container">${ptrTag}</div>` : ''}
            </div>`;
    }

    // Null Terminator Byte Card
    byteBoxesHtml += `
        <div class="byte-card null-byte">
            <span class="byte-char">\\0</span>
            <span class="byte-index">i=${len}</span>
            <span class="byte-meta">0</span>
            <span class="byte-meta">0x00</span>
        </div>`;

    return `
        <div class="canonical-diagram-card" style="margin-bottom: 20px; ${isHighlight ? 'border-color: var(--teal-live); background: #F4FBF9;' : ''}">
            <div class="diagram-header">
                <span class="diagram-title">Object <strong>${label}</strong> &nbsp;[Object Addr: ${objAddr}]</span>
                <span class="diagram-address">Heap Buffer: ${bufAddr} · ${allocBytes} bytes</span>
            </div>
            <div class="object-diagram">
                <div class="obj-row">
                    <span class="obj-name">${label}</span>
                    <div class="obj-details">
                        <div><span class="obj-tree">├──</span> str ──────► [ Heap Address: ${bufAddr} ]</div>
                        <div style="margin-top: 4px;"><span class="obj-tree">└──</span> len = ${len}</div>
                    </div>
                </div>
                <div class="buffer-box-container">
                    ${byteBoxesHtml}
                </div>
            </div>
        </div>`;
}

function renderFreedBlocks() {
    if (freedBlocks.length === 0) return '';
    let html = '';
    freedBlocks.forEach(block => {
        let byteBoxesHtml = '';
        for (let i = 0; i < block.val.length; i++) {
            const ascii = block.val[i].charCodeAt(0);
            byteBoxesHtml += `
                <div class="byte-card freed">
                    <span class="byte-char">${escapeHtml(block.val[i])}</span>
                    <span class="byte-index">i=${i}</span>
                    <span class="byte-meta">${ascii}</span>
                </div>`;
        }
        byteBoxesHtml += `
            <div class="byte-card freed">
                <span class="byte-char">\\0</span>
                <span class="byte-index">i=${block.val.length}</span>
                <span class="byte-meta">0</span>
            </div>`;

        html += `
            <div style="margin-bottom: 20px;">
                <div class="freed-block-notice">
                    <span>╳ Freed Heap Memory Block [Address: ${block.addr}] · Released via delete[] str</span>
                </div>
                <div class="buffer-box-container" style="margin-top: 8px;">
                    ${byteBoxesHtml}
                </div>
            </div>`;
    });
    return html;
}

function renderMemoryView(objects, noticeMsg = null, showFreed = false) {
    const container = document.getElementById('workbench-vis-container');
    let html = '';
    
    if (noticeMsg) {
        html += `
            <div class="status-bar" style="background: var(--teal-live-bg); border: 1px solid var(--teal-live); margin-bottom: 20px;">
                <strong>Result:</strong> &nbsp;${noticeMsg}
            </div>`;
    }

    objects.forEach(item => {
        html += renderObjectCard(item.label, item.obj, item.highlight, item.leftPtr, item.rightPtr);
    });

    if (showFreed) {
        html += renderFreedBlocks();
    }
    container.innerHTML = html;
}

function renderAnagramFrequencyTable(isAnagram) {
    const valA = objA.getValue();
    const valB = objB.getValue();

    const freqA = {}, freqB = {};
    for (let c of valA) freqA[c] = (freqA[c] || 0) + 1;
    for (let c of valB) freqB[c] = (freqB[c] || 0) + 1;

    const allChars = Array.from(new Set([...Object.keys(freqA), ...Object.keys(freqB)])).sort();

    let rowsHtml = '';
    allChars.forEach(ch => {
        const cA = freqA[ch] || 0;
        const cB = freqB[ch] || 0;
        const match = cA === cB;

        rowsHtml += `
            <tr>
                <td><strong>'${ch}'</strong> (ASCII ${ch.charCodeAt(0)})</td>
                <td>${cA}</td>
                <td>${cB}</td>
                <td style="color: ${match ? 'var(--teal-live)' : 'var(--brick-freed)'}; font-weight: 600;">${match ? '✓ Match' : '✕ Mismatch'}</td>
            </tr>`;
    });

    const noticeMsg = isAnagram ? `✓ ANAGRAMS (Identical character frequency counts)` : `✕ NOT ANAGRAMS`;
    const noticeHtml = `
        <div class="status-bar" style="background: ${isAnagram ? 'var(--teal-live-bg)' : 'var(--brick-freed-bg)'}; border: 1px solid ${isAnagram ? 'var(--teal-live)' : 'var(--brick-freed-border)'}; margin-bottom: 20px;">
            <strong>Result:</strong> &nbsp;${noticeMsg}
        </div>`;

    const tableHtml = `
        <div style="margin-bottom: 20px;">
            <h4 style="font-family: 'IBM Plex Mono', monospace; font-size: 14px; margin-bottom: 10px;">Side-by-Side Character Frequency Analysis</h4>
            <table class="freq-table">
                <thead>
                    <tr><th>Character</th><th>String A ('${valA}')</th><th>String B ('${valB}')</th><th>Status</th></tr>
                </thead>
                <tbody>${rowsHtml}</tbody>
            </table>
        </div>`;

    document.getElementById('workbench-vis-container').innerHTML = noticeHtml + tableHtml + renderObjectCard('a', objA) + renderObjectCard('b', objB);
}

// Step-by-Step Player Engine (Palindrome)
function setupPalindromePlayer() {
    document.getElementById('step-player-controls').style.display = 'flex';

    const strVal = objA.getValue();
    playerSteps = [];

    if (strVal.length <= 1) {
        playerSteps.push({ left: 0, right: Math.max(0, strVal.length - 1), match: true, done: true, desc: 'Single or empty string is automatically a palindrome.' });
    } else {
        let left = 0;
        let right = strVal.length - 1;
        while (left < right) {
            const chL = strVal[left];
            const chR = strVal[right];
            const isMatch = chL === chR;
            playerSteps.push({
                left, right, chL, chR, isMatch,
                desc: `Step: Compare left[${left}] ('${chL}') == right[${right}] ('${chR}') -> ${isMatch ? 'Match ✓' : 'Mismatch ✕'}`
            });
            if (!isMatch) {
                playerSteps.push({ left, right, chL, chR, isMatch: false, done: true, desc: 'Mismatch found! String is NOT a palindrome.' });
                break;
            }
            left++;
            right--;
        }
        if (left >= right) {
            playerSteps.push({ left, right, done: true, isMatch: true, desc: 'All pointers met. String IS a valid Palindrome! ✓' });
        }
    }

    playerCurrentStep = 0;
    renderPlayerStep();
}

function renderPlayerStep() {
    if (playerSteps.length === 0) return;
    const step = playerSteps[playerCurrentStep];

    document.getElementById('player-status-text').textContent = `Step ${playerCurrentStep + 1} of ${playerSteps.length}`;

    const noticeMsg = `Step ${playerCurrentStep + 1}: ${step.desc}`;
    renderMemoryView([ { label: 'a (isPalindrome)', obj: objA, leftPtr: step.left, rightPtr: step.right } ], noticeMsg, false);
}

function bindPlayerEvents() {
    document.getElementById('btn-player-run').addEventListener('click', runPlayer);
    document.getElementById('btn-player-pause').addEventListener('click', stopPlayer);
    document.getElementById('btn-player-step').addEventListener('click', stepPlayerForward);
    document.getElementById('btn-player-reset').addEventListener('click', resetPlayer);
}

function stepPlayerForward() {
    if (playerCurrentStep < playerSteps.length - 1) {
        playerCurrentStep++;
        renderPlayerStep();
    } else {
        stopPlayer();
    }
}

function runPlayer() {
    stopPlayer();
    playerTimer = setInterval(() => {
        if (playerCurrentStep < playerSteps.length - 1) {
            playerCurrentStep++;
            renderPlayerStep();
        } else {
            stopPlayer();
        }
    }, 1000);
}

function stopPlayer() {
    if (playerTimer) {
        clearInterval(playerTimer);
        playerTimer = null;
    }
}

function resetPlayer() {
    stopPlayer();
    playerCurrentStep = 0;
    renderPlayerStep();
}

function updateCodeSnippet(key, opTitle) {
    const data = CPP_SNIPPETS[key] || { complexity: 'O(n)', code: '// Source Code' };
    document.getElementById('active-complexity-badge').textContent = data.complexity;
    document.getElementById('active-code-display').textContent = data.code;
}

// Source Explorer
function initSourceExplorer() {
    const select = document.getElementById('file-select');
    const display = document.getElementById('explorer-code-display');

    function loadFile(fileName) {
        if (REPO_FILES[fileName]) {
            display.textContent = REPO_FILES[fileName];
        }
    }

    select.addEventListener('change', (e) => loadFile(e.target.value));
    loadFile('MyString.h');
}

// Hero Page Load Animation: Assembling Heap Buffer byte-by-byte for "racecar"
function initHeroAnimation() {
    const container = document.getElementById('hero-buffer-container');
    const word = 'racecar';
    container.innerHTML = '';
    
    word.split('').forEach((char, i) => {
        setTimeout(() => {
            const card = document.createElement('div');
            card.className = 'byte-card active';
            card.innerHTML = `<span class="byte-char">${char}</span><span class="byte-index">i=${i}</span><span class="byte-meta">${char.charCodeAt(0)}</span>`;
            container.appendChild(card);
        }, (i + 1) * 120);
    });

    setTimeout(() => {
        const nullCard = document.createElement('div');
        nullCard.className = 'byte-card null-byte';
        nullCard.innerHTML = `<span class="byte-char">\\0</span><span class="byte-index">i=7</span><span class="byte-meta">0</span>`;
        container.appendChild(nullCard);
    }, 8 * 120);
}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
