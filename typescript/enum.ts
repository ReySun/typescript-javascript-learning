/* 使用枚举我们可以定义一些有名字的数字常量 */
// 枚举是在运行时真正存在的一个对象
enum Direction {
	Up = 1,
	Down,
	Left,
	Right
}
enum FileAccess {
	None,
	Read = 1 << 1,
	Write = 1 << 2,
	ReadWrite = Read | Write,
	// computed member
	G = "123".length
}


/* 常数枚举 */
// 是在 enum关键字前使用const修饰符, 编译阶段会被删除
const enum Directions {
	Up,
	Down,
	Left,
	Right
}
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]


/* 外部枚举 */
// 外部枚举用来描述已经存在的枚举类型的形状，编译阶段会被删除
// 外部枚举和非外部枚举之间有一个重要的区别，在正常的枚举里，
// 没有初始化方法的成员被当成常数成员。 对于非常数的外部枚举而言，没有初始化方法时被当做需要经过计算的
declare enum OuterEnum {
	A = 1,
	B,
	C = 2
}