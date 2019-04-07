"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 执行顺序
 * 1. 由上至下依次对装饰器表达式求值。
 * 2. 求值的结果会被当作函数，由下至上依次调用。
 */
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey, descriptor) {
        console.log("f(): called");
    };
}
function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey, descriptor) {
        console.log("g(): called");
    };
}
class C {
    method() { }
}
__decorate([
    f(),
    g()
], C.prototype, "method", null);
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
let Greeter = class Greeter {
    constructor(message) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
};
Greeter = __decorate([
    sealed
], Greeter);
function sealed(constructor) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
// 下面是一个重载构造函数的例子。
function classDecorator(constructor) {
    return class extends constructor {
        constructor() {
            super(...arguments);
            // this 代表 实例
            this.newProperty = "new property";
            this.hello = "override";
        }
    };
}
let classGreeter = class classGreeter {
    constructor(m) {
        this.property = "property";
        this.hello = m;
    }
};
classGreeter = __decorate([
    classDecorator
], classGreeter);
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
    constructor(message) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
__decorate([
    enumerable(false)
], methodGreeter.prototype, "greet", null);
function enumerable(value) {
    return function (target, propertyKey, descriptor) {
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
    constructor(message) {
        this.greeting = message;
    }
    greet() {
        let formatString = getFormat(this, "greeting");
        return formatString.replace("%s", this.greeting);
    }
}
__decorate([
    format("Hello, %s")
], propertyGreeter.prototype, "greeting", void 0);
require("reflect-metadata");
const formatMetadataKey = Symbol("format");
function format(formatString) {
    return Reflect.metadata(formatMetadataKey, formatString);
}
function getFormat(target, propertyKey) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}
