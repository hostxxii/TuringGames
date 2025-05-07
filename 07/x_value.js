const CryptoJS = require('crypto-js');
/**
 * 计算字符串的SHA256哈希值
 * @param {string} message - 需要计算哈希值的字符串
 * @returns {string} - 返回十六进制格式的SHA256哈希值
 */

function sha256(message) {
  return CryptoJS.SHA256(message).toString(CryptoJS.enc.Hex);
}

function get_x(m){
    let arg = m + "xxoo"
    return sha256(arg)
}

