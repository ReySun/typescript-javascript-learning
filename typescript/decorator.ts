/**
 * 执行顺序
 * 1. 由上至下依次对装饰器表达式求值。
 * 2. 求值的结果会被当作函数，由下至上依次调用。
 */
function f() {
  console.log("f(): evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("f(): called");
  }
}

function g() {
  console.log("g(): evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("g(): called");
  }
}

class C {
  @f()
  @g()
  method() { }
}

/**
 * 类装饰器
 * 类装饰器应用于类构造函数，可以用来监视，修改或替换类定义
 * 
 * 参数：
 * 类的构造函数作为其唯一的参数
 * 
 * 注意：
 * 如果你要返回一个新的构造函数，你必须注意处理好原来的原型链。
 */
@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

// 下面是一个重载构造函数的例子。
function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor { // 无名的class
    // this 代表 实例
    newProperty = "new property";
    hello = "override";
  }
}
@classDecorator
class classGreeter {
  property = "property";
  hello: string;
  constructor(m: string) {
    this.hello = m;
  }
}
console.log(new classGreeter("world"));

/**
 * 方法装饰器
 * 应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义
 * 
 * 参数：
 * 1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
 * 2. 成员的名字。
 * 3. 成员的属性描述符。
 * 
 * 注意：
 * 1. 如果代码输出目标版本小于ES5，属性描述符将会是undefined。
 * 2. 如果方法装饰器返回一个值，它会被用作方法的属性描述符，
 *    如果代码输出目标版本小于ES5返回值会被忽略。
 */

class methodGreeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }

  @enumerable(false)
  greet() {
    return "Hello, " + this.greeting;
  }
}
function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(target);
    console.log(propertyKey);
    descriptor.enumerable = value;
  };
}

/**
 * 属性装饰器
 * 
 * 参数：
 * 1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
 * 2. 成员的名字。
 * 
 * 注意：
 * 1. 属性描述符不会做为参数传入属性装饰器，这与TypeScript是如何初始化属性装饰器的有关。
 *    因为目前没有办法在定义一个原型对象的成员时描述一个实例属性，
 *    并且没办法监视或修改一个属性的初始化方法。返回值也会被忽略。
 *    因此，属性描述符只能用来监视类中是否声明了某个名字的属性。
 */
class propertyGreeter {
  @format("Hello, %s")
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    let formatString = getFormat(this, "greeting");
    return formatString.replace("%s", this.greeting);
  }
}
import "reflect-metadata";
const formatMetadataKey = Symbol("format");
function format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}