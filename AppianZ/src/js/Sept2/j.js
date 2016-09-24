const b = () =>{
  console.log('this is fun-b in j.js');
};

exports.c = () => {
  console.log('this is fun-c in j.js');
};

/*
如果没有module.exports = b;则导出的是一个对象{c: c方法},
如果在g.js中执行以下代码:
  const j = require("./j.js");
  j();
会提示错误error: j is not a function
*/

// module.exports = {b,c:'123'};

/*
导出的为仍为b方法,因为导出的c被覆盖了
说明如果直接对exports进行覆盖，exports就指向了和module.exports不同的内存。因为require返回的是module.exports，而此时module.exports只有b,所以只会执行b方法;
*/
