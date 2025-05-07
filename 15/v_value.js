window=global;
delete global;
window.setInterval = function () {}
window.setTimeout = function () {}

// 模拟 window 对象的基本属性和方法
// Simulate basic properties and methods of the window object
var window = globalThis || global || this; // More robust global object detection

// 如果在 Node.js 等环境中，global 可能存在，我们将其用作 window 的基础
// If in Node.js or similar environments, global might exist, we use it as the base for window
if (typeof global !== 'undefined' && window === global) {
    // 在 Node.js 中，global 上已经有很多东西了，我们只添加浏览器特有的
    // In Node.js, global already has many things, we only add browser-specific ones
} else if (typeof globalThis !== 'undefined' && window === globalThis) {
    // 使用 globalThis
} else {
    // 否则，假定 window 就是当前的 this (例如在裸 V8 引擎或 Web Worker 中)
    // Otherwise, assume window is the current 'this' (e.g., in a bare V8 engine or Web Worker)
}

window.setInterval = typeof setInterval === 'function' ? setInterval : function () {};
window.setTimeout = typeof setTimeout === 'function' ? setTimeout : function () {};

// 模拟 document 对象
// Simulate the document object
window.document = {
    _cookies: {},
    get cookie() {
        const cookiesArray = [];
        for (const name in this._cookies) {
            if (Object.prototype.hasOwnProperty.call(this._cookies, name)) {
                 cookiesArray.push(`${name}=${this._cookies[name]}`);
            }
        }
        return cookiesArray.join('; ');
    },
    set cookie(cookieString) {
        const parts = cookieString.split(';');
        const firstPart = parts[0].trim();
        const [name, ...valueParts] = firstPart.split('='); // Handle '=' in cookie value
        const value = valueParts.join('=');

        if (name) {
            let expires = null;
            // 简化的 cookie 属性处理，实际浏览器处理更复杂
            // Simplified cookie attribute handling, actual browser handling is more complex
            for (let i = 1; i < parts.length; i++) {
                const [attrName, attrValue] = parts[i].trim().split('=');
                if (attrName.toLowerCase() === 'expires') {
                    expires = new Date(attrValue);
                }
                // 可以添加 domain, path, max-age, secure, httponly, samesite 的处理
                // Can add handling for domain, path, max-age, secure, httponly, samesite
            }

            if (value === '' || (expires && expires < new Date())) {
                delete this._cookies[name];
            } else {
                this._cookies[name] = value;
            }
        }
    },
    getElementsByTagName: function(tagName) {
        tagName = tagName.toLowerCase();
        // 简化模拟，实际场景需要更复杂的 DOM 结构模拟
        // Simplified simulation, real scenarios require more complex DOM structure simulation
        if (tagName === 'head' || tagName === 'body' || tagName === 'script' || tagName === 'div' || tagName === 'iframe') {
            const mockElement = {
                // 模拟元素的基本属性和方法
                // Simulate basic properties and methods of an element
                tagName: tagName.toUpperCase(),
                appendChild: function(child) {
                    if (!this.childNodes) this.childNodes = [];
                    this.childNodes.push(child);
                    child.parentNode = this;
                    return child;
                },
                removeChild: function(child) {
                     if (this.childNodes) {
                        const index = this.childNodes.indexOf(child);
                        if (index > -1) {
                            this.childNodes.splice(index, 1);
                            child.parentNode = null;
                        }
                    }
                    return child;
                },
                style: {}, // CSSStyleDeclaration
                innerHTML: '',
                innerText: '',
                textContent: '',
                attributes: {},
                getAttribute: function(attrName) { return this.attributes[attrName] !== undefined ? this.attributes[attrName] : null; },
                setAttribute: function(attrName, attrValue) { this.attributes[attrName] = String(attrValue); },
                removeAttribute: function(attrName) { delete this.attributes[attrName]; },
                addEventListener: function() {},
                removeEventListener: function() {},
                dispatchEvent: function() { return true; },
                // 特殊处理 script 元素
                // Special handling for script elements
                ...(tagName === 'script' && {
                    src: '',
                    type: '',
                    async: false,
                    defer: false,
                    onerror: null,
                    onload: null,
                    onreadystatechange: null,
                    readyState: '', // 'loading', 'interactive', 'complete'
                }),
                // 特殊处理 iframe 元素
                // Special handling for iframe elements
                ...(tagName === 'iframe' && {
                    src: '',
                    contentWindow: {
                        document: { // 简化模拟 iframe 内的 document
                                     // Simplified simulation of document inside iframe
                            write: function() {},
                            close: function() {},
                            body: { appendChild: function() {} },
                            createElement: window.document.createElement.bind(window.document) // 递归使用顶层 createElement
                                                                                               // Recursively use top-level createElement
                        },
                        postMessage: function() {}
                    },
                    contentDocument: null // 通常与 contentWindow.document 相同
                                        // Usually the same as contentWindow.document
                })
            };
            // 模拟 head 和 body 的存在性
            // Simulate the existence of head and body
            if (tagName === 'head' && !this._mockHead) this._mockHead = mockElement;
            if (tagName === 'body' && !this._mockBody) this._mockBody = mockElement;

            return [mockElement]; // 返回一个包含模拟元素的数组
                                  // Return an array containing the mock element
        }
        return [];
    },
    createElement: function(tagName) {
        tagName = tagName.toLowerCase();
        const element = {
            tagName: tagName.toUpperCase(),
            appendChild: function(child) {
                if (!this.childNodes) this.childNodes = [];
                this.childNodes.push(child);
                child.parentNode = this;
                return child;
            },
            removeChild: function(child) {
                if (this.childNodes) {
                    const index = this.childNodes.indexOf(child);
                    if (index > -1) {
                        this.childNodes.splice(index, 1);
                        child.parentNode = null;
                    }
                }
                return child;
            },
            insertBefore: function(newNode, referenceNode) {
                if (!this.childNodes) this.childNodes = [];
                if (referenceNode) {
                    const index = this.childNodes.indexOf(referenceNode);
                    if (index > -1) {
                        this.childNodes.splice(index, 0, newNode);
                    } else {
                        this.childNodes.push(newNode); // 如果参考节点不存在，则添加到末尾
                                                       // If reference node doesn't exist, add to the end
                    }
                } else {
                    this.childNodes.push(newNode); // 如果没有参考节点，则添加到末尾
                                                   // If no reference node, add to the end
                }
                newNode.parentNode = this;
                return newNode;
            },
            style: {},
            innerHTML: '',
            innerText: '',
            textContent: '',
            attributes: {},
            getAttribute: function(attrName) { return this.attributes[attrName] !== undefined ? this.attributes[attrName] : null; },
            setAttribute: function(attrName, attrValue) { this.attributes[attrName] = String(attrValue); },
            removeAttribute: function(attrName) { delete this.attributes[attrName]; },
            addEventListener: function() {},
            removeEventListener: function() {},
            dispatchEvent: function() { return true; },
            // 模拟 IE 特有的 addBehavior
            // Simulate IE-specific addBehavior
            addBehavior: function() {},
            load: function() {}, // 用于 IE userData
                                 // Used for IE userData
            save: function() {}, // 用于 IE userData
                                 // Used for IE userData
            // 模拟 canvas 的 getContext
            // Simulate canvas's getContext
            getContext: function(contextType) {
                if (contextType === '2d' || contextType.startsWith('webgl')) {
                    return {
                        fillRect: function() {},
                        strokeRect: function() {},
                        beginPath: function() {},
                        moveTo: function() {},
                        lineTo: function() {},
                        stroke: function() {},
                        fill: function() {},
                        arc: function() {},
                        fillText: function() {},
                        // ... 可以根据需要添加更多 CanvasRenderingContext2D 或 WebGLRenderingContext 的方法和属性
                        // ... More CanvasRenderingContext2D or WebGLRenderingContext methods and properties can be added as needed
                        canvas: this // 指向 canvas 元素本身
                                     // Points to the canvas element itself
                    };
                }
                return null;
            },
            ...(tagName === 'script' && {
                src: '',
                type: '',
                async: false,
                defer: false,
                onerror: null,
                onload: null,
                onreadystatechange: null,
                readyState: '',
                text: '' // 用于内联脚本
                         // For inline scripts
            }),
            ...(tagName === 'iframe' && {
                src: '',
                contentWindow: {
                    document: {
                        write: function(html) { if (!this._iframeContent) this._iframeContent = ''; this._iframeContent += html;},
                        close: function() {},
                        body: { appendChild: function() {} },
                        createElement: window.document.createElement.bind(window.document),
                        // 模拟 p.w.frames[0].ducument.createElement
                        // Simulate p.w.frames[0].ducument.createElement
                        // 代码中存在 ducument 拼写错误，这里也模拟这个错误
                        // The code has a spelling mistake 'ducument', simulating it here as well
                        ...(this.w && this.w.frames && this.w.frames[0] && {
                            ducument: {
                                createElement: function(tn) { return window.document.createElement(tn); }
                            }
                        })
                    },
                    postMessage: function() {}
                },
                contentDocument: null
            }),
            // 模拟表单元素
            // Simulate form elements
            ...(tagName === 'form' && {
                submit: function() { /* console.log('Form submitted'); */ },
                reset: function() { /* console.log('Form reset'); */ },
                elements: [],
                length: 0,
                action: '',
                method: 'GET',
                target: ''
            }),
            ...(tagName === 'input' && {
                value: '',
                type: 'text',
                name: '',
                checked: false,
                disabled: false,
                form: null // 指向所属表单
                          // Points to the parent form
            }),
            parentNode: null
        };
        if (tagName === 'iframe' && element.contentWindow) {
            element.contentDocument = element.contentWindow.document;
        }
        return element;
    },
    // 模拟 documentElement，通常是 <html> 标签
    // Simulate documentElement, usually the <html> tag
    get documentElement() {
        if (!this._documentElement) {
            this._documentElement = this.createElement('html');
            // 确保 html 元素有 head 和 body
            // Ensure html element has head and body
            this._documentElement.appendChild(this.head || this.createElement('head'));
            this._documentElement.appendChild(this.body || this.createElement('body'));
        }
        return this._documentElement;
    },
    // 模拟 head 对象
    // Simulate the head object
    get head() {
        if (!this._head) {
            const heads = this.getElementsByTagName('head');
            this._head = heads.length > 0 ? heads[0] : this.createElement('head');
            if (this.documentElement && !this._head.parentNode) {
                 // 确保 head 在 documentElement 中
                 // Ensure head is in documentElement
                const docElChildren = this.documentElement.childNodes || [];
                const bodyExists = docElChildren.find(n => n.tagName === 'BODY');
                if (bodyExists) {
                    this.documentElement.insertBefore(this._head, bodyExists);
                } else {
                    this.documentElement.appendChild(this._head);
                }
            }
        }
        return this._head;
    },
    // 模拟 body 对象
    // Simulate the body object
    get body() {
        if (!this._body) {
            const bodies = this.getElementsByTagName('body');
            this._body = bodies.length > 0 ? bodies[0] : this.createElement('body');
             if (this.documentElement && !this._body.parentNode) {
                this.documentElement.appendChild(this._body);
            }
        }
        return this._body;
    },
    // 模拟 addEventListener 和 attachEvent
    // Simulate addEventListener and attachEvent
    _eventListeners: {},
    addEventListener: function(type, listener, options) {
        if (!this._eventListeners[type]) {
            this._eventListeners[type] = [];
        }
        this._eventListeners[type].push({listener: listener, options: options});
    },
    attachEvent: function(event, listener) { // 用于旧版IE
                                             // For older IE
        this.addEventListener(event.substring(2), listener); // 移除 'on' 前缀
                                                              // Remove 'on' prefix
    },
    removeEventListener: function(type, listener, options) {
        if (this._eventListeners[type]) {
            this._eventListeners[type] = this._eventListeners[type].filter(
                entry => entry.listener !== listener // 简化比较
                                                      // Simplified comparison
            );
        }
    },
    detachEvent: function(event, listener) {
        this.removeEventListener(event.substring(2), listener);
    },
    dispatchEvent: function(event) {
        if (this._eventListeners[event.type]) {
            this._eventListeners[event.type].forEach(entry => {
                try {
                    entry.listener.call(event.target || this, event);
                } catch (e) {
                    console.error("Error in event listener:", e);
                }
            });
        }
        return !event.defaultPrevented;
    },
    readyState: 'complete', //  'loading', 'interactive', 'complete'
    defaultCharset: 'UTF-8',
    characterSet: 'UTF-8',
    // 模拟 document.w.frames.ducument.createElement (代码中存在拼写错误 ducument)
    // Simulate document.w.frames.ducument.createElement (code has spelling error 'ducument')
    // 这个结构比较特殊，需要根据实际代码逻辑调整
    // This structure is quite specific and needs adjustment based on actual code logic
    w: { // 模拟 window.document.w
         // Simulate window.document.w
        frames: [{ // 模拟 window.document.w.frames[0]
                   // Simulate window.document.w.frames[0]
            // 代码中是 ducument，这里保持一致
            // It's 'ducument' in the code, keeping it consistent here
            ducument: {
                createElement: function(tagName) {
                    return window.document.createElement(tagName);
                }
            }
        }]
    },
    compatMode: 'CSS1Compat', // 'BackCompat' for quirks mode
    // 其他常用 document 属性
    // Other common document properties
    title: 'Simulated Page',
    URL: 'https://www.mashangpa.com/problem-detail/15/', // 与 location.href 一致
                                                          // Consistent with location.href
    domain: 'www.mashangpa.com',
    referrer: '',
    getElementById: function(id) {
        // 递归搜索整个模拟 DOM 树
        // Recursively search the entire simulated DOM tree
        function findById(node) {
            if (node.getAttribute && node.getAttribute('id') === id) {
                return node;
            }
            if (node.childNodes) {
                for (let i = 0; i < node.childNodes.length; i++) {
                    const found = findById(node.childNodes[i]);
                    if (found) return found;
                }
            }
            // 检查 iframe contentDocument
            // Check iframe contentDocument
            if (node.contentDocument && node.contentDocument.documentElement) {
                const foundInFrame = findById(node.contentDocument.documentElement);
                if (foundInFrame) return foundInFrame;
            }
            return null;
        }
        return findById(this.documentElement);
    },
    // querySelector 和 querySelectorAll 的简单模拟 (如果需要)
    // Simple simulation of querySelector and querySelectorAll (if needed)
    querySelector: function(selector) {
        // 简化：仅支持标签名选择器
        // Simplified: only supports tag name selectors
        if (/^[a-zA-Z]+$/.test(selector)) {
            const elements = this.getElementsByTagName(selector);
            return elements.length > 0 ? elements[0] : null;
        }
        return null;
    },
    querySelectorAll: function(selector) {
        if (/^[a-zA-Z]+$/.test(selector)) {
            return this.getElementsByTagName(selector);
        }
        return [];
    }
};

// 确保 documentElement, head, body 在 document 对象创建后可用
// Ensure documentElement, head, body are available after document object creation
window.document.documentElement;
window.document.head;
window.document.body;


// 模拟 navigator 对象
// Simulate the navigator object
window.navigator = {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
    appVersion: '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
    platform: 'Win32',
    plugins: { // 模拟插件列表
               // Simulate plugin list
        length: 0,
        item: function(index) { return undefined; },
        namedItem: function(name) { return undefined; },
        refresh: function() {}
    },
    mimeTypes: { // 模拟 MIME 类型列表
                 // Simulate MIME type list
        length: 0,
        item: function(index) { return undefined; },
        namedItem: function(name) { return undefined; }
    },
    javaEnabled: function() { return false; },
    cookieEnabled: true,
    language: 'en-US',
    languages: ['en-US', 'en'],
    onLine: true,
    doNotTrack: '1', // "1" (Do Not Track is enabled), "0" (Do Not Track is not enabled), or "unspecified"
    vendor: 'Google Inc.',
    product: 'Gecko',
    productSub: '20100101',
    webdriver: false,
    hardwareConcurrency: 4, // 示例值
                             // Example value
    deviceMemory: 8, // GB, 示例值
                     // GB, example value
    // 模拟特定浏览器可能存在的属性
    // Simulate properties that might exist in specific browsers
    // Chrome
    chrome: window.chrome || { runtime: {} }, // 确保 chrome 对象存在
                                              // Ensure chrome object exists
    // Firefox
    mozGetUserMedia: undefined,
    // IE
    msSaveBlob: undefined,
    // Safari
    safari: undefined,
    // Opera
    opr: undefined,
    // 360 浏览器等可能添加的属性
    // Properties that browsers like 360 might add
    sgAppName: '', // 如果不是特定浏览器则为空
                   // Empty if not a specific browser
    // 代码中用到的 `navigator[g + vn + u + m]` 或 `navigator[n[202]]`
    // `navigator[g + vn + u + m]` or `navigator[n[202]]` used in the code
    // 需要具体分析这些拼接字符串的结果，这里假设它们是已知属性
    // The results of these concatenated strings need specific analysis; assuming they are known properties here
    maxTouchPoints: 0, // 触摸点数量
                       // Number of touch points
};

// 模拟 location 对象
// Simulate the location object
window.location = {
    _url: new URL('https://www.mashangpa.com/problem-detail/15/'),
    get href() { return this._url.href; },
    set href(newHref) { this._url = new URL(newHref, this._url.href); /* console.log(`Location href changed to: ${this._url.href}`); */ },
    get protocol() { return this._url.protocol; },
    set protocol(val) { const tempUrl = new URL(this.href); tempUrl.protocol = val; this.href = tempUrl.href; },
    get host() { return this._url.host; },
    set host(val) { const tempUrl = new URL(this.href); tempUrl.host = val; this.href = tempUrl.href; },
    get hostname() { return this._url.hostname; },
    set hostname(val) { const tempUrl = new URL(this.href); tempUrl.hostname = val; this.href = tempUrl.href; },
    get port() { return this._url.port; },
    set port(val) { const tempUrl = new URL(this.href); tempUrl.port = val; this.href = tempUrl.href; },
    get pathname() { return this._url.pathname; },
    set pathname(val) { const tempUrl = new URL(this.href); tempUrl.pathname = val; this.href = tempUrl.href; },
    get search() { return this._url.search; },
    set search(val) { const tempUrl = new URL(this.href); tempUrl.search = val; this.href = tempUrl.href; },
    get hash() { return this._url.hash; },
    set hash(val) { const tempUrl = new URL(this.href); tempUrl.hash = val; this.href = tempUrl.href; },
    get origin() { return this._url.origin; },
    assign: function(url) { this.href = url; },
    replace: function(url) { this.href = url; /* console.log("Location replace (simulated as assign)"); */ },
    reload: function(forcedReload) { /* console.log(`Location reload (forced: ${forcedReload})`); */ },
    toString: function() { return this.href; }
};
// 确保 document.URL 与 location.href 同步
// Ensure document.URL is synchronized with location.href
Object.defineProperty(window.document, 'URL', {
    get: function() { return window.location.href; }
});


// 模拟 screen 对象
// Simulate the screen object
window.screen = {
    width: 1920,
    height: 1080,
    availWidth: 1920,
    availHeight: 1040, // 通常略小于 height，因为任务栏等
                       // Usually slightly less than height due to taskbar, etc.
    colorDepth: 24,
    pixelDepth: 24,
    orientation: { type: 'landscape-primary', angle: 0, onchange: null }
};

// 模拟 localStorage 和 sessionStorage
// Simulate localStorage and sessionStorage
function createStorageMock() {
    let store = {};
    return {
        getItem: function(key) { return store[key] !== undefined ? store[key] : null; },
        setItem: function(key, value) { store[key] = String(value); },
        removeItem: function(key) { delete store[key]; },
        clear: function() { store = {}; },
        key: function(index) { const keys = Object.keys(store); return keys[index] || null; },
        get length() { return Object.keys(store).length; },
        // 使其可枚举，以便 `key in storage` 判断生效
        // Make it enumerable so that `key in storage` checks work
        ...store // 这不是标准行为，但有助于模拟 `localStorage.hasOwnProperty`
                 // This is not standard behavior but helps simulate `localStorage.hasOwnProperty`
    };
}
window.localStorage = createStorageMock();
window.sessionStorage = createStorageMock();


// 模拟 Date 对象的一些行为，代码中用到了 getTime, getTimezoneOffset, now
// Simulate some behaviors of the Date object; getTime, getTimezoneOffset, now are used in the code
// Date 本身是 JavaScript 内置对象，但其行为可能在特定环境中需要关注
// Date itself is a JavaScript built-in object, but its behavior might need attention in specific environments
const OriginalDate = Date;
window.Date = function(...args) {
    if (args.length === 0) {
        // 模拟一个固定的时间戳，如果需要可控的测试时间
        // Simulate a fixed timestamp if controllable test time is needed
        // return new OriginalDate(1700000000000);
        return new OriginalDate(); // 或者使用真实时间
                                   // Or use real time
    }
    // 将构造函数参数传递给原始 Date 构造函数
    // Pass constructor arguments to the original Date constructor
    return new OriginalDate(...args);
};
window.Date.now = function() {
    // return 1700000000000; // 对应上面的固定时间戳
                               // Corresponds to the fixed timestamp above
    return OriginalDate.now();
};
// 确保原型链正确
// Ensure the prototype chain is correct
window.Date.prototype = OriginalDate.prototype;
window.Date.prototype.constructor = window.Date; // 修复构造函数指针
                                                 // Fix constructor pointer
// 模拟 getTimezoneOffset，代码中用到了
// Simulate getTimezoneOffset, used in the code
// 实际值会根据运行环境的时区变化，这里固定一个值
// The actual value will change based on the runtime environment's timezone; fixing a value here
OriginalDate.prototype.getTimezoneOffset = function() {
    return 480; // 示例：-8 * 60 = -480 (PST), JS 返回的是分钟数，东八区是 -480
                // Example: -8 * 60 = -480 (PST), JS returns minutes, East Eighth District is -480
};


// 模拟 top 对象 (如果代码中有跨域操作或判断 top === window)
// Simulate the top object (if the code has cross-origin operations or checks top === window)
window.top = window;
window.self = window;
window.parent = window;
window.frames = window; // window.frames 引用自身
                        // window.frames references itself


// 模拟 ActiveXObject (主要用于旧版 IE 的兼容性判断)
// Simulate ActiveXObject (mainly for compatibility checks in older IE)
window.ActiveXObject = function(typeName) {
    // console.log(`ActiveXObject created: ${typeName}`);
    if (typeName === 'ShockwaveFlash.ShockwaveFlash') {
        return {
            // 模拟 ShockwaveFlash 对象的方法和属性
            // Simulate methods and properties of the ShockwaveFlash object
            // getVariable: function() {},
            // ...
        };
    }
    if (typeName === 'Msxml2.XMLHTTP' || typeName === 'Microsoft.XMLHTTP') {
        // 模拟 XMLHTTP 对象
        // Simulate XMLHTTP object
        return new window.XMLHttpRequest();
    }
    // 模拟 `p.w[e[70]][s[2]][e[71]]` 这个路径
    // Simulate the path `p.w[e[70]][s[2]][e[71]]`
    // e[70] -> "frames", s[2] -> 0, e[71] -> "ducument" (注意拼写)
    // e[70] -> "frames", s[2] -> 0, e[71] -> "ducument" (note the spelling)
    //  p.w.frames[0].ducument
    if (typeName.toLowerCase().includes('htmlfile')) { // Wn(a[69], s[89], l) -> "htmlfile"
        return {
            open: function() {},
            write: function(htmlContent) { this._writtenContent = (this._writtenContent || "") + htmlContent; },
            close: function() {},
            // 模拟的 document 结构
            // Simulated document structure
            w: { // 对应代码中的 p.w
                 // Corresponds to p.w in the code
                frames: [{ // 对应代码中的 frames[0]
                           // Corresponds to frames[0] in the code
                    // 代码中是 ducument，这里保持一致
                    // It's 'ducument' in the code, keeping it consistent here
                    ducument: {
                        createElement: function(tagName) {
                            // console.log(`ActiveXObject.ducument.createElement: ${tagName}`);
                            const mockElement = {
                                parentNode: null, // 确保有 parentNode
                                                 // Ensure parentNode exists
                                appendChild: function(child) { if(!this.childNodes) this.childNodes = []; this.childNodes.push(child); child.parentNode = this; },
                                addBehavior: function() {},
                                load: function() {},
                                save: function() {},
                                getAttribute: function(name) { return this.attributes ? this.attributes[name] : null; },
                                setAttribute: function(name, value) { if(!this.attributes) this.attributes = {}; this.attributes[name] = value; },
                                removeAttribute: function(name) { if(this.attributes) delete this.attributes[name]; },
                            };
                            return mockElement;
                        }
                    }
                }]
            }
        };
    }
    // throw new Error("ActiveXObject is not supported in this environment for: " + typeName);
    return null; // 或者返回一个空对象/null，避免抛出错误导致脚本中断
                 // Or return an empty object/null to avoid errors that interrupt the script
};

// 模拟 XMLHttpRequest (如果代码中有 AJAX 请求)
// Simulate XMLHttpRequest (if the code has AJAX requests)
window.XMLHttpRequest = function() {
    this.readyState = 0; // UNSENT
    this.status = 0;
    this.statusText = '';
    this.responseText = '';
    this.responseXML = null; // 如果响应是 XML，则为 Document 对象
                             // Document object if the response is XML
    this.responseURL = '';
    this.response = null; // 根据 responseType 变化
                          // Changes based on responseType
    this.responseType = ''; // "text", "arraybuffer", "blob", "document", "json"

    this._headers = {}; // 请求头
                        // Request headers
    this._responseHeaders = {}; // 响应头
                                // Response headers
    this.onreadystatechange = null;
    this.onload = null;
    this.onerror = null;
    this.onprogress = null;
    this.ontimeout = null;
    this.timeout = 0;
    this.withCredentials = false;

    this._changeReadyState = function(newState, status, statusText, responseText, responseHeadersStr) {
        this.readyState = newState;
        if (status !== undefined) this.status = status;
        if (statusText !== undefined) this.statusText = statusText;
        if (responseText !== undefined) this.responseText = responseText;

        if (responseHeadersStr !== undefined) {
            this._responseHeaders = {};
            const headerPairs = responseHeadersStr.trim().split(/[\r\n]+/);
            headerPairs.forEach(pair => {
                const parts = pair.split(': ');
                if (parts.length === 2) {
                    this._responseHeaders[parts[0].toLowerCase()] = parts[1];
                }
            });
        }
        // 根据 responseType 处理 response
        // Process response based on responseType
        if (this.readyState === 4 && this.status >= 200 && this.status < 300) {
             try {
                if (this.responseType === '' || this.responseType === 'text') {
                    this.response = this.responseText;
                } else if (this.responseType === 'json') {
                    this.response = JSON.parse(this.responseText);
                } else if (this.responseType === 'document' && typeof DOMParser !== 'undefined') {
                    this.response = new DOMParser().parseFromString(this.responseText, "application/xml");
                }
                // arraybuffer 和 blob 的模拟更复杂
                // Simulation of arraybuffer and blob is more complex
            } catch (e) {
                // console.error("Error parsing XHR response:", e);
                this.response = null; // 解析失败
                                      // Parsing failed
            }
        }


        if (typeof this.onreadystatechange === 'function') {
            try { this.onreadystatechange(); } catch (e) { console.error("Error in onreadystatechange:", e); }
        }
        if (this.readyState === 4) {
            if (this.status >= 200 && this.status < 300 && typeof this.onload === 'function') {
                try { this.onload(); } catch (e) { console.error("Error in onload:", e); }
            } else if (typeof this.onerror === 'function') {
                try { this.onerror(); } catch (e) { console.error("Error in onerror:", e); }
            }
        }
    };

    this.open = function(method, url, async, user, password) {
        this.method = method.toUpperCase();
        this.url = url;
        this.responseURL = url; // 简化处理
                                // Simplified handling
        this.async = async === undefined ? true : async;
        this.user = user;
        this.password = password;
        this._changeReadyState(1); // OPENED
        // console.log(`XHR open: ${this.method} ${this.url}`);
    };
    this.setRequestHeader = function(header, value) {
        if (this.readyState !== 1) {
            throw new Error("InvalidStateError: setRequestHeader may only be called when readyState is 1 (OPENED).");
        }
        this._headers[header.toLowerCase()] = value;
        // console.log(`XHR setRequestHeader: ${header}: ${value}`);
    };
    this.send = function(data) {
        if (this.readyState !== 1) {
            throw new Error("InvalidStateError: send may only be called when readyState is 1 (OPENED).");
        }
        // 实际发送请求的逻辑，这里仅模拟
        // Actual request sending logic, simulated here
        this._changeReadyState(2); // HEADERS_RECEIVED (通常在收到响应头后)
                                   // (Usually after receiving response headers)
        // this._changeReadyState(3); // LOADING (数据传输中)
                                   // (Data transferring)

        // 模拟接收到响应
        // Simulate receiving a response
        // 这个需要根据你的请求接口 `https://www.mashangpa.com/api/problem-detail/15/data/?page=3` 来构造
        // This needs to be constructed based on your request interface `https://www.mashangpa.com/api/problem-detail/15/data/?page=3`
        // 这里只是一个非常基础的模拟
        // This is a very basic simulation
        let mockStatus = 200;
        let mockStatusText = 'OK';
        let mockResponseText = '{"status": "success", "data": "mocked_data_for_page_3"}'; // 示例响应
                                                                                            // Example response
        let mockResponseHeaders = "Content-Type: application/json\r\nX-Antispider-Message: some_encrypted_message"; // 代码中会读取这个头
                                                                                                                      // The code will read this header

        if (this.url.includes("https://www.mashangpa.com/api/problem-detail/15/data/?page=3")) {
            // 根据具体 URL 模拟特定响应
            // Simulate specific response based on the URL
        } else {
            // 默认或错误模拟
            // Default or error simulation
            // mockStatus = 404;
            // mockStatusText = 'Not Found';
            // mockResponseText = 'Resource not found';
            // mockResponseHeaders = "Content-Type: text/plain";
        }

        // 模拟异步行为
        // Simulate asynchronous behavior
        if (this.async) {
            setTimeout(() => {
                this._changeReadyState(4, mockStatus, mockStatusText, mockResponseText, mockResponseHeaders);
            }, 10); // 模拟网络延迟
                    // Simulate network delay
        } else {
            // 同步请求（浏览器中已不推荐）
            // Synchronous request (not recommended in browsers anymore)
            this._changeReadyState(4, mockStatus, mockStatusText, mockResponseText, mockResponseHeaders);
        }
        // console.log(`XHR send, data: ${data}, headers: ${JSON.stringify(this._headers)}`);
    };
    this.abort = function() {
        if (this.readyState !== 0 && this.readyState !== 4) {
            this._changeReadyState(0); // UNSENT or ABORTED
        }
        // console.log("XHR abort");
    };
    this.getResponseHeader = function(header) {
        return this._responseHeaders[header.toLowerCase()] || null;
    };
    this.getAllResponseHeaders = function() {
        let headersStr = "";
        for (const h in this._responseHeaders) {
            if (Object.prototype.hasOwnProperty.call(this._responseHeaders, h)) {
                 headersStr += `${h}: ${this._responseHeaders[h]}\r\n`;
            }
        }
        return headersStr;
    };
    // 静态常量
    // Static constants
    this.UNSENT = 0;
    this.OPENED = 1;
    this.HEADERS_RECEIVED = 2;
    this.LOADING = 3;
    this.DONE = 4;
};
// 静态常量挂载到构造函数上
// Mount static constants on the constructor
window.XMLHttpRequest.UNSENT = 0;
window.XMLHttpRequest.OPENED = 1;
window.XMLHttpRequest.HEADERS_RECEIVED = 2;
window.XMLHttpRequest.LOADING = 3;
window.XMLHttpRequest.DONE = 4;

// 模拟 XMLHttpRequest.prototype，代码中对其进行了修改
// Simulate XMLHttpRequest.prototype, it's modified in the code
if (window.XMLHttpRequest) {
    window.XMLHttpRequest.prototype.open = window.XMLHttpRequest.prototype.open || function() {};
    window.XMLHttpRequest.prototype.send = window.XMLHttpRequest.prototype.send || function() {};
    window.XMLHttpRequest.prototype.setRequestHeader = window.XMLHttpRequest.prototype.setRequestHeader || function() {};
    window.XMLHttpRequest.prototype.getAllResponseHeaders = window.XMLHttpRequest.prototype.getAllResponseHeaders || function() { return ""; };
    window.XMLHttpRequest.prototype.getResponseHeader = window.XMLHttpRequest.prototype.getResponseHeader || function() { return null; };
    // 其他在代码中被 hook 的方法也需要在此处预定义，如果它们在原生对象中不存在的话
    // Other methods hooked in the code also need to be predefined here if they don't exist in the native object
}


// 模拟 Event 对象 (如果代码中创建或处理事件对象)
// Simulate the Event object (if the code creates or handles event objects)
window.Event = function(type, eventInitDict) {
    this.type = type;
    this.bubbles = !!(eventInitDict && eventInitDict.bubbles);
    this.cancelable = !!(eventInitDict && eventInitDict.cancelable);
    this.composed = !!(eventInitDict && eventInitDict.composed);
    this.isTrusted = false; // 用户创建的事件通常 isTrusted 为 false
                            // User-created events usually have isTrusted as false
    this.timeStamp = OriginalDate.now();
    this.target = null;
    this.currentTarget = null;
    this.srcElement = null; // 旧版 IE 的 target
                            // Older IE's target
    this.defaultPrevented = false;
    this.returnValue = true; // 旧版 IE
                             // Older IE

    this.preventDefault = function() { this.defaultPrevented = true; this.returnValue = false; };
    this.stopPropagation = function() { /* console.log('stopPropagation called'); */ };
    this.stopImmediatePropagation = function() { /* console.log('stopImmediatePropagation called'); */ };
    // 根据代码中读取的事件属性添加，例如：
    // Add event properties read in the code, e.g.:
    // this.clientX = 0;
    // this.clientY = 0;
    // ... 其他事件属性
    // ... Other event properties
    if (eventInitDict) {
        for (const key in eventInitDict) {
            if (Object.prototype.hasOwnProperty.call(eventInitDict, key) && !(key in this)) {
                this[key] = eventInitDict[key];
            }
        }
    }
};
// 模拟 UIEvent
// Simulate UIEvent
window.UIEvent = function(type, eventInitDict) {
    window.Event.call(this, type, eventInitDict);
    this.view = eventInitDict && eventInitDict.view ? eventInitDict.view : window;
    this.detail = eventInitDict && eventInitDict.detail !== undefined ? eventInitDict.detail : 0;
};
window.UIEvent.prototype = Object.create(window.Event.prototype);
window.UIEvent.prototype.constructor = window.UIEvent;

// 模拟 MouseEvent (如果需要更具体的鼠标事件属性)
// Simulate MouseEvent (if more specific mouse event properties are needed)
window.MouseEvent = function(type, eventInitDict) {
    window.UIEvent.call(this, type, eventInitDict);
    this.screenX = eventInitDict && eventInitDict.screenX !== undefined ? eventInitDict.screenX : 0;
    this.screenY = eventInitDict && eventInitDict.screenY !== undefined ? eventInitDict.screenY : 0;
    this.clientX = eventInitDict && eventInitDict.clientX !== undefined ? eventInitDict.clientX : 0;
    this.clientY = eventInitDict && eventInitDict.clientY !== undefined ? eventInitDict.clientY : 0;
    this.ctrlKey = !!(eventInitDict && eventInitDict.ctrlKey);
    this.shiftKey = !!(eventInitDict && eventInitDict.shiftKey);
    this.altKey = !!(eventInitDict && eventInitDict.altKey);
    this.metaKey = !!(eventInitDict && eventInitDict.metaKey);
    this.button = eventInitDict && eventInitDict.button !== undefined ? eventInitDict.button : 0;
    this.buttons = eventInitDict && eventInitDict.buttons !== undefined ? eventInitDict.buttons : 0;
    this.relatedTarget = eventInitDict && eventInitDict.relatedTarget ? eventInitDict.relatedTarget : null;
    // ... 其他 MouseEvent 属性
    // ... Other MouseEvent properties
};
window.MouseEvent.prototype = Object.create(window.UIEvent.prototype);
window.MouseEvent.prototype.constructor = window.MouseEvent;

// 模拟 WheelEvent (用于 onmousewheel)
// Simulate WheelEvent (for onmousewheel)
window.WheelEvent = function(type, eventInitDict) {
    window.MouseEvent.call(this, type, eventInitDict);
    this.deltaX = eventInitDict && eventInitDict.deltaX !== undefined ? eventInitDict.deltaX : 0;
    this.deltaY = eventInitDict && eventInitDict.deltaY !== undefined ? eventInitDict.deltaY : 0;
    this.deltaZ = eventInitDict && eventInitDict.deltaZ !== undefined ? eventInitDict.deltaZ : 0;
    this.deltaMode = eventInitDict && eventInitDict.deltaMode !== undefined ? eventInitDict.deltaMode : 0; // 0: pixel, 1: line, 2: page
};
window.WheelEvent.prototype = Object.create(window.MouseEvent.prototype);
window.WheelEvent.prototype.constructor = window.WheelEvent;

// 模拟 KeyboardEvent
// Simulate KeyboardEvent
window.KeyboardEvent = function(type, eventInitDict) {
    window.UIEvent.call(this, type, eventInitDict);
    this.key = eventInitDict && eventInitDict.key !== undefined ? String(eventInitDict.key) : "";
    this.code = eventInitDict && eventInitDict.code !== undefined ? String(eventInitDict.code) : "";
    this.location = eventInitDict && eventInitDict.location !== undefined ? eventInitDict.location : 0;
    this.ctrlKey = !!(eventInitDict && eventInitDict.ctrlKey);
    this.shiftKey = !!(eventInitDict && eventInitDict.shiftKey);
    this.altKey = !!(eventInitDict && eventInitDict.altKey);
    this.metaKey = !!(eventInitDict && eventInitDict.metaKey);
    this.repeat = !!(eventInitDict && eventInitDict.repeat);
    this.isComposing = !!(eventInitDict && eventInitDict.isComposing);
    this.charCode = eventInitDict && eventInitDict.charCode !== undefined ? eventInitDict.charCode : 0; // (Deprecated)
    this.keyCode = eventInitDict && eventInitDict.keyCode !== undefined ? eventInitDict.keyCode : 0; // (Deprecated)
    this.which = eventInitDict && eventInitDict.which !== undefined ? eventInitDict.which : 0; // (Deprecated)
};
window.KeyboardEvent.prototype = Object.create(window.UIEvent.prototype);
window.KeyboardEvent.prototype.constructor = window.KeyboardEvent;


// 模拟 fetch API (如果代码中使用)
// Simulate the fetch API (if used in the code)
// 代码中明确 hook 了 fetch: H(t[216], function(n) { ... }) 其中 t[216] 是 'fetch'
// The code explicitly hooks fetch: H(t[216], function(n) { ... }) where t[216] is 'fetch'
window.fetch = async function(input, init) {
    // console.log(`fetch called: ${input}`, init);
    const url = typeof input === 'string' ? input : input.url;
    const method = (init && init.method) || (typeof input === 'string' ? 'GET' : input.method) || 'GET';
    const headers = new window.Headers((init && init.headers) || (typeof input !== 'string' && input.headers));
    const body = (init && init.body) || (typeof input !== 'string' && input.body);

    // 模拟网络请求
    // Simulate network request
    // 这个需要根据你的请求接口 `https://www.mashangpa.com/api/problem-detail/15/data/?page=3` 来构造
    // This needs to be constructed based on your request interface `https://www.mashangpa.com/api/problem-detail/15/data/?page=3`
    // 假设请求的是 JSON 数据
    // Assume the request is for JSON data
    let responseData = { message: "Mocked fetch response for " + url };
    let responseStatus = 200;
    let responseStatusText = 'OK';
    let responseHeaders = new window.Headers({
        'Content-Type': 'application/json',
        'X-Antispider-Message': 'some_encrypted_message_for_fetch' // 代码中会读取这个头
                                                                    // The code will read this header
    });

    if (url.includes("https://www.mashangpa.com/api/problem-detail/15/data/?page=3")) {
        responseData = {"status": "success", "data": "mocked_data_for_page_3_fetch"};
    } else if (url.includes("time.1")) { // 模拟时间服务器请求
                                         // Simulate time server request
        responseData = {"server_time": OriginalDate.now() / 1000}; // 假设返回秒级时间戳
                                                                    // Assume returns second-level timestamp
    }


    // 模拟异步
    // Simulate asynchrony
    await new Promise(resolve => setTimeout(resolve, 10));

    return Promise.resolve({
        ok: responseStatus >= 200 && responseStatus < 300,
        status: responseStatus,
        statusText: responseStatusText,
        headers: responseHeaders,
        url: url,
        redirected: false,
        type: 'basic', // 'cors', 'error', 'opaque', 'opaqueredirect'
        clone: function() { return this; }, // 简化克隆
                                            // Simplified clone
        json: async () => responseData,
        text: async () => JSON.stringify(responseData),
        blob: async () => { throw new Error("Blob response not implemented in mock"); },
        arrayBuffer: async () => { throw new Error("ArrayBuffer response not implemented in mock"); },
        formData: async () => { throw new Error("FormData response not implemented in mock"); },
        // ...其他 Response 对象的方法
        // ... Other Response object methods
    });
};

// 模拟 Headers 对象 (fetch API 使用)
// Simulate the Headers object (used by fetch API)
window.Headers = function(init) {
    this._headers = {}; // 存储为 { 'lowercase-name': [value1, value2] }
                        // Store as { 'lowercase-name': [value1, value2] }
    if (init) {
        if (init instanceof window.Headers) {
            init.forEach((value, name) => {
                this.append(name, value);
            });
        } else if (Array.isArray(init)) { // [['name', 'value'], ...]
            init.forEach(pair => {
                if (pair.length === 2) {
                    this.append(pair[0], pair[1]);
                }
            });
        } else if (typeof init === 'object') { // { name: value, ... }
            for (const name in init) {
                if (Object.prototype.hasOwnProperty.call(init, name)) {
                    this.append(name, init[name]);
                }
            }
        }
    }
};
window.Headers.prototype.append = function(name, value) {
    const lowerName = String(name).toLowerCase();
    value = String(value);
    if (!this._headers[lowerName]) {
        this._headers[lowerName] = [];
    }
    this._headers[lowerName].push(value);
};
window.Headers.prototype.delete = function(name) {
    delete this._headers[String(name).toLowerCase()];
};
window.Headers.prototype.get = function(name) {
    const values = this._headers[String(name).toLowerCase()];
    return values ? values[0] : null; // 标准只返回第一个值
                                      // Standard only returns the first value
};
window.Headers.prototype.has = function(name) {
    return Object.prototype.hasOwnProperty.call(this._headers, String(name).toLowerCase());
};
window.Headers.prototype.set = function(name, value) {
    this._headers[String(name).toLowerCase()] = [String(value)];
};
window.Headers.prototype.forEach = function(callback, thisArg) {
    for (const name in this._headers) {
        if (Object.prototype.hasOwnProperty.call(this._headers, name)) {
            this._headers[name].forEach(value => {
                callback.call(thisArg, value, name, this);
            });
        }
    }
};
// entries(), keys(), values() for iteration if needed by the obfuscated code.
// 这些方法返回迭代器
// These methods return iterators
window.Headers.prototype.entries = function*() {
    for (const name in this._headers) {
        if (Object.prototype.hasOwnProperty.call(this._headers, name)) {
            for (const value of this._headers[name]) {
                yield [name, value];
            }
        }
    }
};
window.Headers.prototype.keys = function*() {
    for (const name in this._headers) {
        if (Object.prototype.hasOwnProperty.call(this._headers, name)) {
            yield name;
        }
    }
};
window.Headers.prototype.values = function*() {
     for (const name in this._headers) {
        if (Object.prototype.hasOwnProperty.call(this._headers, name)) {
            for (const value of this._headers[name]) {
                yield value;
            }
        }
    }
};
// 使其支持 for...of 迭代
// Make it support for...of iteration
window.Headers.prototype[Symbol.iterator] = window.Headers.prototype.entries;


// 模拟 Element.prototype, 代码中对其进行了修改
// Simulate Element.prototype, it's modified in the code
// 例如：`U(Element.prototype, n, u)`
// E.g.: `U(Element.prototype, n, u)`
window.Element = typeof window.Element === 'function' ? window.Element : function() {}; // 确保 Element 构造函数存在
                                                                                          // Ensure Element constructor exists
window.Element.prototype = window.Element.prototype || {}; // 确保 prototype 存在
                                                            // Ensure prototype exists
// 需要根据代码具体 hook 的方法 (n 的值) 来添加，例如 'appendChild', 'setAttribute' 等
// Needs to be added based on the specific hooked method (value of n), e.g., 'appendChild', 'setAttribute', etc.
// 比如代码中 v(at(r[229])), v(r[230]) -> v("appendChild"), v("setAttribute")
// E.g., in the code v(at(r[229])), v(r[230]) -> v("appendChild"), v("setAttribute")
if (!window.Element.prototype.appendChild) {
    window.Element.prototype.appendChild = function(child) {
        // console.log("Element.prototype.appendChild called (mock)");
        if (!this.childNodes) this.childNodes = [];
        this.childNodes.push(child);
        child.parentNode = this;
        return child;
    };
}
if (!window.Element.prototype.setAttribute) {
    window.Element.prototype.setAttribute = function(name, value) {
        // console.log(`Element.prototype.setAttribute called (mock): ${name}=${value}`);
        if (!this.attributes) this.attributes = {};
        this.attributes[name] = String(value);
    };
}
// 其他可能被 hook 的 Element 方法
// Other Element methods that might be hooked
if (!window.Element.prototype.getAttribute) {
    window.Element.prototype.getAttribute = function(name) {
        return this.attributes && this.attributes[name] !== undefined ? this.attributes[name] : null;
    };
}
if (!window.Element.prototype.addEventListener) {
    window.Element.prototype.addEventListener = function(type, listener, options) {
        if (!this._eventListeners) this._eventListeners = {};
        if (!this._eventListeners[type]) this._eventListeners[type] = [];
        this._eventListeners[type].push({listener: listener, options: options});
    };
}
if (!window.Element.prototype.removeEventListener) {
     window.Element.prototype.removeEventListener = function(type, listener, options) {
        if (this._eventListeners && this._eventListeners[type]) {
            this._eventListeners[type] = this._eventListeners[type].filter(
                entry => entry.listener !== listener
            );
        }
    };
}
if (!window.Element.prototype.dispatchEvent) {
    window.Element.prototype.dispatchEvent = function(event) {
        event.target = this; // 设置事件目标
                             // Set event target
        let node = this;
        // 模拟事件冒泡
        // Simulate event bubbling
        while (node && !event.cancelBubble) { // cancelBubble 是旧版 IE 的 stopPropagation
                                              // cancelBubble is older IE's stopPropagation
            if (node._eventListeners && node._eventListeners[event.type]) {
                node._eventListeners[event.type].forEach(entry => {
                    try {
                        entry.listener.call(node, event);
                    } catch (e) {
                        console.error("Error in element event listener:", e);
                    }
                });
            }
            if (!event.bubbles) break; // 如果事件不冒泡，则停止
                                       // If event doesn't bubble, stop
            node = node.parentNode;
        }
        return !event.defaultPrevented;
    };
}


// 模拟 btoa 和 atob (如果环境中没有)
// Simulate btoa and atob (if not in the environment)
if (typeof window.btoa === 'undefined') {
    window.btoa = function(str) {
        try {
            // Node.js 环境
            // Node.js environment
            return Buffer.from(str, 'binary').toString('base64');
        } catch (e) { // 浏览器或纯 JS 环境回退
                      // Fallback for browser or pure JS environment
            let b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            let o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc = "", tmp_arr = [];
            if (!str) return str;
            str = String(str); // 确保是字符串
                               // Ensure it's a string
            do {
                o1 = str.charCodeAt(i++);
                o2 = str.charCodeAt(i++);
                o3 = str.charCodeAt(i++);
                bits = o1 << 16 | o2 << 8 | o3;
                h1 = bits >> 18 & 0x3f;
                h2 = bits >> 12 & 0x3f;
                h3 = bits >> 6 & 0x3f;
                h4 = bits & 0x3f;
                tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
            } while (i < str.length);
            enc = tmp_arr.join('');
            let r = str.length % 3;
            return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
        }
    };
}

if (typeof window.atob === 'undefined') {
    window.atob = function(str) {
        try {
            // Node.js 环境
            // Node.js environment
            return Buffer.from(str, 'base64').toString('binary');
        } catch (e) { // 浏览器或纯 JS 环境回退
                      // Fallback for browser or pure JS environment
            let b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            let o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, dec = "", tmp_arr = [];
            if (!str) return str;
            str = String(str).replace(/[\\s=]+$/, ''); // 移除末尾的空白和等号
                                                       // Remove trailing whitespace and equal signs
            do {
                h1 = b64.indexOf(str.charAt(i++));
                h2 = b64.indexOf(str.charAt(i++));
                h3 = b64.indexOf(str.charAt(i++));
                h4 = b64.indexOf(str.charAt(i++));
                bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
                o1 = bits >> 16 & 0xff;
                o2 = bits >> 8 & 0xff;
                o3 = bits & 0xff;
                if (h3 == 64) {
                    tmp_arr[ac++] = String.fromCharCode(o1);
                } else if (h4 == 64) {
                    tmp_arr[ac++] = String.fromCharCode(o1, o2);
                } else {
                    tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
                }
            } while (i < str.length);
            dec = tmp_arr.join('');
            return dec;
        }
    };
}

// 模拟 encodeURIComponent 和 decodeURIComponent (通常存在)
// Simulate encodeURIComponent and decodeURIComponent (usually exist)
if (typeof window.encodeURIComponent === 'undefined') {
    window.encodeURIComponent = function(str) {
        // 简化版，实际实现复杂
        // Simplified version, actual implementation is complex
        return String(str).replace(/[^\w\s\d\-\.\_\~\!\$\&\'\(\)\*\+\,\;\=\:\@\/\?]/g, function(char) {
            return '%' + char.charCodeAt(0).toString(16).toUpperCase();
        });
    };
}
if (typeof window.decodeURIComponent === 'undefined') {
    window.decodeURIComponent = function(str) {
        return String(str).replace(/%([0-9A-F]{2})/gi, function(match, hex) {
            return String.fromCharCode(parseInt(hex, 16));
        });
    };
}


// 模拟 Math.random (代码中使用了)
// Simulate Math.random (used in the code)
// Math.random 本身是 JavaScript 内置的，但如果需要可预测的随机数，可以覆盖它
// Math.random itself is JavaScript built-in, but can be overridden if predictable random numbers are needed
// const originalMathRandom = Math.random;
// Math.random = function() { return 0.5; /* or some other fixed value / sequence */ };


// 模拟 console.log (如果需要捕获或禁用日志输出)
// Simulate console.log (if logging needs to be captured or disabled)
if (typeof console === 'undefined') {
    window.console = {
        log: function() {},
        error: function() {},
        warn: function() {},
        info: function() {},
        debug: function() {},
        table: function() {},
        trace: function() {},
        // ... 其他 console 方法
        // ... Other console methods
    };
} else {
    // 确保所有常用 console 方法都存在
    // Ensure all common console methods exist
    const methods = ['log', 'error', 'warn', 'info', 'debug', 'table', 'trace', 'dir', 'group', 'groupCollapsed', 'groupEnd', 'time', 'timeEnd', 'timeLog', 'assert', 'clear', 'count', 'countReset'];
    methods.forEach(method => {
        if (typeof console[method] !== 'function') {
            console[method] = function() {};
        }
    });
}


// 针对代码中使用的特定属性或方法，如果标准 BOM/DOM 中不常见，也需要模拟
// For specific properties or methods used in the code that are uncommon in standard BOM/DOM, simulation is also needed
// 例如：
// E.g.:
window.Uint8Array = typeof Uint8Array !== 'undefined' ? Uint8Array : function() {}; // TypedArray
window.ArrayBuffer = typeof ArrayBuffer !== 'undefined' ? ArrayBuffer : function() {};
window.WeakMap = typeof WeakMap !== 'undefined' ? WeakMap : function() {}; // ES6 Map
window.Set = typeof Set !== 'undefined' ? Set : function() {}; // ES6 Set
window.Symbol = typeof Symbol !== 'undefined' ? Symbol : function() {}; // ES6 Symbol
window.Promise = typeof Promise !== 'undefined' ? Promise : function() {}; // ES6 Promise

// 模拟 postMessage 用于窗口间通信
// Simulate postMessage for inter-window communication
window.postMessage = function(message, targetOrigin, transfer) {
    // console.log(`window.postMessage called: message=${JSON.stringify(message)}, targetOrigin=${targetOrigin}`);
    // 实际的 postMessage 逻辑会复杂得多
    // Actual postMessage logic is much more complex
    // 可以通过模拟事件来触发 onmessage
    // Can trigger onmessage by simulating an event
    if (typeof window.onmessage === 'function') {
        const mockEvent = new window.Event('message');
        mockEvent.data = message;
        mockEvent.origin = window.location.origin; // 模拟同源
                                                   // Simulate same origin
        mockEvent.source = window; // 消息来源是自身
                                   // Message source is self
        try {
            window.onmessage(mockEvent);
        } catch(e) {
            console.error("Error in onmessage handler:", e);
        }
    }
};
window.onmessage = null; // 确保 onmessage 属性存在
                         // Ensure onmessage property exists


// 模拟 `onmousewheel`, `DOMMouseScroll` (火狐旧版滚轮事件)
// Simulate `onmousewheel`, `DOMMouseScroll` (older Firefox scroll event)
// `document.onmousewheel` 和 `document.addEventListener('DOMMouseScroll', ...)`
// `document.onmousewheel` and `document.addEventListener('DOMMouseScroll', ...)`
// 在 document.addEventListener 中模拟即可
// Simulation in document.addEventListener is sufficient
window.document.onmousewheel = null; // 确保属性存在
                                     // Ensure property exists

// 模拟 `MozSettingsEvent` 等特定浏览器的 API (如果代码中有分支依赖它们)
// Simulate browser-specific APIs like `MozSettingsEvent` (if the code has branches depending on them)
window.MozSettingsEvent = undefined; // 设为 undefined 表示不存在
                                     // Set to undefined to indicate non-existence

// 模拟 `callPhantom` (PhantomJS 特有)
// Simulate `callPhantom` (PhantomJS specific)
window.callPhantom = undefined; // 设为 undefined 表示不存在
                                // Set to undefined to indicate non-existence

// 模拟 performance API (如果代码中有性能分析)
// Simulate the performance API (if there's performance analysis in the code)
window.performance = window.performance || {
    now: function() {
        // Node.js 有 process.hrtime()
        // Node.js has process.hrtime()
        if (typeof process !== 'undefined' && process.hrtime) {
            const hrTime = process.hrtime();
            return hrTime[0] * 1000 + hrTime[1] / 1000000;
        }
        return OriginalDate.now(); // 简化版，或者使用更精确的时间源
                                   // Simplified version, or use a more precise time source
    },
    timing: { // 模拟 PerformanceTiming 对象
              // Simulate PerformanceTiming object
        navigationStart: OriginalDate.now() - 1000, // 假设页面加载了1秒
                                                     // Assume page loaded for 1 second
        // ... 其他 timing 属性
        // ... Other timing properties
    },
    navigation: { type: 0, redirectCount: 0 }, // PerformanceNavigation
    // ... 其他 performance API 属性和方法
    // ... Other performance API properties and methods
    mark: function() {},
    measure: function() {},
    getEntriesByType: function() { return []; },
    getEntriesByName: function() { return []; }
};

// 一些代码中检测的全局属性，确保它们存在或按预期不存在
// Global properties detected in the code; ensure they exist or don't exist as expected
// window.chrome (用于判断 Chrome 浏览器) (已在 navigator 中处理)
// window.chrome (for detecting Chrome browser) (already handled in navigator)
// window.opr (用于判断 Opera 浏览器) (已在 navigator 中处理)
// window.opr (for detecting Opera browser) (already handled in navigator)
// window.InstallTrigger (用于判断 Firefox)
// window.InstallTrigger (for detecting Firefox)
window.InstallTrigger = undefined; // 通常 Firefox 会定义这个
                                   // Firefox usually defines this

// 确保 Image 对象存在
// Ensure Image object exists
window.Image = function(width, height) {
    const img = window.document.createElement('img');
    if (width !== undefined) img.width = width;
    if (height !== undefined) img.height = height;
    // onload, onerror 等事件处理
    // onload, onerror, etc. event handling
    // img.onload = null;
    // img.onerror = null;
    // Object.defineProperty(img, 'src', {
    //     set: function(url) {
    //         this._src = url;
    //         // 模拟图片加载
    //         // Simulate image loading
    //         // if (typeof this.onload === 'function') setTimeout(this.onload.bind(this), 50);
    //     },
    //     get: function() { return this._src; }
    // });
    return img;
};

// 确保 Option 对象存在 (用于 <select> 元素)
// Ensure Option object exists (for <select> elements)
window.Option = function(text, value, defaultSelected, selected) {
    const opt = window.document.createElement('option');
    if (text !== undefined) opt.text = text;
    if (value !== undefined) opt.value = value;
    if (defaultSelected !== undefined) opt.defaultSelected = defaultSelected;
    if (selected !== undefined) opt.selected = selected;
    return opt;
};

// 模拟 getComputedStyle
// Simulate getComputedStyle
window.getComputedStyle = function(element, pseudoElt) {
    // 返回一个简化的 CSSStyleDeclaration 对象
    // Return a simplified CSSStyleDeclaration object
    // 实际实现非常复杂，这里只返回元素 style 属性的拷贝
    // Actual implementation is very complex; here, only returns a copy of the element's style property
    const style = {...(element.style || {})};
    // 可以添加一些默认值
    // Can add some default values
    style.display = style.display || 'block'; // 假设默认为 block
                                              // Assume default is block
    style.visibility = style.visibility || 'visible';
    style.getPropertyValue = function(propertyName) {
        // 将 CSS 属性名（如 'font-size'）转换为驼峰式（如 'fontSize'）
        // Convert CSS property name (e.g., 'font-size') to camelCase (e.g., 'fontSize')
        const camelCaseName = propertyName.replace(/-([a-z])/g, g => g[1].toUpperCase());
        return this[camelCaseName] || this[propertyName] || ''; // 同时检查驼峰和原始名称
                                                                // Check both camelCase and original name
    };
    return style;
};

// 确保 requestAnimationFrame 和 cancelAnimationFrame 存在
// Ensure requestAnimationFrame and cancelAnimationFrame exist
window.requestAnimationFrame = function(callback) {
    return window.setTimeout(() => callback(performance.now()), 16); // 模拟约 60fps
                                                                      // Simulate approx. 60fps
};
window.cancelAnimationFrame = function(id) {
    window.clearTimeout(id);
};

// 确保 DOMParser 存在 (如果代码中解析 XML/HTML 字符串)
// Ensure DOMParser exists (if the code parses XML/HTML strings)
if (typeof window.DOMParser === 'undefined') {
    window.DOMParser = function() {};
    window.DOMParser.prototype.parseFromString = function(string, type) {
        // 简化模拟：返回一个非常基础的 document-like 对象
        // Simplified simulation: returns a very basic document-like object
        // 实际的解析和 DOM 构建非常复杂
        // Actual parsing and DOM construction are very complex
        const mockDoc = {
            documentElement: {
                textContent: string, // 简单地将字符串作为文本内容
                                     // Simply use the string as text content
                getElementsByTagName: function() { return []; }
            },
            getElementsByTagName: function() { return []; }
        };
        if (type === "application/xml" || type === "text/xml") {
            // 针对 XML 的特殊处理（如果需要）
            // Special handling for XML (if needed)
        } else if (type === "text/html") {
            // 针对 HTML 的特殊处理（如果需要）
            // Special handling for HTML (if needed)
        }
        return mockDoc;
    };
}

// 特殊变量 TOKEN_SERVER_TIME 已经在您的代码中定义了
// The special variable TOKEN_SERVER_TIME is already defined in your code
// var TOKEN_SERVER_TIME = 1736664896.387;

// 其他可能需要的全局函数或对象，根据具体代码执行时的错误提示进行补充
// Other global functions or objects that might be needed can be added based on error messages during code execution

// -------------------------------------------------------------------------
// 您的原始代码应该放在这里
// Your original code should be placed here
//
// var TOKEN_SERVER_TIME = 1736664896.387;
// !function(n, t) { ... }(["", 9527, ...], [1, "", ...]);
//
// console.log(window.dddd())
// -------------------------------------------------------------------------


console.log("BOM/DOM simulation complete. Ready for the obfuscated code.");


// ?源代码
var TOKEN_SERVER_TIME = 1736664896.387;
!function(n, t) {
    !function() {
        var r, e, a;
        r = e = a = n;
        var u, c, s;
        u = c = s = t;
        function v() {
            var n = arguments[s[0]];
            if (!n)
                return r[0];
            for (var t = u[1], o = a[1], i = c[2]; i < n.length; i++) {
                var v = n.charCodeAt(i)
                  , f = v ^ o;
                o = v,
                t += e[2].fromCharCode(f)
            }
            return t
        }
        var f = c[3]
          , l = s[4]
          , p = Wn(e[3], r[4], s[5])
          , d = a[5]
          , h = Wn(c[6], s[7])
          , g = c[8]
          , w = c[9]
          , m = r[6]
          , I = u[10]
          , y = a[7]
          , _ = (s[11],
        c[12],
        s[13])
          , C = e[8]
          , E = u[14]
          , A = ot(e[9], e[10])
          , b = a[11]
          , T = u[15]
          , B = c[16]
          , R = r[12]
          , k = r[13]
          , S = s[17]
          , P = u[18]
          , M = Wn(s[19], s[20], u[21])
          , O = v(s[22], e[14])
          , D = s[23]
          , x = s[24]
          , N = u[25]
          , L = u[26]
          , W = Wn(s[27], r[15])
          , F = u[28]
          , Y = r[16]
          , j = a[17]
          , H = e[18]
          , $ = e[19]
          , U = r[20]
          , V = v(c[29], e[21], e[22])
          , X = s[30]
          , G = s[31]
          , K = s[32]
          , Q = s[33]
          , Z = r[23]
          , q = r[24]
          , z = v(u[12], u[34], s[35])
          , J = u[36]
          , nn = a[25]
          , tn = s[37]
          , rn = c[38]
          , en = r[26]
          , an = c[39]
          , on = s[40]
          , un = a[27]
          , cn = u[41]
          , sn = ot(s[42], c[43])
          , vn = r[28]
          , fn = u[8]
          , ln = s[44]
          , pn = a[29]
          , dn = s[45]
          , hn = a[30]
          , gn = c[46]
          , wn = a[31]
          , mn = a[32]
          , In = s[47]
          , yn = r[33]
          , _n = a[34]
          , Cn = c[48]
          , En = a[8]
          , An = v(a[35], s[49])
          , bn = c[50]
          , Tn = c[51]
          , Bn = at(r[36], s[52])
          , Rn = ot(r[37], e[38])
          , kn = e[39]
          , Sn = u[53]
          , Pn = r[40]
          , Mn = s[54]
          , On = s[55]
          , Dn = Wn(u[56], r[41], r[42])
          , xn = r[43]
          , Nn = u[57]
          , Ln = e[44];
        function Wn() {
            return arguments[u[0]].split(e[0]).reverse().join(c[1])
        }
        var Fn = r[45], Yn = Wn(c[58], e[46]), jn = v(s[59], u[60]), Hn = Wn(r[47], s[61]), $n = s[62], Un = s[63], Vn = u[2], Xn = [new u[27](r[48]), new u[27](c[64])], Gn = [new e[47](ot(a[49])), new u[27](ot(a[50], u[65]))], Kn = c[66][f + l] || r[51].getElementsByTagName(p + d)[r[52]], Qn;
        !function(n) {
            n[e[53]] = s[67];
            function t(n) {
                var t = r[51][u[68]]
                  , o = u[69] + n + s[70]
                  , i = t.indexOf(o);
                if (i == -e[54]) {
                    if (o = n + c[70],
                    t.substr(r[52], o.length) != o)
                        return;
                    i = a[52]
                }
                var f = i + o[v(u[71], s[72])]
                  , l = t.indexOf(r[55], f);
                return l == -a[54] && (l = t[a[56]]),
                t.substring(f, l)
            }
            n[a[57]] = f;
            function o(n, t, a, o, i) {
                var c = n + r[58] + t;
                o && (c += e[59] + o),
                i && (c += v(Jn, u[73], s[74]) + i),
                a && (c += u[75] + a),
                u[66][u[68]] = c
            }
            n[s[76]] = t;
            function i(n, t, r) {
                this.setCookie(n, u[1], u[77], t, r)
            }
            n[s[78]] = o;
            function f() {
                var t = a[60];
                this.setCookie(t, u[67]),
                this.getCookie(t) || (n[r[53]] = e[61]),
                this.delCookie(t)
            }
            n[Wn(N, r[62], c[79])] = i
        }(Qn || (Qn = {}));
        var Zn;
        !function(n) {
            var t = u[80], o = v(nn, s[81], u[82]), i = s[67], f, l = u[83][Wn(u[84], e[63])], p, d;
            function g(n) {
                var t = j;
                return t = dn,
                i ? y(n) : f ? w(n) : void u[2]
            }
            function w(n) {
                E(function() {
                    return n = R(n),
                    f.getAttribute(n)
                })()
            }
            function m() {
                try {
                    return !!(o in s[83] && s[83][o])
                } catch (n) {
                    return void u[2]
                }
            }
            function I(n) {
                try {
                    f.removeItem(n)
                } catch (t) {}
            }
            n[c[85]] = C;
            function y(n) {
                try {
                    return f.getItem(n)
                } catch (t) {
                    return u[86]
                }
            }
            n[c[87]] = B;
            function _(n, t) {
                try {
                    f.setItem(n, t)
                } catch (r) {}
            }
            function C() {
                var n = e[64]
                  , r = u[88];
                if (i = m(),
                i)
                    f = a[65][o];
                else if (l[at(e[66])][at(e[67], a[68])])
                    try {
                        p = new ActiveXObject(Wn(a[69], s[89], l)),
                        p.open(),
                        p.write(s[90]),
                        p.close(),
                        d = p.w[e[70]][s[2]][e[71]],
                        f = d.createElement(n + t + r)
                    } catch (c) {
                        f = l.createElement(o),
                        d = l[Wn(u[91], a[72])] || l.getElementsByTagName(s[92])[s[2]] || l[a[73]]
                    }
            }
            function E(n) {
                return function() {
                    d.appendChild(f),
                    f.addBehavior(s[93]),
                    f.load(o);
                    var t = n();
                    return d.removeChild(f),
                    t
                }
            }
            n[c[94]] = g;
            function A(n) {
                var t, r, e;
                if (t = r = e = a,
                i)
                    I(n);
                else {
                    if (!f)
                        return void e[52];
                    b(n)
                }
            }
            function b(n) {
                E(function() {
                    n = R(n),
                    f.removeAttribute(n),
                    f.save(o)
                })()
            }
            function T(n, t) {
                E(function() {
                    n = R(n),
                    f.setAttribute(n, t),
                    f.save(o)
                })()
            }
            n[a[74]] = A;
            function B(n, t) {
                if (void 0 === t)
                    return A(n);
                if (i)
                    _(n, t);
                else {
                    if (!f)
                        return void u[2];
                    T(n, t)
                }
            }
            function R(n) {
                var t = s[95]
                  , e = r[75]
                  , a = new r[47](t + h + e,c[96]);
                return n.replace(new c[27](u[97]), v(s[98], s[99], s[100])).replace(a, c[101])
            }
        }(Zn || (Zn = {}));
        var qn = function() {
            var n, t, r;
            n = t = r = a;
            var e, o, i;
            e = o = i = s;
            var u = o[15]
              , c = o[102]
              , f = e[103];
            function l(r) {
                var a = o[102]
                  , i = e[103];
                this[n[76]] = r;
                for (var u = t[52], c = r[a + g + i]; u < c; u++)
                    this[u] = t[52]
            }
            return l[e[104]][w + m + I + u] = function() {
                for (var a = e[105], u = this[a + y], c = [], s = -e[0], v = o[2], f = u[r[56]]; v < f; v++)
                    for (var l = this[v], p = u[v], d = s += p; c[d] = l & parseInt(t[77], n[78]),
                    --p != r[52]; )
                        --d,
                        l >>= parseInt(n[79], i[106]);
                return c
            }
            ,
            l[v(t[80], t[81], b)][ot(i[107])] = function(n) {
                for (var r = e[8], a = this[ot(e[108], e[109])], o = t[52], u = e[2], s = a[c + r + f]; u < s; u++) {
                    var v = a[u]
                      , l = i[2];
                    do {
                        l = (l << t[82]) + n[o++]
                    } while (--v > t[52]);
                    this[u] = l >>> i[2]
                }
            }
            ,
            l
        }(), zn;
        !function(n) {
            var t = s[13]
              , o = c[53]
              , i = r[83]
              , f = r[84]
              , l = s[110]
              , d = r[85]
              , h = r[86];
            function g(n, a, o, i, u) {
                for (var c = s[13], v = r[87], f = n[s[111]]; a < f; )
                    o[i++] = n[a++] ^ u & parseInt(c + v + t + _, r[88]),
                    u = ~(u * parseInt(e[89], e[82]))
            }
            function w(n) {
                for (var t = c[112], i = r[52], v = n[s[111]], f = []; i < v; ) {
                    var l = n[i++] << parseInt(C + t, c[113]) | n[i++] << e[82] | n[i++];
                    f.push(m.charAt(l >> parseInt(e[90], e[82])), m.charAt(l >> parseInt(s[114], e[78]) & parseInt(a[91], r[88])), m.charAt(l >> u[59] & parseInt(E + o, a[78])), m.charAt(l & parseInt(a[92], u[113])))
                }
                return f.join(e[0])
            }
            for (var m = at(u[115], s[116]), I = {}, y = u[2]; y < parseInt(i + A, e[93]); y++)
                I[m.charAt(y)] = y;
            function O(n) {
                var t, r, e;
                t = r = e = s;
                var o, i, u;
                o = i = u = a;
                for (var c = ot(i[94]), l = e[2], p = n[o[56]], d = []; l < p; ) {
                    var h = I[n.charAt(l++)] << parseInt(at(t[117]), u[82]) | I[n.charAt(l++)] << parseInt(v(t[118], u[95], e[119]), o[88]) | I[n.charAt(l++)] << t[59] | I[n.charAt(l++)];
                    d.push(h >> parseInt(e[120], t[106]), h >> parseInt(t[121], r[122]) & parseInt(f + b + c, t[106]), h & parseInt(o[96], u[88]))
                }
                return d
            }
            function D(n) {
                var t = O(n);
                if (rn,
                p,
                t[r[52]] != h)
                    return error = T + B + l,
                    void 0;
                var a = t[c[0]]
                  , o = [];
                return g(t, +parseInt(e[79], c[122]), o, +u[2], a),
                x(o) == a ? o : void 0
            }
            function x(n) {
                var t = o;
                t = Vn;
                for (var e = c[2], i = a[52], u = n[c[111]]; i < u; i++)
                    e = (e << s[123]) - e + n[i];
                return e & parseInt(s[124], r[88])
            }
            function N(n) {
                var t = et
                  , r = x(n)
                  , e = [h, r];
                return g(n, +a[52], e, +a[88], r),
                t = P,
                w(e)
            }
            n[e[97]] = w,
            n[R + k + S] = O,
            n[u[125]] = N,
            n[d + P + M] = D
        }(zn || (zn = {}));
        var Jn;
        !function(n) {
            var t = Fn
              , o = at(c[126], a[98])
              , i = r[99]
              , f = v(U, u[127])
              , l = s[128]
              , p = ot(a[100])
              , d = r[5]
              , h = r[101]
              , g = ot(u[129])
              , w = s[130]
              , m = r[102]
              , C = a[103]
              , E = e[104];
            function A(n) {
                for (var t = (Tn,
                I,
                []), e = r[52]; e < n[c[111]]; e++)
                    t.push(n.charCodeAt(e));
                return t
            }
            function b() {
                var n = new e[105];
                try {
                    return time = s[52].now(),
                    time / parseInt(c[131], a[88]) >>> c[2]
                } catch (t) {
                    return time = n.getTime(),
                    time / parseInt(s[121], s[84]) >>> r[52]
                }
            }
            function T(n) {
                var t = u[8]
                  , o = {}
                  , i = function(n, o) {
                    var i = c[102], f, l, p, d;
                    for (o = o.replace(s[132], u[1]),
                    o = o.substring(u[0], o[e[56]] - c[0]),
                    f = o.split(c[133]),
                    p = c[2]; p < f[i + t + O]; p++)
                        if (l = f[p].split(v(r[106], c[134])),
                        l && !(l[r[56]] < s[122])) {
                            for (d = r[88]; d < l[r[56]]; d++)
                                l[r[54]] = l[r[54]] + r[107] + l[d];
                            l[s[2]] = new r[47](c[135]).test(l[e[52]]) ? l[a[52]].substring(u[0], l[e[52]][D + x] - c[0]) : l[a[52]],
                            l[r[54]] = new a[47](c[135]).test(l[r[54]]) ? l[e[54]].substring(s[0], l[a[54]][a[56]] - u[0]) : l[s[0]],
                            n[l[c[2]]] = l[e[54]]
                        }
                    return n
                };
                return new r[47](e[108]).test(n) && (o = i(o, n)),
                o
            }
            function B(n) {
                var t, e, a;
                t = e = a = c;
                var u, s, v;
                if (u = s = v = r,
                typeof n === ot(s[109], sn) && n[Wn(y, a[136], s[110])])
                    try {
                        switch (parseInt(n[e[137]])) {
                        case parseInt(a[131], t[122]):
                            break;
                        case parseInt(v[111], s[78]):
                            top[e[138]][v[112]] = n[t[139]];
                            break;
                        case parseInt(u[113], e[122]):
                            top[o + i + N][e[140]] = n[s[114]];
                            break;
                        default:
                            break
                        }
                    } catch (f) {}
            }
            function R(n, t, r) {
                var e, a, o;
                e = a = o = u,
                q ? n.addEventListener(t, r) : n.attachEvent(a[25] + t, r)
            }
            function k() {
                return Math.random() * parseInt(u[141], r[78]) >>> r[52]
            }
            function S(n, t) {
                var o = en
                  , i = new r[47](e[115],a[116]);
                o = T;
                var s = new u[27](v(p, r[117], m));
                if (n) {
                    var f = n.match(i);
                    if (f) {
                        var l = f[u[0]];
                        return t && s.test(l) && (l = l.split(r[118]).pop().split(r[107])[c[2]]),
                        l
                    }
                }
            }
            function P(n) {
                var t = mn
                  , o = c[142]
                  , i = r[119]
                  , v = e[120]
                  , I = a[121];
                if (!(n > e[122])) {
                    n = n || a[52];
                    var y = parseInt(u[143], e[78])
                      , _ = a[51].createElement(u[144]);
                    t = Q,
                    _[c[145]] = location[r[123]] + a[124] + parseInt((new r[105]).getTime() / y) + (f + o + l),
                    _[e[125]] = function() {
                        Vn = u[0],
                        setTimeout(function() {
                            P(++n)
                        }, n * parseInt(e[126], u[84]))
                    }
                    ,
                    _[p + L + d] = _[s[146]] = function() {
                        var n, t, r;
                        n = t = r = a;
                        var e, o, u;
                        e = o = u = c;
                        var s = e[147];
                        this[t[127]] && this[i + W] !== o[148] && this[u[149]] !== o[150] && this[s + F + h] !== u[151] || (Vn = n[52],
                        _[e[152]] = _[g + w + v] = n[128])
                    }
                    ,
                    c[66][m + I].appendChild(_)
                }
            }
            function M(n) {
                var t, e, a;
                t = e = a = r;
                var o, i, u;
                return o = i = u = s,
                new u[27](t[129]).test(n)
            }
            function X() {
                var n = new s[52];
                return typeof TOKEN_SERVER_TIME == s[153] ? r[52] : (time = parseInt(TOKEN_SERVER_TIME),
                time)
            }
            function G(n) {
                var t, e, a;
                t = e = a = s;
                var o, i, u;
                o = i = u = r;
                for (var c = u[52], v = a[2], f = n[o[56]]; v < f; v++)
                    c = (c << a[123]) - c + n.charCodeAt(v),
                    c >>>= o[52];
                return c
            }
            function K(n) {
                var t = new s[27](e[130],s[80]);
                if (n) {
                    return n.match(t)
                }
            }
            function Z(n) {
                var t = new u[27](c[154]);
                if (M(n))
                    return n;
                var o = t.test(n) ? -a[86] : -parseInt(r[79], e[88]);
                return (tn,
                _,
                n.split(s[155])).slice(o).join(a[131])
            }
            n[Y + C + j] = T,
            t = En,
            n[c[156]] = P,
            n[ot(u[157])] = B,
            n[r[132]] = A,
            n[c[158]] = G,
            n[c[159]] = k,
            n[r[133]] = M,
            n[s[160]] = Z,
            n[E + H] = S,
            n[$ + U] = K,
            n[s[161]] = z,
            n[s[162]] = b,
            n[r[134]] = X;
            var q = !!a[65][a[135]];
            function z(n) {
                for (var t = v(O, u[163]), a = e[136], o = s[2], i = n[V + t + a] - s[0]; i >= r[52]; i--)
                    o = o << r[54] | +n[i];
                return o
            }
            n[u[164]] = R
        }(Jn || (Jn = {}));
        var nt;
        !function(n) {
            var t = u[165]
              , o = a[137]
              , i = at(s[166], s[167])
              , v = u[168]
              , f = a[138]
              , l = c[169]
              , p = ot(s[170], B)
              , d = a[52]
              , h = r[52]
              , g = c[2]
              , w = c[2]
              , m = c[2]
              , I = s[2]
              , y = s[67]
              , _ = t + X in s[66].createElement(s[171]) ? o + G + i : s[172]in c[66] ? u[173] : v + K + f + Q;
            Jn.eventBind(s[66], _, S),
            Jn.eventBind(a[51], r[139], T),
            Jn.eventBind(u[66], Wn(e[140], e[141], s[174]), T),
            Jn.eventBind(c[66], l + Z + q, M),
            Jn.eventBind(u[66], c[175], b);
            function C() {
                return w
            }
            function E() {
                return d
            }
            function b(n) {
                w++
            }
            function T(n) {
                d++
            }
            function R() {
                return h
            }
            function k() {
                return g
            }
            function S(n) {
                h++
            }
            function P() {
                return {
                    x: m,
                    y: I,
                    trusted: y
                }
            }
            function M(n) {
                var t, r, e;
                t = r = e = a;
                var o, i, u;
                o = i = u = c;
                var s = (S,
                A,
                u[36]);
                g++,
                y = void 0 == n[s + z] || n[J + nn],
                m = n[ot(r[142], o[84])],
                I = n[i[176]]
            }
            n[e[143]] = E,
            n[ot(e[144])] = R,
            n[e[145]] = k,
            n[u[177]] = C,
            n[tn + p + rn] = P
        }(nt || (nt = {}));
        var tt;
        !function(n) {
            var t = e[146]
              , f = c[4]
              , l = c[178]
              , p = u[179]
              , h = r[147]
              , g = r[148]
              , m = e[149]
              , I = s[102]
              , y = v(rn, u[180], zn)
              , _ = at(r[150], Y)
              , C = a[151]
              , E = u[181]
              , A = c[182]
              , b = e[152]
              , B = u[183]
              , R = s[184]
              , k = a[64];
            BROWSER_LIST = {
                _1: function() {
                    return c[185]in r[65]
                },
                _2: function() {
                    return a[153]in r[65]
                },
                _3: function() {
                    return e[154]in u[83]
                },
                _4: function() {
                    var n = J
                      , r = u[186]
                      , o = s[187];
                    return n = et,
                    e[155]in e[65] && !(r + o + t in a[51].getElementsByTagName(en + f)[s[2]])
                },
                _5: function() {
                    return e[155]in s[83] && !(e[156]in c[83])
                },
                _6: function() {
                    var n, t, r;
                    n = t = r = c;
                    var e, o, u;
                    return e = o = u = a,
                    e[155]in t[83] && !i
                },
                _7: function() {
                    var n, t, r;
                    n = t = r = a;
                    var e, o, i;
                    return e = o = i = u,
                    o[188]in o[83] && !o[83][r[157]]
                },
                _8: function() {
                    return a[155]in e[65] && !e[65][e[158]]
                },
                _9: function() {
                    return u[188]in s[83] && r[65][e[158]]
                },
                _10: function() {
                    var n, t, r;
                    n = t = r = a;
                    var e, o, i;
                    e = o = i = c;
                    var u = o[189];
                    return n[159] === navigator[an + u + on]
                },
                _11: function() {
                    return ot(u[190]) === navigator[r[160]]
                },
                _12: function() {
                    var n, t, r;
                    return n = t = r = s,
                    at(t[191])in r[83]
                },
                _13: function() {
                    var n, t, r;
                    n = t = r = s;
                    var a, o, i;
                    return a = o = i = e,
                    i[161]in t[83]
                },
                _14: function() {
                    return new u[27](a[162],r[116]).test(navigator.appVersion)
                },
                _15: function() {
                    return e[163]in navigator
                },
                _16: function() {
                    return new c[27](u[192],ot(u[193])).test(navigator.vendor)
                },
                _17: function() {
                    return u[194]in u[83]
                },
                _18: function() {
                    return u[195]in c[83] && new r[47](s[196],e[116]).test(o)
                },
                _19: function() {
                    var n, t, r;
                    n = t = r = s;
                    var a, i, u;
                    a = i = u = e;
                    var c = ot(i[164], i[165])
                      , v = u[166];
                    return l + c + v in t[83] && new n[27](u[167],t[80]).test(o)
                },
                _20: function() {
                    var n = u[197];
                    return r[161]in u[83] && new r[47](n + un).test(o)
                },
                _21: function() {
                    return ot(s[198], r[168])in r[65] && new c[27](c[199],r[116]).test(o)
                },
                _22: function() {
                    var n = x;
                    return n = S,
                    s[195]in e[65] && new c[27](a[169]).test(o)
                },
                _23: function() {
                    var n, t, r;
                    n = t = r = c;
                    var a, i, u;
                    return a = i = u = e,
                    u[161]in a[65] && new t[27](u[170]).test(o)
                },
                _24: function() {
                    return s[195]in r[65] && s[200]in e[65]
                },
                _25: function() {
                    var n = w;
                    return n = Q,
                    cn + sn in u[83]
                }
            };
            function P() {
                var n = v(q, e[171], r[172]);
                return plugin_num = a[52],
                navigator[u[201]] && (plugin_num = navigator[p + h + n][c[111]]),
                plugin_num
            }
            function M() {
                for (var n in BROWSER_LIST)
                    if (BROWSER_LIST.hasOwnProperty(n)) {
                        var t = BROWSER_LIST[n];
                        if (t())
                            return +n.substr(u[0])
                    }
                return s[2]
            }
            var O = navigator[s[201]];
            function D() {
                var n, t, r;
                n = t = r = s;
                var e, o, i;
                e = o = i = a;
                var u = e[173];
                return at(e[174]) == (navigator[g + vn + u + m] || navigator[n[202]])
            }
            function N(n) {
                if (!e[65][at(s[191])])
                    return !a[54];
                var t;
                try {
                    t = new a[65][a[155]](n)
                } catch (r) {
                    return !u[0]
                }
                return !!t
            }
            function L() {
                return a[65][a[175]][a[176]]
            }
            function W() {
                for (var n = [], t = r[52]; t < parseInt(a[79], a[93]); t++)
                    n[t] = tn[t]();
                return Jn.booleanToDecimal(n)
            }
            function F() {
                var t = (n,
                d,
                navigator[r[177]]);
                return t && t[I + fn + y] > a[52]
            }
            function j() {
                return z(new a[47](ln + pn + _,s[80])) || N(s[203])
            }
            function H() {
                return z(new a[47](Wn(s[204], r[178]),e[116]))
            }
            function $() {
                var n = Y
                  , t = at(a[179], a[180]);
                n = J;
                var r;
                try {
                    r = c[66].createElement(dn + t).getContext(c[205])
                } catch (e) {}
                return !!r
            }
            function U() {
                return -parseInt(r[181], u[113]) === (new c[52]).getTimezoneOffset()
            }
            function V() {
                var n, t, e;
                n = t = e = r;
                var a, o, i;
                a = o = i = u;
                for (var c = navigator[o[206]], s = o[2]; s < An[o[111]]; s++)
                    if (An[s].test(c))
                        return s + e[54];
                return i[2]
            }
            function X() {
                var n = (m,
                B,
                a[182]);
                return z(new r[47](C + n + hn))
            }
            function G() {
                return gn + E + wn + A in a[51]
            }
            function K() {
                var n, t, r;
                return n = t = r = c,
                r[86]
            }
            function Z() {
                return u[86]
            }
            function q() {
                return navigator.javaEnabled()
            }
            function z(n) {
                var t = T;
                t = h;
                for (var r = a[52]; r < O[u[111]]; r++) {
                    var e = O[r][s[207]];
                    if (n.test(e))
                        return !a[52]
                }
                return !c[0]
            }
            function J() {
                var n, t, r;
                return n = t = r = e,
                n[183] === r[51][t[184]]
            }
            function nn() {
                var n, t, r;
                return n = t = r = c,
                n[86]
            }
            var tn = [q, j, H, X, L, En, D, bn, G, U, $, F, J, nn, Z, K];
            function En() {
                var n = Nn;
                n = un;
                try {
                    return a[185]in s[83]
                } catch (t) {
                    return s[86]
                }
            }
            var An = [new a[47](u[208]), new a[47](e[186]), new e[47](a[187]), new s[27](mn + In), new e[47](r[188]), new u[27](e[189]), new s[27](s[209]), new u[27](u[210]), new a[47](b + yn), new e[47](B + R + k), new c[27](u[211])];
            function bn() {
                return new u[27](ot(r[190]),u[80]).test(navigator[s[212]] || navigator[_n + Cn])
            }
            n[s[213]] = V,
            n[c[214]] = M,
            n[e[191]] = P,
            n[e[192]] = W
        }(tt || (tt = {}));
        var rt;
        !function(n) {
            var t = e[87], o = a[8], i = e[8], f = s[215], l = r[52], p = s[0], d = parseInt(c[216], u[122]), h = e[86], g = u[217], w = u[123], m = e[165], I = parseInt(t + En, c[122]), y = parseInt(a[79], a[82]), _ = c[218], C = parseInt(a[193], e[82]), E = parseInt(o + i, r[78]), A = parseInt(u[219], s[122]), b = parseInt(f + An, s[106]), T = parseInt(r[194], s[106]), B = parseInt(ot(s[220], e[195]), r[82]), R = parseInt(e[196], u[122]), k = parseInt(e[197], a[78]), S;
            function P() {
                var n = s[0]
                  , t = r[88]
                  , e = parseInt(u[13], c[122])
                  , a = s[217];
                S = new qn([a, a, a, a, n, n, n, e, t, t, t, t, t, t, t, a, t, n]),
                S[p] = Jn.serverTimeNow(),
                M(),
                S[B] = Vn,
                S[k] = Un,
                S[R] = c[2],
                S[h] = Jn.strhash(navigator.userAgent),
                S[b] = tt.getBrowserFeature(),
                S[g] = tt.getPlatform(),
                S[w] = tt.getBrowserIndex(),
                S[m] = tt.getPluginNum()
            }
            function M() {
                var n = Qn.getCookie(Fn) || Zn.get(jn);
                if (n && n[s[111]] == parseInt(c[221], e[93])) {
                    var t = zn.decode(n);
                    if (t && (S.decodeBuffer(t),
                    S[l] != s[2]))
                        return
                }
                S[l] = Jn.random()
            }
            function O() {
                S[R]++,
                S[p] = Jn.serverTimeNow(),
                S[d] = Jn.timeNow(),
                S[B] = Vn,
                S[I] = nt.getMouseMove(),
                S[y] = nt.getMouseClick(),
                S[_] = nt.getMouseWhell(),
                S[C] = nt.getKeyDown(),
                S[E] = nt.getClickPos().x,
                S[A] = nt.getClickPos().y;
                var ts = new Date().getTime()
                var n = S.toBuffer();
                return btoa(zn.encode(n)+ts)
            }
            n[e[57]] = P;
            function D() {
                return O()
            }
            window.dddd=D
            n[v(an, a[198], r[199])] = D
        }(rt || (rt = {}));
        var et;
        function at() {
            var n, t, r;
            n = t = r = u;
            var a, o, i;
            a = o = i = e;
            var c = arguments[o[52]];
            if (!c)
                return t[1];
            for (var s = o[0], v = o[1], f = a[52]; f < c.length; f++) {
                var l = c.charCodeAt(f)
                  , p = l ^ v;
                v = v * f % n[222] + o[200],
                s += i[2].fromCharCode(p)
            }
            return s
        }
        !function(n) {
            var t, r, e;
            t = r = e = a;
            var o, i, c;
            o = i = c = u;
            var s = c[223], f = t[201], l = i[224], p = o[225], d = t[202], h = i[92], g = e[203], w = o[226], m = c[110], I = c[223], y = !!r[65][r[135]], _, E, A, T, B, R;
            function k(n) {
                var r = o[227]
                  , e = t[204];
                return j(n) && Qn[r + e + s]
            }
            function S(n, t, e) {
                var a, i, u;
                a = i = u = o;
                var c, s, v;
                c = s = v = r;
                var f = b;
                if (f = En,
                Wn(v[205], s[206])in t)
                    return t.apply(n, e);
                switch (e[v[56]]) {
                case v[52]:
                    return t();
                case i[0]:
                    return t(e[c[52]]);
                case u[122]:
                    return t(e[c[52]], e[a[0]]);
                default:
                    return t(e[u[2]], e[v[88]], e[i[63]])
                }
            }
            function P() {
                var n, t, r;
                n = t = r = i;
                var a, o, u;
                a = o = u = e,
                U(o[65], n[188], function(r) {
                    return function(e) {
                        if (e && new t[27](f + l,v(Fn, n[228])).test(e))
                            try {
                                D()
                            } catch (o) {
                                return a[207]
                            }
                        return new r(e)
                    }
                })
            }
            function M() {
                var n = t[51].getElementsByTagName(c[229]);
                function a(a) {
                    if (!new i[27](at(o[230])).test(a.protocol))
                        return r[61];
                    var u = a[i[231]];
                    if (!u) {
                        var s = n[i[2]];
                        s && (u = s[t[208]])
                    }
                    if ((!u || new e[47](ot(c[232], $n),c[80]).test(u)) && (a[o[140]].split(i[233])[e[52]] == _ && a[at(i[234], c[235])]))
                        return i[86];
                    return e[44]
                }
                Jn.eventBind(t[51], r[209], function(n) {
                    var t = i[236];
                    n = n || event;
                    var r = n[bn + t + p] || n[Wn(o[5], c[237], o[238])];
                    do {
                        if (r[i[240]] == i[241]) {
                            a(r) && D();
                            break
                        }
                    } while (r = r[i[239]])
                }),
                Jn.eventBind(i[66], o[242], D),
                Ln || Jn.eventBind(o[83], e[210], D)
            }
            function O() {
                var n = ot(o[243])
                  , e = o[244];
                _ = location[c[140]].split(o[233])[i[2]],
                E = location[n + Tn + e],
                T = location[i[245]],
                B = location[ot(t[211])],
                A = Jn.getRootDomain(E),
                R = new o[27](i[246] + A.replace(new r[47](t[212],i[96]), ot(c[247], r[213])) + t[214],r[116]),
                M(),
                Y(),
                N(),
                $(),
                D()
            }
            function D() {
                var n = rt.update();
                return Qn.setCookie(Fn, n, o[248], A, t[215]),
                Zn.set(jn, n),
                n
            }
            function N() {
                var n = B;
                n = Un;
                var r = ot(c[249]);
                H(t[216], function(n) {
                    return function(t, a) {
                        var i, u, c;
                        i = u = c = e;
                        var s, v, f;
                        s = v = f = o,
                        f[22][i[217]][f[250]].call(t) === v[251] && (t = t[u[218]] || i[0]);
                        var l = D();
                        return a = a || {},
                        Qn[at(u[219], K)] ? X(t) ? k || (t = L(t)) : a[i[220]] ? a[v[252]][jn] = l : (a[s[252]] = new Headers,
                        a[u[220]].append(jn, l)) : (l = rt.update(),
                        a[f[252]] ? a[Bn + d][jn] = l : (a[h + r] = new Headers,
                        a[i[220]].append(jn, l))),
                        n.call(this, t, a)
                    }
                })
            }
            function L(n) {
                for (var a = rt.update(), u = Gn, s = c[2]; s < u[Rn + kn]; s++)
                    if (u[s].test(n))
                        return n;
                return n + (new t[47](v(r[82], r[221], t[222])).test(n) ? Wn(c[253], i[254], bn) : e[223]) + Yn + c[70] + o[255](a)
            }
            function W(n) {
                var t = cn
                  , a = i[16]
                  , u = e[43];
                t = C;
                var s;
                U(n, c[256], function(n) {
                    return function() {
                        var t, r, a;
                        t = r = a = i;
                        var o, u, c;
                        o = u = c = e;
                        try {
                            X(arguments[o[54]]) && !k(arguments[a[0]]) ? arguments[t[0]] = L(arguments[r[0]]) : s = D(),
                            n.apply(this, arguments),
                            X(arguments[r[0]]) || (Qn[u[53]] || (s = rt.update()),
                            this.setRequestHeader(jn, s))
                        } catch (v) {
                            return o[207]
                        }
                    }
                }),
                U(n, c[257], function(n) {
                    var t = w;
                    return t = p,
                    function() {
                        var t, e, i;
                        t = e = i = r;
                        var c, s, v;
                        c = s = v = o;
                        var f = c[258];
                        try {
                            if (parseInt(this.status) === parseInt(f + g + Sn, e[78])) {
                                for (var l = n.apply(this, arguments), p = new s[27](i[224],t[225]), d, h, w = {}; d = p.exec(l); )
                                    w[d[s[0]].toLowerCase()] = d[i[88]];
                                Jn.analysisRst(Jn.parse(w[$n.toLowerCase()]))
                            }
                        } catch (m) {
                            return Pn + a + u
                        }
                        return n.apply(this, arguments)
                    }
                })
            }
            function Y() {
                var n = i[83][Wn(x, c[259])];
                n && W(n.prototype),
                r[65][o[188]] && P()
            }
            function j(n) {
                var r = rn;
                r = p;
                var e = Jn.getHostFromUrl(n, t[44]);
                return e ? R.test(e) : t[44]
            }
            function H(n, t) {
                if (n in i[83]) {
                    c[83].hasOwnProperty(n) && U(i[83], n, t);
                    var r = e[65][c[260]];
                    if (r) {
                        var a = r[o[104]];
                        a.hasOwnProperty(n) && U(a, n, t)
                    }
                }
            }
            function $() {
                var n = at(c[261])
                  , e = c[262]
                  , a = r[226];
                function u(n) {
                    return function(t) {
                        try {
                            s(t)
                        } catch (r) {
                            return r
                        }
                        return S(this, n, arguments)
                    }
                }
                function s(r) {
                    var u = it
                      , c = i[50]
                      , s = at(o[263], i[264]);
                    if (r && r[c + s + Mn + On] == n + e + Dn) {
                        var v = r[t[227]];
                        u = F,
                        V(v) || (k(v) ? D() : r[a + xn + w] = L(r.src))
                    }
                }
                function v(n) {
                    y ? U(Element.prototype, n, u) : (U(Kn, n, u),
                    U(r[51].body, n, u))
                }
                t[65][Hn] = Jn[t[228]],
                v(at(r[229])),
                v(r[230])
            }
            function U(n, a, i) {
                var u = D
                  , s = c[265]
                  , v = ot(t[231]);
                if (!n)
                    return e[61];
                var f = n[a];
                if (u = S,
                !f)
                    return o[86];
                var l = i(f);
                return y || (l[c[266]] = f + t[0]),
                l[s + m + v + I] = f,
                n[a] = l,
                r[44]
            }
            function V(n) {
                var t = Xn
                  , e = o[83][r[232]];
                e && (t = t.concat(e));
                for (var a = i[2]; a < t[c[111]]; a++)
                    if (t[a].test(n))
                        return o[67];
                return o[86]
            }
            function X(n) {
                var t = Jn.getOriginFromUrl(n);
                return t ? !new r[47](e[233] + T).test(t[c[122]]) || !new o[27](B).test(t[r[54]]) : e[61]
            }
            n[t[57]] = O
        }(et || (et = {}));
        function ot() {
            var n, t, e;
            n = t = e = c;
            var a, o, i;
            a = o = i = r;
            var u = arguments[a[52]];
            if (!u)
                return o[0];
            for (var s = a[0], v = n[267], f = o[200], l = t[2]; l < u.length; l++) {
                var p = u.charCodeAt(l);
                f = (f + t[0]) % v.length,
                p ^= v.charCodeAt(f),
                s += i[2].fromCharCode(p)
            }
            return s
        }
        var it;
        !function(n) {
            var t = Wn(r[234], e[235]);
            function o() {
                try {
                    c()
                } catch (n) {
                    return n
                }
            }
            function i() {
                var n = parseInt(t + Nn, s[113]);
                setInterval(function() {
                    Jn.getServerTime()
                }, n)
            }
            function c() {
                Qn.Init(),
                Zn.Init(),
                rt.Init(),
                et.Init(),
                i()
            }
            u[83][v(r[236], e[237])] || (o(),
            u[83][a[238]] = a[44])
        }(it || (it = {}))
    }()
}(["", 9527, String, Boolean, "eh", "ad", "Bu", "ileds", "1", "\b", Array, "7", "base", "64De", "\u2543\u252b", "etatS", "pa", "e", "FromUrl", "getOrigi", "nFromUrl", "\u255b\u253e", "b?\x18q)", "ic", "k", "sted", "he", "wser", "oNo", "ckw", "ent", "hst", "^And", "RM", "systemL", 5, "\u255f\u0978\u095b\u09f5", "TR8", "!'", "gth", "er", "TP", 83, "r", !0, "v", "v-nixeh", RegExp, "thsi.cn", 'K\x19"]K^xVV', "KXxAPD?\x1b[Y", document, 0, "allow", 1, "; ", "length", "Init", "=", "; domain=", "checkcookie", !1, "eikooCled", "tnemucod", "d", window, "\u2553\u0972\u0959\u09e4\u09bd\u0938\u0980\u09c5\u09b1\u09d1\u09a7\u09dc\u09dd\u09d3\u09c2", "\u2556\u0979\u095e\u09d3\u09b5\u0935\u098f\u09c7\u099d\u09d2\u09b0", 23, "l$P$~", "frames", "ducument", "ydob", "documentElement", "del", "@[\\]^`{|}~]", "base_fileds", "255", 10, "10", 39, "\u2547\u2535\u255a\u252e\u2541\u2535\u254c\u253c\u2559", 8, "4", "3", "de", 3, "11", 2, "203", "22", "111111", "3f", 16, "\x0f", "\u2506\u2537\u2507\u2537", "11111111", "base64Encode", "v\x1d", "ati", "WY", "te", "bo", "rs", "getHost", Date, "{DF", ":", "^{.*}$", "WU<P[C", 52, "1001", "href", "1111101010", "redirect_url", "^\\s*(?:https?:)?\\/{2,}([^\\/\\?\\#\\\\]+)", "i", "\u256c\u252c\u2516\u254b", "@", "ready", "change", "dy", 7, "protocol", "//s.thsi.cn/js/chameleon/time.1", "onerror", "2000", "readyState", null, "^(\\d+\\.)+\\d+$", "^\\s*(?:(https?:))?\\/{2,}([^\\/\\?\\#\\\\]+)", ".", "strToBytes", "isIPAddr", "serverTimeNow", "addEventListener", "th", "wh", "Scro", "mousemove", 55, "evomhcuot", "[[?PVC\x0e", "getMouseMove", '_R"xWB%Po_3YT', "getMouseClick", "ght", "gin", "msD", "ack", "\u2556\u096b\u095f", "Nativ", "^A", "MozSettingsEvent", "safari", "ActiveXObject", "postMessage", "Uint8Array", "WeakMap", "Google Inc.", "vendor", "chrome", "python", "sgAppName", "JX", 6, "me", "LBBROWSER", "w4", "2345Explorer", "TheWorld", "\u2544", 40, "tTr", "\u2506", "navigator", "webdriver", "languages", "taborcA|FDP", "\u2541\u097c\u0949", 95, "1e0", "e Cli", "iso-8859-1", "defaultCharset", "localStorage", "^Win64", "^Linux armv|Android", "^iPhone", "^iPad", "B_{VV", "getPluginNum", "getBrowserFeature", "12", "16", "sE", "10000", "17", "\u2542\u2532\u2556\u2537\u2543\u2526", "\x1cx`R", 2333, "XMLH", "ers", "0", "lo", 57, "ylppa", "error", "target", "click", "unload", "HE9AWT9Y", "\\.", "c?", "$", "/", "fetch", "prototype", "url", "\u2556\u0971\u0956\u09fe\u09a7", "headers", "\u256b\u2554", 79, "?", "^(.*?):[ \\t]*([^\\r\\n]*)\\r?$", "gm", "s", "src", "analysisRst", "\u255e\u0973\u0949\u09f4\u09a2\u0929\u09ac\u09d4\u0992\u09d2\u09b0\u09d4", "appendChild", "Y", "jsonp_ignore", "^", 70, "421", "XH>a", "\u2574\u253c\u257d\u2530\u2575\u2539\u257c\u2533\u257d\u2522\u256e\u2521\u2560\u2524\u2561\u2525", "CHAMELEON_LOADED"], [1, "", 0, "he", "ad", 29, "\x180G\x1f", "?>=<;:\\\\/,+", "ng", "to", "ff", Number, Error, "11", "6", "er", "ro", "code", "co", "_?L", "ed", "@S\x15D*", Object, "len", "gth", "on", "lo", RegExp, "ySta", 13, "eel", "ee", "ouse", "ll", "\u2544\u2530\u2555\u2531", "FCm-", "isTru", "getC", "Pos", "ve", "or", "ae", "^", "On", "Sho", "can", "ont", "roid", "anguage", "\u2502", "ta", "tna", Date, "3", "am", "e", "n+", "f80", "\x1dD", 6, "\u255f\u253a\u2542\u252b\u2545\u2568\u251e", "KCABLLAC_NOELEMAHC", "X-Antispider-Message", 3, ".baidu.", Function, document, !0, "cookie", "; ", "=", 96, "\u255b\u253e\u2550\u2537\u2543\u252b", "\u250c\u252c\u255c\u253d\u2549\u2521\u251c", ";O", "; expires=", "getCookie", "Thu, 01 Jan 1970 00:00:00 GMT", "setCookie", "Z\x18|", "i", "\u255b\u2534\u2557\u2536\u255a\u2509\u257d\u2512\u2560\u2501\u2566\u2503", 52, window, 10, "Init", !1, "set", "v", "eliflmth", '<script>document.w=window<\/script><iframe src="/favicon.icon"></iframe>', "iS.p", "head", "#default#userData", "get", "[!\"#$%&'()*", "g", "^d", "$D", "\u2568\u2537\u2568\u254c\u256a", "]\\P", "___", "le", "th", "prototype", "base_f", 8, "\\R5Z\\R\x14@^Q3G", "ZV%PgQ?Y]S%", 67, "r", "length", "0", 16, "12", "\u2576\u095f\u0979\u09d5\u0995\u091b\u09a9\u09f9\u09bd\u09f7\u0989\u09fd\u09f5\u09f3\u09f9\u0a41\u0a4d\u098f\u0999\u0905\u0975\u09cb\u09a9\u09a9\u099d\u0927\u0933\u0913\u0a6b\u0999\u09a3\u0937\u098b\u09f5\u0933\u0a7b\u091b\u09b1\u0a63\u095f\u09fb\u094d\u0993\u0943\u092b\u0949\u09a3\u09e7\u09cb\u0925\u0993\u09ab\u09f0\u092c\u092c\u0942\u0950\u09c8\u0944\u09c6\u0990\u0944\u09cb\u098e", "i,", "\u2505\u092f", 12, 56, "20", "1000", 2, 5, "11111111", "encode", "\u255b\u0972\u0959", "\u2519", "s", "WY$PYS", "ystate", "1111101000", / /g, ",", "\u250d", '^".*"$', "edoc_sutats", "status_code", "location", "redirect_url", "href", "4294967295", "j", "1200000", "script", "src", "onreadystatechange", "read", "loaded", "readyState", "complete", "interactive", "onload", "undefined", "\\.com\\.cn$|\\.com\\.hk$", ".", "getServerTime", 'YY7YAD?FjD"', "strhash", "random", "getRootDomain", "booleanToDecimal", "timeNow", "\u2559\u253e", "eventBind", "onwh", "\u255b", 46, "DOMM", "cl", "T^5^", "div", "onmousewheel", "mousewheel", 51, "keydown", "clientY", "getKeyDown", "ch", "plu", "\u2543\u252b", "ouc", "art", "^i", "Po", "callPhantom", "max", "Hei", "ActiveXObject", "nd", "yG&Y]\x17\x15ZUG#A]Ez\x15qY5\x1b", "\u2576\u097e\u094e\u09f8\u09a6\u0938\u09b6\u09fe\u0996\u09d7\u09a7\u09d2\u09cc", "Maxthon", "Q", "opr", "chrome", "BIDUBrowser", "QQBro", "[_$ZUR", "UBrowser", "MSGesture", "plugins", "doNotTrack", "ShockwaveFlash.ShockwaveFlash", "]C|\x18", "webgl2", "platform", "name", "^Win32", "^MacIntel", "^Linux [ix]\\d+", "^BlackBerry", "language", "getPlatform", "getBrowserIndex", "1", "10", 4, 9, "1100", "\t\0", "3c", 256, "w", "TTP", "et", "c", "al", "\u255e", "base", "\u2569\u0975\u094e\u09e5\u09a0\u092e\u09d1\u09ed\u09ce", "target", "fh%PTQr", "#", "\u255f\u097c\u0949\u09f9", 97, "rg", "tnemelEcrs", "fn_Ws", "parentNode", "tagName", "A", "submit", "PX%", "me", "host", "\\.?", "d\x19", "Fri, 01 Feb 2050 00:00:00 GMT", "]E%", "toString", "[object Request]", "headers", 83, "&", encodeURIComponent, "open", "getAllResponseHeaders", "4", "tseuqeRpttHLMX", "Window", "\u2564\u095e", "RI", "\u2550\u0953", "(YaZ", "_", "_str", "V587"]);



console.log(window.dddd())