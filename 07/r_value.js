window=global
const CryptoJS = require("crypto-js");

const c = {
    stringify: JSON.stringify,
    parse: JSON.parse
  };
  const h = new Proxy(c, {
    get(c, a) {
      if (a === "stringify") {
        return function (...a) {
          return c.stringify(...a);
        };
      } else if (a === "parse") {
        return function (...a) {
          return c.parse(...a);
        };
      }
      return c[a];
    }
  });
  (function (b) {
    function q(d, a) {
      var b = (d & 65535) + (a & 65535);
      return (d >> 16) + (a >> 16) + (b >> 16) << 16 | b & 65535;
    }
    function r(d, a, b, c, e, f) {
      return q(function (c, a) {
        return c << e | c >>> 32 - e;
      }(q(q(a, d), q(c, f))), b);
    }
    function d(e, a, b, c, d, f, g) {
      return r(a & b | ~a & c, e, a, d, f, g);
    }
    function f(e, a, b, c, d, f, g) {
      return r(a & c | b & ~c, e, a, d, f, g);
    }
    function g(e, a, b, c, d, f, g) {
      return r(a ^ b ^ c, e, a, d, f, g);
    }
    function h(e, a, b, c, d, f, g) {
      return r(b ^ (a | ~c), e, a, d, f, g);
    }
    function i(i, a) {
      var b;
      var r;
      var s;
      var t;
      var u;
      i[a >> 5] |= 128 << a % 32;
      i[14 + (a + 64 >>> 9 << 4)] = a;
      var v = 1732584193;
      var w = -271733879;
      var x = -1732584194;
      var y = 271733878;
      for (b = 0; b < i.length; b += 16) {
        w = h(w = h(w = h(w = h(w = g(w = g(w = g(w = g(w = f(w = f(w = f(w = f(w = d(w = d(w = d(w = d(s = w, x = d(t = x, y = d(u = y, v = d(r = v, w, x, y, i[b], 7, -680876936), w, x, i[b + 1], 12, -389564586), v, w, i[b + 2], 17, 606105819), y, v, i[b + 3], 22, -1044525330), x = d(x, y = d(y, v = d(v, w, x, y, i[b + 4], 7, -176418897), w, x, i[b + 5], 12, 1200080426), v, w, i[b + 6], 17, -1473231341), y, v, i[b + 7], 22, -45705983), x = d(x, y = d(y, v = d(v, w, x, y, i[b + 8], 7, 1770035416), w, x, i[b + 9], 12, -1958414417), v, w, i[b + 10], 17, -42063), y, v, i[b + 11], 22, -1990404162), x = d(x, y = d(y, v = d(v, w, x, y, i[b + 12], 7, 1804603682), w, x, i[b + 13], 12, -40341101), v, w, i[b + 14], 17, -1502002290), y, v, i[b + 15], 22, 1236535329), x = f(x, y = f(y, v = f(v, w, x, y, i[b + 1], 5, -165796510), w, x, i[b + 6], 9, -1069501632), v, w, i[b + 11], 14, 643717713), y, v, i[b], 20, -373897302), x = f(x, y = f(y, v = f(v, w, x, y, i[b + 5], 5, -701558691), w, x, i[b + 10], 9, 38016083), v, w, i[b + 15], 14, -660478335), y, v, i[b + 4], 20, -405537848), x = f(x, y = f(y, v = f(v, w, x, y, i[b + 9], 5, 568446438), w, x, i[b + 14], 9, -1019803690), v, w, i[b + 3], 14, -187363961), y, v, i[b + 8], 20, 1163531501), x = f(x, y = f(y, v = f(v, w, x, y, i[b + 13], 5, -1444681467), w, x, i[b + 2], 9, -51403784), v, w, i[b + 7], 14, 1735328473), y, v, i[b + 12], 20, -1926607734), x = g(x, y = g(y, v = g(v, w, x, y, i[b + 5], 4, -378558), w, x, i[b + 8], 11, -2022574463), v, w, i[b + 11], 16, 1839030562), y, v, i[b + 14], 23, -35309556), x = g(x, y = g(y, v = g(v, w, x, y, i[b + 1], 4, -1530992060), w, x, i[b + 4], 11, 1272893353), v, w, i[b + 7], 16, -155497632), y, v, i[b + 10], 23, -1094730640), x = g(x, y = g(y, v = g(v, w, x, y, i[b + 13], 4, 681279174), w, x, i[b], 11, -358537222), v, w, i[b + 3], 16, -722521979), y, v, i[b + 6], 23, 76029189), x = g(x, y = g(y, v = g(v, w, x, y, i[b + 9], 4, -640364487), w, x, i[b + 12], 11, -421815835), v, w, i[b + 15], 16, 530742520), y, v, i[b + 2], 23, -995338651), x = h(x, y = h(y, v = h(v, w, x, y, i[b], 6, -198630844), w, x, i[b + 7], 10, 1126891415), v, w, i[b + 14], 15, -1416354905), y, v, i[b + 5], 21, -57434055), x = h(x, y = h(y, v = h(v, w, x, y, i[b + 12], 6, 1700485571), w, x, i[b + 3], 10, -1894986606), v, w, i[b + 10], 15, -1051523), y, v, i[b + 1], 21, -2054922799), x = h(x, y = h(y, v = h(v, w, x, y, i[b + 8], 6, 1873313359), w, x, i[b + 15], 10, -30611744), v, w, i[b + 6], 15, -1560198380), y, v, i[b + 13], 21, 1309151649), x = h(x, y = h(y, v = h(v, w, x, y, i[b + 4], 6, -145523070), w, x, i[b + 11], 10, -1120210379), v, w, i[b + 2], 15, 718787259), y, v, i[b + 9], 21, -343485551);
        v = q(v, r);
        w = q(w, s);
        x = q(x, t);
        y = q(y, u);
      }
      return [v, w, x, y];
    }
    function j(e) {
      var a;
      var f = "";
      var g = e.length * 32;
      for (a = 0; a < g; a += 8) {
        f += String.fromCharCode(e[a >> 5] >>> a % 32 & 255);
      }
      return f;
    }
    function k(e) {
      var a;
      var f = [];
      f[(e.length >> 2) - 1] = undefined;
      a = 0;
      for (; a < f.length; a += 1) {
        f[a] = 0;
      }
      var c = e.length * 8;
      for (a = 0; a < c; a += 8) {
        f[a >> 5] |= (e.charCodeAt(a / 8) & 255) << a % 32;
      }
      return f;
    }
    function c(f) {
      var a;
      var g;
      var h = "0123456789abcdef";
      var d = "";
      for (g = 0; g < f.length; g += 1) {
        a = f.charCodeAt(g);
        d += h.charAt(a >>> 4 & 15) + h.charAt(a & 15);
      }
      return d;
    }
    function e(b) {
      return unescape(encodeURIComponent(b));
    }
    function l(b) {
      return function (b) {
        return j(i(k(b), b.length * 8));
      }(e(b));
    }
    function m(c, a) {
      return function (h, a) {
        var b;
        var l;
        var m = k(h);
        var n = [];
        var f = [];
        n[15] = f[15] = undefined;
        if (m.length > 16) {
          m = i(m, h.length * 8);
        }
        b = 0;
        for (; b < 16; b += 1) {
          n[b] = m[b] ^ 909522486;
          f[b] = m[b] ^ 1549556828;
        }
        l = i(n.concat(k(a)), 512 + a.length * 8);
        return j(i(f.concat(l), 640));
      }(e(c), e(a));
    }
    window.eeee = function (d, a, b) {
      if (a) {
        if (b) {
          return m(a, d);
        } else {
          return function (d, a) {
            return c(m(d, a));
          }(a, d);
        }
      } else if (b) {
        return l(d);
      } else {
        return function (b) {
          return c(l(b));
        }(d);
      }
    };
  })();
  dd = {
    a: CryptoJS
  };
  let i = dd.a.enc.Utf8.parse("xxxxxxxxoooooooo");
  let d = dd.a.enc.Utf8.parse("0123456789ABCDEF");
  function b(e) {
    let a = dd.a.enc.Hex.parse(e);
    let b = dd.a.AES.decrypt({
      ciphertext: a
    }, i, {
      mode: dd.a.mode.CBC,
      padding: dd.a.pad.Pkcs7,
      iv: d
    });
    return b.toString(dd.a.enc.Utf8);
}
window.cccc=b


