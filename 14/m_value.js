const z = {
  GygXY: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  kWHRV: function (e, b) {
    return e >> b;
  },
  BwNcK: function (e, b) {
    return e & b;
  },
  zNuXO: function (e, b) {
    return e << b;
  },
  fDawx: function (e, b) {
    return e + b;
  },
  WHiaC: function (e, b) {
    return e !== b;
  },

  EgTlB: "CGWMT",

  EpqwK: function (e, b) {
    return e ^ b;
  },
  BohQq: function (e, b) {
    return e < b;
  },
  ZmbOa: function (e, b) {
    return e < b;
  },
  xBUPA: function (e, b) {
    return e >> b;
  },
  sidYy: function (e, b) {
    return e | b;
  },
  fYalM: function (e, b) {
    return e << b;
  },
  XmzRs: function (e, b) {
    return e >> b;
  },
  dUltK: function (e, b) {
    return e(b);
  },
  tHWUQ: function (e, b) {
    return e < b;
  },
  GQLce: function (e, b) {
    return e % b;
  },
  qlWPI: function (e, b) {
    return e === b;
  },
  yEzeL: "dasdasdarqwdasdasqwdasda",
  sThMM: function (e, b) {
    return e(b);
  },
  IZCdB: function (e, b, f) {
    return e(b, f);
  },
};
function B(b, f, p) {
  return b ^ z.zNuXO(f, p % 8);
}
function J(b, f, p) {
  if (z.IWChf === z.IWChf) {
    return z.EpqwK(b, f >> p % 8);
  } else {
    return Q ^ z.zNuXO(v, d % 8);
  }
}
function Y(b, f) {
  return (b = b + f - f) ^ f;
}
function x(b) {
  const f = {
    RLvtt: function (N, W) {
      return z.tHWUQ(N, W);
    },
    IdJpS: function (N, W) {
      return z.GQLce(N, W);
    },
  };
  if (z.qlWPI("HbEiW", "HbEiW")) {
    ts = new Date().getTime();
    dd = b;
    var p = (function (N) {
      let W = 0;
      for (let L = 0; f.RLvtt(L, N.length); L++) {
        var O = N.charCodeAt(L);
        for (let y = 0; y < 20; y++) {
          switch (f["IdJpS"](y, 3)) {
            case 0:
              W = B.apply(null, [W, O, y]);
              break;
            case 1:
              W = J.apply(null, [W, O, y]);
              break;
            case 2:
              W = Y["apply"](null, [W, O]);
          }
        }
      }
      return W;
    })(z.yEzeL + ts);
    var s = ["?", "m", "="]["join"]("");
    var p = p.toString(16);
    return (dd += z.fDawx(
      s,
      (function (N) {
        var W = z.GygXY;
        let O = "";
        let L;
        let y;
        let k;
        let H;
        let D;
        let K;
        let S;
        let I = 0;
        for (; z.BohQq(I, N.length); ) {
          L = N.charCodeAt(I++);
          y = z.ZmbOa(I, N.length) ? N.charCodeAt(I++) : 0;
          k = I < N["length"] ? N.charCodeAt(I++) : 0;
          H = L >> 2;
          D = ((L & 3) << 4) | z.xBUPA(y, 4);
          K = z.sidYy(z.fYalM(y & 15, 2), z["XmzRs"](k, 6));
          S = k & 63;
          if (isNaN(y)) {
            K = S = 64;
          } else if (z["dUltK"](isNaN, k)) {
            S = 64;
          }
          O = z.fDawx(O, W.charAt(H)) + W.charAt(D) + W.charAt(K) + W.charAt(S);
        }
        return O;
      })(z.fDawx(p, ts))
    ));
  } else {
    return i[Z]()[B](J)[Y]()[uRCKCr.dUltK(x, e[0])](b)[f](n);
  }
}

function get_m(){
  url=x('/api/problem-detail/14/data/')
  const regex = /[?&]m=([^&]+)/;
  const match = url.match(regex);
  const mValue = match ? match[1] : null;
  return mValue;
}


