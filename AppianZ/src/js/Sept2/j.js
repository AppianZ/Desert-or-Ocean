const b = () =>{
  console.log('this is fun-b in j.js');
};

exports.c = () => {
  console.log('this is fun-c in j.js');
};
// 如果没有module.exports = b;则导出的是一个对象{c: c方法}

module.exports = b;

/*
导出的为仍为b方法,因为导出的c被覆盖了
说明如果直接对exports进行覆盖，exports就指向了和module.exports不同的内存。因为require返回的是module.exports，而此时module.exports只有b,所以只会执行b方法;
*/
