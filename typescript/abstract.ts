// 抽象类 abstrac
// Typescript也有抽象类的概念，它是供其它类继承的基类，一般不会直接被实例化。
// 不同于接口，抽象类必须包含一些抽象方法，同时也可以包含非抽象的成员
// 接口更注重功能的设计，抽象类更注重产品族的体现
abstract class Personx {
  abstract speak(): string;//必须在派生类中实现
  walking(): void {
    console.log('walking on the road');
    console.log(this.speak())
  }
}
class Male extends Personx {
  constructor() {
    super(); // 在派生类的构造函数中必须调用 super()
  }
  speak(): string {
    console.log('speak');
    return 'speak';
  }

  dance() {
    console.log('dance');
  }
}
let person: Personx; // ok 创建一个抽象类引用
// person=new Personx(); // error: 不能创建抽象类实例
person = new Male(); // ok 创建一个男人实例
person.speak(); // speak
person.walking(); // walking on the road
// person.dance() // 错误: 方法在声明的抽象类中不存在, 不能编译，但是在js中是存在的