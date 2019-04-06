/* 泛型(Generic) */
// 泛型是为了提升代码的复用性而开发的，与Java，C#中的泛型类似。
// 比如我们有个最小堆算法，需要同时支持number和string。这样可以把集合类型改为any。
// 这样就完全放弃了类型检查。这样实现有很大的瑕疵，而使用泛型解决更为优雅。
// 我们可以声明一个最小堆适用于number类型newMinHeap()，然后声明一个最小堆适用于string类型newMinHeap()
function identity1(arg: any): any {
  return arg;
}
function identity2<T>(arg: T): T {
  return arg;
}


/* 使用方法 */
// 1. 传入所有的参数，包含类型参数
let output1 = identity2<string>("myString");  // type of output will be 'string'
// 2. 利用了类型推论 -- 即编译器会根据传入的参数自动地帮助我们确定T的类型
let output2 = identity2("myString");  // type of output will be 'string'


/* 使用泛型变量 */
function loggingIdentity1<T>(arg: T[]): T[] {
  console.log(arg.length);  // Array has a .length, so no more error
  return arg;
}
function loggingIdentity2<T>(arg: Array<T>): Array<T> {
  console.log(arg.length);  // Array has a .length, so no more error
  return arg;
}


/* 泛型接口 */
/* 泛型函数的类型与非泛型函数的类型没什么不同，只是有一个类型参数在最前面，像函数声明一样 */
interface GenericIdentityFn1 {
  <T>(arg: T): T;
}
/* 泛型函数 */
function identity3<T>(arg: T): T {
  return arg;
}
let myIdentity1: GenericIdentityFn1 = identity3;
let myIdentity2: <U>(arg: U) => U = identity3;// 使用不同的泛型参数名 数量上和使用方式上能对应上就可以
let myIdentity3: { <T>(arg: T): T } = identity3;// 使用带有调用签名的对象字面量来定义泛型函数
// 例子
function zip<T1, T2>(l1: T1[], l2: T2[]) {
  //zip<T1, T2>(l1: T1[], l2: T2[]): [T1,T2][]  报错？
  var len = Math.min(l1.length, l2.length);
  var ret = [];
  for (let i = 0; i < len; i++) {
    ret.push([l1[i], l2[i]]);
  }
  return ret;
}
zip<number, string>([1, 2, 3], ['Jim', 'Sam', 'Tom'])


/* 这引导我们去写第一个泛型接口了。 我们把上面例子里的对象字面量拿出来做为一个接口 */
interface GenericIdentityFn2<T> {
  (arg: T): T;
}
let myIdentity5: GenericIdentityFn2<number> = identity3;


/* 泛型类 */
class MinHeap<T>{
  list: T[] = [];
  add(element: T): void {
    // ...
    this.list.push(element)
  }
  min(): T;
  min() {//min(): T 报错？
    return this.list.length ? this.list[0] : null;
  }
}
var heap1 = new MinHeap<number>();
var heap2 = new MinHeap<string>();


/* 泛型约束 定义一个接口来描述约束条件*/
// 相比于操作any所有类型，我们想要限制函数去处理任意带有.length属性的所有类型。见 loggingIdentity1 和 loggingIdentity2
// 需要传入符合约束类型的值，必须包含必须的属性
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // Now we know it has a .length property, so no more error
  return arg;
}
// loggingIdentity(3);  // Error, number doesn't have a .length property
loggingIdentity({ length: 10, value: 3 }); // 需要传入符合约束类型的值，必须包含必须的属性


/* 在泛型约束中使用类型参数 */
function getProperty(obj: any, key: any) {//官网 function getProperty(obj: T, key: K)报错
  return obj[key];
}

let xx = { a: 1, b: 2, c: 3, d: 4 };

getProperty(xx, "a"); // okay
getProperty(xx, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.


/* 在泛型里使用类类型 */
// 在TypeScript使用泛型创建工厂函数时，需要引用构造函数的类类型
function create<T>(c: { new(): T; }): T {
  return new c();
}
// 一个更高级的例子，使用原型属性推断并约束构造函数与类实例的关系。
// class BeeKeeper {
//   hasMask: boolean;
// }
// class ZooKeeper {
//   nametag: string;
// }
// class Animals {
//   numLegs: number;
// }
// class Bee extends Animals {
//   keeper: BeeKeeper;
// }
// class Lion extends Animals {
//   keeper: ZooKeeper;
// }
// function createInstance<A extends Animals>(c: new () => A): A {
//   return new c();
// }
// createInstance(Lion).keeper.nametag;  // typechecks!
// createInstance(Bee).keeper.hasMask;   // typechecks!

/* 重载 overload */
// 注意，function css(config: any, value?: any) 并不是重载列表的一部分
function css(config: object): void; // css({width:'100px'})
function css(config: string, value: string): void; //css('width','100px')
function css(config: any, value?: any) {
    if (typeof config == 'string') {
        // ...
    } else if (
        typeof config == 'object') {
        // ...
    }
}