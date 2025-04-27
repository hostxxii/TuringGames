function OOOoOo(_0x240504, _0x8eefdc) {
    const _0x3a3671 = _0x240504.split("");
    const _0x1959d4 = _0x8eefdc.split("");
    const _0x582226 = 4;
    let _0x5ad857 = [];
    for (let _0x2d33d3 = 0; _0x2d33d3 < _0x3a3671.length; _0x2d33d3 += _0x582226) {
      let _0x38ae5f = _0x3a3671.slice(_0x2d33d3, _0x2d33d3 + _0x582226);
      for (let _0x31873b = 0; _0x31873b < _0x38ae5f.length; _0x31873b++) {
        const _0x11057a = _0x38ae5f[_0x31873b].charCodeAt(0);
        const _0x1a6269 = _0x1959d4[_0x31873b % _0x1959d4.length].charCodeAt(0);
        const _0x25c979 = (_0x11057a + _0x1a6269) % 256;
        _0x38ae5f[_0x31873b] = String.fromCharCode(_0x25c979);
      }
      _0x5ad857 = _0x5ad857.concat(_0x38ae5f);
    }
    const _0x28d8b9 = _0x5ad857.join("");
    const _0x36bdd2 = Array.from(_0x28d8b9).map(_0x3c7e7a => _0x3c7e7a.charCodeAt(0).toString(16).padStart(2, "0")).join("");
    return _0x36bdd2;
  }

function get_m(pageNumber){
    let t=new Date().getTime();
    let arg1='oooooo'+t+pageNumber;
    let t_tr=btoa(t)

    return [OOOoOo(arg1, 'oooooo'),t_tr];
}


