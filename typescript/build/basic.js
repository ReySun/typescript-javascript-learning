"use strict";
/* 布尔类型 boolean */
let isTrue = true;
/* 数字 number */
let decimal = 6;
let hex = 0xf00d;
let binary = 0b1010;
let octal = 0o744;
/* 字符串 string */
let color = "blue";
color = 'red';
/* 数组 array */
let array = [1, 2];
let arrayList = [1, 2];
/* 元组 tuple */
let x;
x = [2, 'string'];
/* 枚举 enum  */
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["green"] = 5] = "green";
    Color[Color["blue"] = 6] = "blue";
})(Color || (Color = {}));
; // 默认下标是0 。可以手动修改下标
let red = Color.red;
let green = Color.green;
let blue = Color.blue;
console.log(red, green, blue); // 0 5 6
/* 任意类型 any */
let notSure;
notSure = 2;
notSure = 'notSure'; // 不抱错
/* 空值 void */
function hello() {
    console.log('hello');
}
let unusable = undefined; //基本数据类型仅null和undefined
/* Null 和 Undefined */
let u = undefined;
let n = null;
/* never */
// Function returning never must have unreachable end point
function error(message) {
    throw new Error(message);
}
/* 解构 */
let input = [1, 2];
let [first, second] = input;
console.log(first); //相当于input[0]：1
console.log(second); //相当于input[1]：2
[first, second] = [second, first]; //交换位置
function f([first, second]) {
    console.log(first); //1
    console.log(second); //2
}
f([1, 2]);
/* 剩余变量 ...name */
let [num, ...rest] = [1, 2, 3, 4];
console.log(first); //1
console.log(rest); //[2,3,4]
let o = { a: "foo", b: 12, c: "bar" };
let { a, b } = o;
console.log(o, a, b); //{ a: 'foo', b: 12, c: 'bar' } 'foo' 12
