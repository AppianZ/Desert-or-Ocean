/**
 * Created by appian on 2017/12/4.
 */
enum Color {Red = 1, Green = 3, Blue = 4};
let c:Color = Color.Green;
let colorName: string = Color[2];


// console.log(`c --- ${c}`);
// console.log(`colorName --- ${colorName}`);  // 显示'Green'因为上面代码里它的值是2


let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

console.log(strLength);