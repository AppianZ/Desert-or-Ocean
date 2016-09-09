const h = require("./h.js");
const j = require("./j.js");
const k = require("./k.js");
// k为对象{b:b方法,c:c方法}
console.log('this is g.js');

h();
j();
// k() //错误

k.b();
k.c();

const {b,c} = require("./k.js");
//通过{}解构获取k.js导出的对象里面的b,c方法
b();
c();