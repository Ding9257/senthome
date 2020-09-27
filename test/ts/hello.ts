const message: string = 'Hello Nodejs';

const nickname: string = 'MayJun'; // 字符串
const age: number = 20; // Number 类型
const man: boolean = true; // 布尔型
let hobby: string; // 字符串仅声明一个变量
let a: undefined = undefined; // undefined 类型
let b: null = null; // null 类型，TS 区分了 undefined、null
let list: string[] = ["1"]; // 不需要类型检查器检测直接通过编译阶段检测的可以使用 any，但是这样和直接使用 JavaScript 没什么区别了
let c: any;
c = 1;
c = '1';

class Person {
    age: number;
    private sex: String;

    protected phone: number;

    getPhone(){
        return this.phone;
    }
}