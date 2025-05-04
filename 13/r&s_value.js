window = global;
delete global;

_$ = {
  beforeSend: function () {},
};
window.$ = _$;

window.setInterval = function () {};

setInterval(() => {
  (function (c) {
    return (function (c) {
      return Function('Function(arguments[0]+"' + c + '")()');
    })(c);
  })("bugger")("de", 0, 0, (0, 0));
}, 1000);
const a = {
  stringify: JSON.stringify,
  parse: JSON.parse,
};
const m = new Proxy(a, {
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
  },
});
var d = (function (f) {
  function h(c) {
    if (a[c]) {
      return a[c].exports;
    }
    var d = (a[c] = {
      i: c,
      l: false,
      exports: {},
    });
    f[c].call(d.exports, d, d.exports, h);
    d.l = true;
    return d.exports;
  }
  var a = {};
  h.m = f;
  h.c = a;
  h.i = function (c) {
    return c;
  };
  h.d = function (c, a, e) {
    if (!h.o(c, a)) {
      Object.defineProperty(c, a, {
        configurable: false,
        enumerable: true,
        get: e,
      });
    }
  };
  h.n = function (c) {
    var a =
      c && c.__esModule
        ? function () {
            return c.default;
          }
        : function () {
            return c;
          };
    h.d(a, "a", a);
    return a;
  };
  h.o = function (c, a) {
    return Object.prototype.hasOwnProperty.call(c, a);
  };
  h.p = "";
  return h((h.s = 4));
})([
  function (d, a) {
    var e = {
      utf8: {
        stringToBytes: function (c) {
          return e.bin.stringToBytes(unescape(encodeURIComponent(c)));
        },
        bytesToString: function (c) {
          return decodeURIComponent(escape(e.bin.bytesToString(c)));
        },
      },
      bin: {
        stringToBytes: function (d) {
          for (var a = [], e = 0; e < d.length; e++) {
            a.push(d.charCodeAt(e) & 255);
          }
          return a;
        },
        bytesToString: function (d) {
          for (var a = [], e = 0; e < d.length; e++) {
            a.push(String.fromCharCode(d[e]));
          }
          return a.join("");
        },
      },
    };
    d.exports = e;
  },
  function (h, a, i) {
    (function () {
      var w = i(2);
      var j = i(0).utf8;
      var d = i(3);
      var e = i(0).bin;
      function f(g, x) {
        if (g.constructor == String) {
          g =
            x && x.encoding === "binary"
              ? e.stringToBytes(g)
              : j.stringToBytes(g);
        } else if (d(g)) {
          g = Array.prototype.slice.call(g, 0);
        } else if (!Array.isArray(g)) {
          g = g.toString();
        }
        for (
          var c = w.bytesToWords(g),
            h = g.length * 8,
            i = 1732584193,
            y = -271733879,
            z = -1732584194,
            A = 271733878,
            B = 0;
          B < c.length;
          B++
        ) {
          c[B] =
            (((c[B] << 8) | (c[B] >>> 24)) & 16711935) |
            (((c[B] << 24) | (c[B] >>> 8)) & 4278255360);
        }
        c[h >>> 5] |= 128 << h % 32;
        c[14 + (((h + 64) >>> 9) << 4)] = h;
        for (
          var C = f._ff, o = f._gg, p = f._hh, q = f._ii, B = 0;
          B < c.length;
          B += 16
        ) {
          var r = i;
          var D = y;
          var E = z;
          var F = A;
          i = C(i, y, z, A, c[B + 0], 7, -680876936);
          A = C(A, i, y, z, c[B + 1], 12, -389564586);
          z = C(z, A, i, y, c[B + 2], 17, 606105819);
          y = C(y, z, A, i, c[B + 3], 22, -1044525330);
          i = C(i, y, z, A, c[B + 4], 7, -176418897);
          A = C(A, i, y, z, c[B + 5], 12, 1200080426);
          z = C(z, A, i, y, c[B + 6], 17, -1473231341);
          y = C(y, z, A, i, c[B + 7], 22, -45705983);
          i = C(i, y, z, A, c[B + 8], 7, 1770035416);
          A = C(A, i, y, z, c[B + 9], 12, -1958414417);
          z = C(z, A, i, y, c[B + 10], 17, -42063);
          y = C(y, z, A, i, c[B + 11], 22, -1990404162);
          i = C(i, y, z, A, c[B + 12], 7, 1804603682);
          A = C(A, i, y, z, c[B + 13], 12, -40341101);
          z = C(z, A, i, y, c[B + 14], 17, -1502002290);
          y = C(y, z, A, i, c[B + 15], 22, 1236535329);
          i = o(i, y, z, A, c[B + 1], 5, -165796510);
          A = o(A, i, y, z, c[B + 6], 9, -1069501632);
          z = o(z, A, i, y, c[B + 11], 14, 643717713);
          y = o(y, z, A, i, c[B + 0], 20, -373897302);
          i = o(i, y, z, A, c[B + 5], 5, -701558691);
          A = o(A, i, y, z, c[B + 10], 9, 38016083);
          z = o(z, A, i, y, c[B + 15], 14, -660478335);
          y = o(y, z, A, i, c[B + 4], 20, -405537848);
          i = o(i, y, z, A, c[B + 9], 5, 568446438);
          A = o(A, i, y, z, c[B + 14], 9, -1019803690);
          z = o(z, A, i, y, c[B + 3], 14, -187363961);
          y = o(y, z, A, i, c[B + 8], 20, 1163531501);
          i = o(i, y, z, A, c[B + 13], 5, -1444681467);
          A = o(A, i, y, z, c[B + 2], 9, -51403784);
          z = o(z, A, i, y, c[B + 7], 14, 1735328473);
          y = o(y, z, A, i, c[B + 12], 20, -1926607734);
          i = p(i, y, z, A, c[B + 5], 4, -378558);
          A = p(A, i, y, z, c[B + 8], 11, -2022574463);
          z = p(z, A, i, y, c[B + 11], 16, 1839030562);
          y = p(y, z, A, i, c[B + 14], 23, -35309556);
          i = p(i, y, z, A, c[B + 1], 4, -1530992060);
          A = p(A, i, y, z, c[B + 4], 11, 1272893353);
          z = p(z, A, i, y, c[B + 7], 16, -155497632);
          y = p(y, z, A, i, c[B + 10], 23, -1094730640);
          i = p(i, y, z, A, c[B + 13], 4, 681279174);
          A = p(A, i, y, z, c[B + 0], 11, -358537222);
          z = p(z, A, i, y, c[B + 3], 16, -722521979);
          y = p(y, z, A, i, c[B + 6], 23, 76029189);
          i = p(i, y, z, A, c[B + 9], 4, -640364487);
          A = p(A, i, y, z, c[B + 12], 11, -421815835);
          z = p(z, A, i, y, c[B + 15], 16, 530742520);
          y = p(y, z, A, i, c[B + 2], 23, -995338651);
          i = q(i, y, z, A, c[B + 0], 6, -198630844);
          A = q(A, i, y, z, c[B + 7], 10, 1126891415);
          z = q(z, A, i, y, c[B + 14], 15, -1416354905);
          y = q(y, z, A, i, c[B + 5], 21, -57434055);
          i = q(i, y, z, A, c[B + 12], 6, 1700485571);
          A = q(A, i, y, z, c[B + 3], 10, -1894986606);
          z = q(z, A, i, y, c[B + 10], 15, -1051523);
          y = q(y, z, A, i, c[B + 1], 21, -2054922799);
          i = q(i, y, z, A, c[B + 8], 6, 1873313359);
          A = q(A, i, y, z, c[B + 15], 10, -30611744);
          z = q(z, A, i, y, c[B + 6], 15, -1560198380);
          y = q(y, z, A, i, c[B + 13], 21, 1309151649);
          i = q(i, y, z, A, c[B + 4], 6, -145523070);
          A = q(A, i, y, z, c[B + 11], 10, -1120210379);
          z = q(z, A, i, y, c[B + 2], 15, 718787259);
          y = q(y, z, A, i, c[B + 9], 21, -343485551);
          i = (i + r) >>> 0;
          y = (y + D) >>> 0;
          z = (z + E) >>> 0;
          A = (A + F) >>> 0;
        }
        return w.endian([i, y, z, A]);
      }
      f._ff = function (i, a, j, c, d, e, f) {
        var g = i + ((a & j) | (~a & c)) + (d >>> 0) + f;
        return ((g << e) | (g >>> (32 - e))) + a;
      };
      f._gg = function (i, a, j, c, d, e, f) {
        var g = i + ((a & c) | (j & ~c)) + (d >>> 0) + f;
        return ((g << e) | (g >>> (32 - e))) + a;
      };
      f._hh = function (i, a, j, c, d, e, f) {
        var g = i + (a ^ j ^ c) + (d >>> 0) + f;
        return ((g << e) | (g >>> (32 - e))) + a;
      };
      f._ii = function (i, a, j, c, d, e, f) {
        var g = i + (j ^ (a | ~c)) + (d >>> 0) + f;
        return ((g << e) | (g >>> (32 - e))) + a;
      };
      f._blocksize = 16;
      f._digestsize = 16;
      h.exports = function (g, a) {
        if (g === undefined || g === null) {
          throw new Error("Illegal argument " + g);
        }
        var c = w.wordsToBytes(f(g, a));
        if (a && a.asBytes) {
          return c;
        } else if (a && a.asString) {
          return e.bytesToString(c);
        } else {
          return w.bytesToHex(c);
        }
      };
    })();
  },
  function (d, a) {
    (function () {
      var g =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var e = {
        rotl: function (c, a) {
          return (c << a) | (c >>> (32 - a));
        },
        rotr: function (c, a) {
          return (c << (32 - a)) | (c >>> a);
        },
        endian: function (c) {
          if (c.constructor == Number) {
            return (e.rotl(c, 8) & 16711935) | (e.rotl(c, 24) & 4278255360);
          }
          for (var a = 0; a < c.length; a++) {
            c[a] = e.endian(c[a]);
          }
          return c;
        },
        randomBytes: function (c) {
          for (var d = []; c > 0; c--) {
            d.push(Math.floor(Math.random() * 256));
          }
          return d;
        },
        bytesToWords: function (e) {
          for (var a = [], f = 0, g = 0; f < e.length; f++, g += 8) {
            a[g >>> 5] |= e[f] << (24 - (g % 32));
          }
          return a;
        },
        wordsToBytes: function (d) {
          for (var a = [], e = 0; e < d.length * 32; e += 8) {
            a.push((d[e >>> 5] >>> (24 - (e % 32))) & 255);
          }
          return a;
        },
        bytesToHex: function (d) {
          for (var a = [], e = 0; e < d.length; e++) {
            a.push((d[e] >>> 4).toString(16));
            a.push((d[e] & 15).toString(16));
          }
          return a.join("");
        },
        hexToBytes: function (d) {
          for (var a = [], e = 0; e < d.length; e += 2) {
            a.push(parseInt(d.substr(e, 2), 16));
          }
          return a;
        },
        bytesToBase64: function (h) {
          for (var a = [], c = 0; c < h.length; c += 3) {
            for (
              var i = (h[c] << 16) | (h[c + 1] << 8) | h[c + 2], j = 0;
              j < 4;
              j++
            ) {
              if (c * 8 + j * 6 <= h.length * 8) {
                a.push(g.charAt((i >>> ((3 - j) * 6)) & 63));
              } else {
                a.push("=");
              }
            }
          }
          return a.join("");
        },
        base64ToBytes: function (f) {
          f = f.replace(/[^A-Z0-9+\/]/gi, "");
          for (var h = [], c = 0, i = 0; c < f.length; i = ++c % 4) {
            if (i != 0) {
              h.push(
                ((g.indexOf(f.charAt(c - 1)) & (Math.pow(2, i * -2 + 8) - 1)) <<
                  (i * 2)) |
                  (g.indexOf(f.charAt(c)) >>> (6 - i * 2))
              );
            }
          }
          return h;
        },
      };
      d.exports = e;
    })();
  },
  function (e, a) {
    function f(c) {
      return (
        !!c.constructor &&
        typeof c.constructor.isBuffer == "function" &&
        c.constructor.isBuffer(c)
      );
    }
    function c(c) {
      return (
        typeof c.readFloatLE == "function" &&
        typeof c.slice == "function" &&
        f(c.slice(0, 0))
      );
    }
    e.exports = function (d) {
      return d != null && (f(d) || c(d) || !!d._isBuffer);
    };
  },
  function (d, a, e) {
    d.exports = e(1);
  },
]);
(function (c, a) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = a();
  } else if (typeof define === "function" && define.amd) {
    define(a);
  } else {
    c.API = a();
  }
})(this, function () {
  function e() {
    var e = [];
    var a = "0123456789abcdef";
    for (var f = 0; f < 32; f++) {
      e[f] = a.substr(Math.floor(Math.random() * 16), 1);
    }
    e[14] = "4";
    e[19] = a.substr((e[19] & 3) | 8, 1);
    e[8] = e[13] = e[18] = e[23];
    var g = e.join("");
    return g;
  }
  function a(f) {
    var a = [];
    var g = {};
    a = f.split("&");
    for (var c = 0; c < a.length; c++) {
      if (a[c].indexOf("=") != -1) {
        var h = a[c].split("=");
        if (h.length == 2) {
          g[h[0]] = h[1];
        } else {
          g[h[0]] = "";
        }
      } else {
        g[a[c]] = "";
      }
    }
    return g;
  }

  var c = $.beforeSend;
  $.beforeSend = function (g) {
    var h = Date.parse(new Date());
    var i = e();
    var j = m.stringify({ page: `${g}` });
    var k = d(j + i + h);
    return [h, i, k];
  };
});

console.log($.beforeSend(1));
