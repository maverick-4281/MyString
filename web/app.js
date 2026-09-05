// MyString Lab — Vanilla JS WebAssembly Controller & Memory Visualizer

// C++ Source Snippets from Repository
const CPP_SNIPPETS = {
    'concat': `MyString MyString::operator+(const MyString& other) {
    int newLen = len + other.len;
    char* buffer = new char[newLen + 1];

    for (int i = 0; i < len; i++) {
        buffer[i] = str[i];
    }
    for (int i = 0; i < other.len; i++) {
        buffer[len + i] = other.str[i];
    }
    buffer[newLen] = '\\0';

    MyString result(buffer);
    delete[] buffer;
    return result;
}`,

    'compare': `bool MyString::operator==(const MyString& other) {
    if (len != other.len) {
        return false;
    }
    for (int i = 0; i < len; i++) {
        if (str[i] != other.str[i]) {
            return false;
        }
    }
    return true;
}`,

    'copy': `// Deep copy constructor
MyString::MyString(const MyString& other) {
    len = other.len;
    str = new char[len + 1];
    for (int i = 0; i < len; i++) {
        str[i] = other.str[i];
    }
    str[len] = '\\0';
}`,

    'mutate': `char& MyString::operator[](int index) {
    return str[index];
}`,

    'assign': `MyString& MyString::operator=(const MyString& other) {
    if (this == &other) {
        return *this;
    }

    char* newStr = new char[other.len + 1];
    for (int i = 0; i < other.len; i++) {
        newStr[i] = other.str[i];
    }
    newStr[other.len] = '\\0';

    delete[] str;   // Free old buffer
    str = newStr;   // Reassign pointer
    len = other.len;

    return *this;
}`,

    'destructor': `MyString::~MyString() {
    delete[] str;
}`
};

const REPO_FILES = {
    'MyString.h': `#ifndef MYSTRING_H
#define MYSTRING_H

#include <iostream>

class MyString {
private:
    char* str;
    int len;

    int getLen(const char* s);

public:
    MyString();
    MyString(const char* s);
    MyString(const MyString& other);
    ~MyString();

    MyString& operator=(const MyString& other);
    MyString operator+(const MyString& other);
    bool operator==(const MyString& other);
    char& operator[](int index);

    friend std::ostream& operator<<(std::ostream& out, const MyString& s);
    friend std::istream& operator>>(std::istream& in, MyString& s);

    int length();
    const char* c_str() const;
};

#endif`,

    'MyString.cpp': `#include "MyString.h"

int MyString::getLen(const char* s) {
    int count = 0;
    while (s[count] != '\\0') {
        count++;
    }
    return count;
}

MyString::MyString() {
    len = 0;
    str = new char[1];
    str[0] = '\\0';
}

MyString::MyString(const char* s) {
    len = getLen(s);
    str = new char[len + 1];
    for (int i = 0; i < len; i++) {
        str[i] = s[i];
    }
    str[len] = '\\0';
}

MyString::MyString(const MyString& other) {
    len = other.len;
    str = new char[len + 1];
    for (int i = 0; i < len; i++) {
        str[i] = other.str[i];
    }
    str[len] = '\\0';
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
    newStr[other.len] = '\\0';

    delete[] str;
    str = newStr;
    len = other.len;

    return *this;
}

MyString MyString::operator+(const MyString& other) {
    int newLen = len + other.len;
    char* buffer = new char[newLen + 1];

    for (int i = 0; i < len; i++) {
        buffer[i] = str[i];
    }
    for (int i = 0; i < other.len; i++) {
        buffer[len + i] = other.str[i];
    }
    buffer[newLen] = '\\0';

    MyString result(buffer);
    delete[] buffer;
    return result;
}

bool MyString::operator==(const MyString& other) {
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
    s.str[s.len] = '\\0';

    return in;
}

int MyString::length() {
    return len;
}`,

    'main.cpp': `#include "MyString.h"
#include <iostream>
using namespace std;

int main() {
    MyString s1("Hello");
    MyString s2("World");

    cout << "s1 = " << s1 << endl;
    cout << "s2 = " << s2 << endl;

    MyString s3 = s1 + MyString(" ") + s2;
    cout << "s1 + s2 = " << s3 << endl;

    MyString s4("Hello");
    if (s1 == s4) {
        cout << "s1 and s4 are equal" << endl;
    } else {
        cout << "s1 and s4 are not equal" << endl;
    }

    cout << "s1[0] = " << s1[0] << endl;
    s1[0] = 'J';
    cout << "after changing s1[0]: " << s1 << endl;

    MyString s5(s2);
    s5[0] = 'B';
    cout << "s2 = " << s2 << " (should still be World)" << endl;
    cout << "s5 = " << s5 << endl;

    MyString s6;
    s6 = s2;
    cout << "s6 after s6 = s2: " << s6 << endl;

    cout << "Enter a word: ";
    MyString s7;
    cin >> s7;
    cout << "you entered: " << s7 << ", length = " << s7.length() << endl;

    return 0;
}`
};

// WASM Object Wrapper with Explicit Cleanup Discipline
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

// Global State
let objA = null;
let objB = null;
let objC = null;
let objResult = null;
let freedBlocks = [];

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimation();
    initSourceExplorer();
    
    // Check if Emscripten Module loaded
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

    // Create default WASM objects
    updateInputObjects();
    bindPlaygroundEvents();
}

function updateInputObjects() {
    const valA = document.getElementById('input-a').value || 'Hello';
    const valB = document.getElementById('input-b').value || 'World';

    if (objA) objA.dispose();
    if (objB) objB.dispose();

    objA = new WasmMyString(Module.createString(valA));
    objB = new WasmMyString(Module.createString(valB));

    renderDefaultState();
}

function bindPlaygroundEvents() {
    document.getElementById('input-a').addEventListener('input', updateInputObjects);
    document.getElementById('input-b').addEventListener('input', updateInputObjects);

    document.getElementById('btn-concat').addEventListener('click', handleConcat);
    document.getElementById('btn-compare').addEventListener('click', handleCompare);
    document.getElementById('btn-copy').addEventListener('click', handleCopy);
    document.getElementById('btn-mutate').addEventListener('click', handleMutate);
    document.getElementById('btn-assign').addEventListener('click', handleAssign);
}

// Render canonical memory card for an object
function renderObjectCard(label, wasmObj, isHighlight = false) {
    if (!wasmObj || !wasmObj.ptr) return '';

    const val = wasmObj.getValue();
    const len = wasmObj.getLength();
    const bufAddr = wasmObj.getBufferAddress();
    const objAddr = wasmObj.getObjectAddress();
    const allocBytes = len + 1;

    let byteBoxesHtml = '';
    for (let i = 0; i < len; i++) {
        byteBoxesHtml += `
            <div class="byte-card active">
                <span class="byte-char">${escapeHtml(val[i])}</span>
                <span class="byte-index">${i}</span>
            </div>`;
    }
    // Null terminator
    byteBoxesHtml += `
        <div class="byte-card null-byte">
            <span class="byte-char">\\0</span>
            <span class="byte-index">${len}</span>
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

// Render freed memory blocks
function renderFreedBlocks() {
    if (freedBlocks.length === 0) return '';

    let html = '';
    freedBlocks.forEach((block, idx) => {
        let byteBoxesHtml = '';
        for (let i = 0; i < block.val.length; i++) {
            byteBoxesHtml += `
                <div class="byte-card freed">
                    <span class="byte-char">${escapeHtml(block.val[i])}</span>
                    <span class="byte-index">${i}</span>
                </div>`;
        }
        byteBoxesHtml += `
            <div class="byte-card freed">
                <span class="byte-char">\\0</span>
                <span class="byte-index">${block.val.length}</span>
            </div>`;

        html += `
            <div style="margin-bottom: 20px;">
                <div class="freed-block-notice">
                    <span>╳ Freed Heap Memory Block [Address: ${block.addr}] · Deallocated via delete[] str</span>
                </div>
                <div class="buffer-box-container" style="margin-top: 8px;">
                    ${byteBoxesHtml}
                </div>
            </div>`;
    });
    return html;
}

function renderDefaultState() {
    const container = document.getElementById('memory-vis-container');
    container.innerHTML = renderObjectCard('a', objA) + renderObjectCard('b', objB) + renderFreedBlocks();
}

// Operations Handlers
function handleConcat() {
    if (!objA || !objB) return;

    if (objResult) objResult.dispose();
    const resPtr = Module.concatStrings(objA.ptr, objB.ptr);
    objResult = new WasmMyString(resPtr);

    const container = document.getElementById('memory-vis-container');
    container.innerHTML = 
        renderObjectCard('a', objA) +
        renderObjectCard('b', objB) +
        renderObjectCard('result (a + b)', objResult, true) +
        renderFreedBlocks();

    updateSourceCode('concat', 'operator+');
}

function handleCompare() {
    if (!objA || !objB) return;

    const isEqual = Module.equalsStrings(objA.ptr, objB.ptr);

    const container = document.getElementById('memory-vis-container');
    const noticeHtml = `
        <div class="status-bar" style="background: ${isEqual ? 'var(--teal-live-bg)' : 'var(--brick-freed-bg)'}; border: 1px solid ${isEqual ? 'var(--teal-live)' : 'var(--brick-freed-border)'};">
            <strong>operator== Result:</strong> ${isEqual ? 'TRUE (Strings are identical in length and characters)' : 'FALSE (Strings differ)'}
        </div>`;

    container.innerHTML = noticeHtml + renderObjectCard('a', objA) + renderObjectCard('b', objB) + renderFreedBlocks();
    updateSourceCode('compare', 'operator==');
}

function handleCopy() {
    if (!objA) return;

    if (objC) objC.dispose();
    const copyPtr = Module.copyString(objA.ptr);
    objC = new WasmMyString(copyPtr);

    const container = document.getElementById('memory-vis-container');
    container.innerHTML = 
        renderObjectCard('a', objA) +
        renderObjectCard('c (Copy of a)', objC, true) +
        renderFreedBlocks();

    updateSourceCode('copy', 'MyString(const MyString&)');
}

function handleMutate() {
    if (!objC) {
        handleCopy();
    }

    // Mutate C[0] to 'Y'
    Module.setChar(objC.ptr, 0, 'Y');

    const container = document.getElementById('memory-vis-container');
    const noticeHtml = `
        <div class="status-bar" style="background: var(--teal-live-bg); border: 1px solid var(--teal-live);">
            <strong>Subscript Mutation:</strong> c[0] set to 'Y'. Notice that Object a's buffer remains unchanged at address ${objA.getBufferAddress()} while Object c changed at address ${objC.getBufferAddress()}!
        </div>`;

    container.innerHTML = noticeHtml + renderObjectCard('a', objA) + renderObjectCard('c', objC, true) + renderFreedBlocks();
    updateSourceCode('mutate', 'operator[]');
}

function handleAssign() {
    if (!objA || !objB) return;

    // Save old B buffer into freedBlocks
    const oldAddr = objB.getBufferAddress();
    const oldVal = objB.getValue();
    freedBlocks.unshift({ addr: oldAddr, val: oldVal });

    // Execute copy assignment operator
    Module.assignString(objB.ptr, objA.ptr);

    const container = document.getElementById('memory-vis-container');
    const noticeHtml = `
        <div class="status-bar" style="background: var(--teal-live-bg); border: 1px solid var(--teal-live);">
            <strong>Copy Assignment (b = a):</strong> Old buffer at ${oldAddr} was freed via delete[]. A new buffer was allocated for Object b!
        </div>`;

    container.innerHTML = noticeHtml + renderObjectCard('a', objA) + renderObjectCard('b (reassigned)', objB, true) + renderFreedBlocks();
    updateSourceCode('assign', 'operator=');
}

function updateSourceCode(snippetKey, badgeText) {
    document.getElementById('active-op-badge').textContent = badgeText;
    document.getElementById('active-code-display').textContent = CPP_SNIPPETS[snippetKey];
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

// Hero Page Load Animation: Assembling Heap Buffer byte-by-byte
function initHeroAnimation() {
    const container = document.getElementById('hero-buffer-container');
    const word = 'Hello';
    
    container.innerHTML = '';
    
    word.split('').forEach((char, i) => {
        setTimeout(() => {
            const card = document.createElement('div');
            card.className = 'byte-card active';
            card.innerHTML = `<span class="byte-char">${char}</span><span class="byte-index">${i}</span>`;
            container.appendChild(card);
        }, (i + 1) * 150);
    });

    setTimeout(() => {
        const nullCard = document.createElement('div');
        nullCard.className = 'byte-card null-byte';
        nullCard.innerHTML = `<span class="byte-char">\\0</span><span class="byte-index">5</span>`;
        container.appendChild(nullCard);
    }, 6 * 150);
}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
