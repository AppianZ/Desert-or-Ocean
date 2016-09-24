/* // k为对象{b:b方法,c:c方法}
const k = require("./k.js");
// k() // error
k.b();
k.c();

console.log('this is g.js');

const {b,c} = require("./k.js");
//通过{}解构获取k.js导出的对象里面的b,c方法
b();
c();*/

/*
// 1
const h = require("./h.js");
console.log('this is g.js');
h();*/

 // 2
 const j = require("./j.js");
 console.log('this is g.js');
 j.c();
