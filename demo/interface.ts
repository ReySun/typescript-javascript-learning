interface FullName {
  firstName: string;
  secondName: string;
  job?: string;//可选参数
  readonly age: number;//只读参数
}
function printLabel(name: FullName) {
  console.log(name.firstName + "" + name.secondName);
}
let myObj = {
  age: 10,
  firstName: 'Jim',
  secondName: 'Raynor'
};
printLabel(myObj);


/* 额外的属性检查 */
interface SquaredConfig {
  color?: string;
  width?: number;
}
function createSquare(config: SquaredConfig): { color: string; area: number } {
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
let mySquare3 = createSquare({ width: 100, opacity: 0.5 } as SquaredConfig);
// 任意个参数 最佳的方式是能够添加一个字符串索引签名，前提是你能够确定这个对象可能具有某些做为特殊用途使用的额外属性
interface SquareConfigAll {
  color?: string;
  width?: number;
  [propName: string]: any;
}


/* 函数类型 interface */
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearchx: SearchFunc;
mySearchx = function (src: string, sub: string) {
  let result = src.search(sub);
  if (result == -1) {
    return false;
  } else {
    return true;
  }
}


/* 可索引的类型 */
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
// 错误：使用'string'索引，有时会得到Animal!
/**
 * TypeScript支持两种索引签名：字符串和数字。 
 * 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。 
 * 这是因为当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象。 
 * 也就是说用 100（一个number）去索引等同于使用"100"（一个string）去索引，因此两者需要保持一致。
 */
class Animal {
  name: string | undefined;
}
class Dog extends Animal {
  breed: string | undefined;
}
interface NotOkay {
  [x: string]: Animal;
  [y: number]: Dog;
}


/* 数组类型 interface */
// 数组类型具有一个index类型表示索引的类型，还有一个相应的返回值类型表示通过索引得到的元素的类型。
// 支持两种索引类型：string和number。
// 数组可以同时使用这两种索引类型，但是有一个限制，数字索引返回值的类型必须是字符串索引返回值的类型的子类型
// 这个索引签名表示了当用 number去索引StringArray时会得到string类型的返回值
interface NumberDictionary {
  [index: number]: string;
  length: number;    // 可以，length是number类型
  // name: string       // 错误，不能将类型“string[]”分配给类型“StringArray”。 类型“string[]”中缺少属性“name”。
}
let myArrayd: NumberDictionary = ["Bob", "Fred"];
// 索引签名设置为只读，这样就防止了给索引赋值
interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let readArray: ReadonlyStringArray = ["Alice", "Bob"];
//  myArray[2] = "Mallory"; // error!
// 只读数组
let aee: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = aee;
// ro[0] = 12; // error!
// ro.push(5); // error!
// ro.length = 100; // error!
// a = ro; // error!


/* 实现接口强制实现某种契约 类静态部分与实例部分的区别 */
// 接口描述了类的公共部分，而不是公共和私有两部分。
interface ClockConstructor {
  new(hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
  tick(): any;
}
function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute);
}
class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log("beep beep");
  }
}
class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log("tick tock");
  }
}
let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);


/* 继承接口 */
interface Shape {
  color: string;
}
interface PenStroke {
  penWidth: number;
}
interface Square extends Shape, PenStroke {
  sideLength: number;
}
let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;


/* 混合类型 */
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}
function getCounter(): Counter {
  let counter = <Counter>function (start: number) { };
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
  private state: any;
}
interface SelectableControl extends Control {
  select(): void;
}
class Button extends Control implements SelectableControl {
  select() { }
}
class TextBox extends Control {
}
// 错误：“Image”类型缺少“state”属性。
// class Image implements SelectableControl {
//   select() { }
// }