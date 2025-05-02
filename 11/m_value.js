function encrypt(var0, var1) {
    return var0 + Math.floor(var1 / 3) + 16358;
}
console.log(encrypt(3,1746002827))