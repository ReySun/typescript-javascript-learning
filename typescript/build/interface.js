"use strict";
function printLabel(name) {
    console.log(name.firstName + "" + name.secondName);
}
let myObj = {
    age: 10,
    firstName: 'Jim',
    secondName: 'Raynor'
};
printLabel(myObj);
function createSquare(config) {
    let newSquare = { color: "white", area: 100 };
    if (config.color) {
        // newSquare.color = config.clor; // Error: Property 'clor' does not exist on type 'SquaredConfig'
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
let mySquare1 = createSquare({ color: "black" });
// let mySquare2 = createSquare({ color: "black",  opacity: 0.5 }); //Error
// 类型断言 多余的参数绕开这些检查
let mySquare3 = createSquare({ width: 100, opacity: 0.5 });
let mySearchx;
mySearchx = function (src, sub) {
    let result = src.search(sub);
    if (result == -1) {
        return false;
    }
    else {
        return true;
    }
};
let myArray;
myArray = ["Bob", "Fred"];
let myStr = myArray[0];
// 错误：使用'string'索引，有时会得到Animal!
/**
 * TypeScript支持两种索引签名：字符串和数字。
 * 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。
 * 这是因为当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象。
 * 也就是说用 100（一个number）去索引等同于使用"100"（一个string）去索引，因此两者需要保持一致。
 */
class Animal {
}
class Dog extends Animal {
}
let myArrayd = ["Bob", "Fred"];
let readArray = ["Alice", "Bob"];
//  myArray[2] = "Mallory"; // error!
// 只读数组
let aee = [1, 2, 3, 4];
let ro = aee;
function createClock(ctor, hour, minute) {
    return new ctor(hour, minute);
}
class DigitalClock {
    constructor(h, m) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock {
    constructor(h, m) { }
    tick() {
        console.log("tick tock");
    }
}
let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
let square = {};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
function getCounter() {
    let counter = function (start) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
/* 接口继承类 */
// 当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）
class Control {
}
class Button extends Control {
    select() { }
}
class TextBox extends Control {
}
// 错误：“Image”类型缺少“state”属性。
// class Image implements SelectableControl {
//   select() { }
// }
