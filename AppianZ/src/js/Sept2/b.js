const b = () => {
  console.log("this is fuc-b in b.js");
};

export default b;
// 默认导出b


export const c = () => {
  console.log('this is fun-c in b.js');
};
// 直接导出c