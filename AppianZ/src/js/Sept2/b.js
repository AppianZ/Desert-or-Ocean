const b = () => {
  console.log("this is fuc-b in b.js");
};

// 默认导出b
// export default b;

// 直接导出方法c
export const c = () => {
  console.log('this is fun-c in b.js');
};

// 直接导出变量d
export const d = 'this is var d';
const e = 'this is var e';

export default {b,e};