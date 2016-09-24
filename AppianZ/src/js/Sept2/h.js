const b = () => {
  console.log('this is fun-b in h.js');
};

const c = () => {
  console.log('this is fun-c in h.js');
};

// 导出的为方法,且只导出了b方法。
module.exports = b;
