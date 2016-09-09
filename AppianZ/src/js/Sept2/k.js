exports.b = () => {
  console.log('this is fun-b in k.js');
};

exports.c = () => {
  console.log('this is func-c in k.js');
};

/*
导出的为对象{b:b,c:c} 等效于 module.exports={b:方法,c:方法}
说明 exports = module.exports = {};
*/
