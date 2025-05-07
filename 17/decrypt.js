// 移除不必要的代码，保留全局环境设置
window=global;
delete global;
const FONT_DECRYPT_MAP = {
    'ꙮ': '0',
    'ઊ': '1',
    'સ': '2',
    'ત': '3',
    'ধ': '4',
    'ન': '5',
    'પ': '6',
    'ફ': '7',
    'બ': '8',
    'ભ': '9'
};


// 预编译正则表达式和替换映射，避免重复创建
const FONT_REGEX_MAP = {};
const FONT_CHARS = Object.keys(FONT_DECRYPT_MAP).join('');
const FONT_REGEX = new RegExp(`[${FONT_CHARS}]`, 'g');

// 创建一个缓存对象，用于存储已解密的字符串
const decryptCache = new Map();

// 高度优化的字体解密函数
function decryptFontNumber(str) {
    if (typeof str !== 'string') return str;

    // 检查缓存中是否已有此字符串的解密结果
    if (decryptCache.has(str)) {
        return decryptCache.get(str);
    }

    // 使用单个正则表达式和替换函数一次性替换所有特殊字符
    const result = str.replace(FONT_REGEX, char => FONT_DECRYPT_MAP[char] || char);

    // 将结果存入缓存
    decryptCache.set(str, result);

    return result;
}

// 高度优化的数据处理函数
function updateCounter(data) {
    // 快速验证输入
    if (!data || !Array.isArray(data.current_array)) {
        return null;
    }

    // 使用数组的map方法一次性处理所有元素
    // 这比手动循环更简洁，且在现代JavaScript引擎中性能相当
    return {
        // 直接使用map创建新数组，避免额外的内存分配
        current_array: data.current_array.map(decryptFontNumber),
        // 直接引用原始分页数据，避免深拷贝
        pagination: data.pagination
    };
}

// 简化的数据获取函数
function get_data(data) {
    return updateCounter(data) || data;
}

// var encrypt_data={
    
    
//     "problem": {
//         "title": "题十七：字体加密",
//         "description": "对当前数组进行了字体加密，需要解密后完成计算",
//         "difficulty": "简单",
//         "tags": [
//             "字体加密"
//         ]
//     },
//     "pagination": {
//         "has_previous": true,
//         "previous_page_number": 2,
//         "number": 3,
//         "has_next": true,
//         "next_page_number": 4,
//         "num_pages": 20
//     },
//     "current_array": [
//         "બধફ",
//         "તধબ",
//         "ধફꙮ",
//         "સનબ",
//         "ধꙮસ",
//         "નধભ",
//         "પનઊ",
//         "ફતસ",
//         "ફતન",
//         "પપ"
//     ]
// }


// get_data(encrypt_data)


// console.log(typeof(encrypt_data))
// console.log(encrypt_data)