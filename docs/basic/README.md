typescript 基础语法文档 + 面试题 +  如何通过serverless 部署自己的typescript文档库

# 基本语法

### 优点

1. 通过类型检测编写代码，提前预知编码错误
2. 通过接口定义，编辑器更好提示
3. 更好阅读代码

```typescript
function testDemo(data: { x: number, y: number }) {
    return Math.sqrt(data.x ** 2 + data.y ** 2)
}
testDemo({x: 1, y: 2})  
```


```typescript
interface Point {
    x: number, y: number
}
function testDemo2(data: Point) {
    return Math.sqrt(data.y + data.y ** 2)
}
```

## 工具

```bash
# 编译ts 文件
tsc demo.ts
# 全局安装ts-node， 运行.ts文件查看结果
ts-node demo.ts  
```

### 静态类型
> 便于我们判断变量和属性内容
```typescript
// 类型在ts中指的是静态类型
let count:number
// 只能赋值同类型
count = 123
```

### 基础类型

> string、number、null、undefined、symbol、boolean 、void
```typescript
const count:number = 123;
const name:string = 'Oliver'
```

### 对象类型

#### Object

```typescript
const teacher:{
    name:string;
    age:number
} = {
    name:'Oliver',
    age: 18
}
```
#### Array

```typescript
// 实现数组的两种形式
const numbers:number[] = [1,2,3]
const numbers1:Array<number> = [1,2,3,4]
```

#### Class
```typescript
// 类
class  Person {}
const person:Person = new Person()
```
#### Function

```typescript
// 函数
const getTotal: ()=> number = ()=>{
    return 123
}
```


### 类型注解 annotation,方便告诉开发者TS 变量类型

```typescript
let count:number
count = 123
```

函数类型注解两种方式
```typescript
// 返回类型 ts推断出，number可以不写
const func = (str:string):number=>{
    return parseInt(str,10)
}

const func1:(str:string)=>number = (str)=>{
    return parseInt(str,10)
}

```


### 类型推断 inference TS会自动的去尝试分析变量类型

> 如果TS无法分析变量类型的话，就需要类型注解，针对变量和属性
```typescript
// 通过变量赋值，推断使用类型
// 编辑器自动推断total类型
// 备注这种情况在vscode可以推断，webstorm 中不能推断结果
let firstNumber = 123
let lastNumber = 123
const total = firstNumber + lastNumber

// 通过函数中类型注解

function getTotal(firstNumber:number, secondNumber:number) :number{
  return firstNumber +secondNumber
}
const total = getTotal(1,2)

```

### 函数相关类型操作

#### 返回类型

##### 返回基本类型，例如 number

```typescript
function getTotal(firstNumber:number, secondNumber:number) :number{
  return firstNumber +secondNumber
}
const total = getTotal(1,2)
```
##### void

```typescript
function syaHello():void {
  console.log('hello')
}
```
##### never

```typescript
function errorEmitter():never {
  throw new Error('服务器异常')
}

function errorEmitter1():never {
  while(true){}
}
```


#### 函数参数结构

```typescript
function add({first,second}:{first:number,second:number}) :number{
  return first + second
}
const  total = add({first:1,second:2})
```

### 其他类型

```typescript
const data =new Date()
```

### 其它 case

```typescript
// 内置函数无法推断,需要类型注解
interface Person {
  name:string
}
const rawData = '{"name":"dell"}'
const newData:Person = JSON.parse(rawData)
```

### 数组

```typescript
const arr:(string|number)[] = [1,'2',3]
const stringArr:string[] = ['1','2','3']
const undefinedArr: undefined[] = [undefined]

// 数组对象处理
const objectArr:{name:string,age:number}[]  = [{
    name: 'dell',
    age: 28
}]
//或通过类型别名 type alias
type User = {name:string; age:number}
const objectArr1:User[]  = [{
    name: 'dell',
    age: 28
}]
```

### 元组 tuple
元组：长度固定，类型固定，用作元组管理，常用于csv文件处理,固定数据结构
```typescript
// 长度固定，类型固定，用作元组管理
const teacherInfo:[string,string,number] = ['Dell','male',18]
// 常用于csv文件处理,固定数据结构
const teacherList: [string,string,number][] = [
    ['dell','male',19],
    ['sun','male',26],
    ['Oliver','female',26]
]
```

### interface 接口

interface 和 type区别？
type可以代表基础类型，interface代表函数对象，但是无法代表基础类型
```typescript
interface Person {
  readonly name: string,
  age?:number
}
type Person1 = string
const getPersonName = (person:Person):void=>{
    console.log(person.name)
}
```

typescript 自变量强校验
```typescript
interface Person {
  readonly name: string,
  age?:number,
  // [propName:string]:any,  // 除了要求变量之前进行传递
  // say():string
}
const getPersonName = (person:Person):void=>{
    console.log(person.name)
}
const person = {
    name:'dell',
    sex: 'male',
    say():string {
        return 'hello world'
    }
}
getPersonName(person)
// 这种自变量直接复制不同导致信息会报错， 可以缓存在一个变量里面
getPersonName({
    name:'dell',
    sex: 'male'
})
```
#### 类可以应用接口

```typescript
interface Person {
  name: string,
  age?:number,
  // [propName:string]:any,  // 除了要求变量之前进行传递
  say():string
}
class User implements  Person{
  name = 'Oliver';
  say():string {
      return 'hello world'
  }
}
```


### 接口继承
super 在类中有什么作用？
```typescript
interface Person {
  name: string,
  // age?:number,
  // [propName:string]:any,  // 除了要求变量之前进行传递
  say():string
}
interface Teacher extends Person{
  teach():string
}

const setPersonName = (person:Teacher):void=>{
    person.name = name
}
let person= {
    name: 'Oliver',
    say():string {
        return  'Oliver'
    },
    teach():string {
        return 'hello world'
    }
}
setPersonName(person)
```

### 接口自身定义属性，方法还可以定义函数

```typescript
interface SayHi {
  (word:string):string
}
const say:SayHi = (word:string)=>{
    return word
}
```

### 类的继承

```typescript
class  Person {
    name='dell';
    getName(){
        return this.name
    }
}
class Teacher extends Person{
    getTeacherName(){
        return 'Teacher'
    }
}
const person = new Person()
console.log(person.getName())
```

### 类的重写
```typescript
class  Person {
    name='dell';
    getName(){
        return this.name
    }
}
class Teacher extends Person{
    getTeacherName(){
        return 'Teacher'
    }
    getName() {
        return 'hello world'
    }
}
const person = new Teacher()
console.log(person.getName())
```

### 类的重写，并获取父类内容
```typescript
class  Person {
    name='dell';
    getName(){
        return this.name
    }
}
class Teacher extends Person{
    getTeacherName(){
        return 'Teacher'
    }
    getName() {
        return 'hello world' + super.getName()
    }
}
const person = new Teacher()
console.log(person.getName())

```
### 类的访问类型和构造器
// private protected ,public 访问类型
```typescript
// public
class Person {
    public name:string;
    public sayHi(){
        console.log(this.name)
    }
}
const person = new Person()
person.name = 'dell'
```

```typescript
// private
class Person {
    private name:string;
    public sayHi(){
        console.log(this.name)
    }
}
const person = new Person()
person.name = 'dell'  // throw error
```
```typescript
// protected
class Person {
    protected name:string = 'hello world';
    public sayHi(){
        console.log(this.name)
    }
}
class Teacher extends Person{
    sayBye (){
        console.log(this.name)
    }
}
const teacher = new Teacher()
teacher.sayBye()
```
### 类的构造器

```typescript
// 传统写法
class Person {
  public name:string;
  constructor(name:string) {
      this.name = name
  }
}
const person = new Person('dell')   // 构造器执行的时间，当new实例的时候，执行构造器
console.log(person)
```

```typescript
// 简写
class Person {
    constructor(public name:string) {
        // this.name = name
    }
}
const person = new Person('dell')   // 构造器执行的时间，当new实例的时候，执行构造器
console.log(person)
```

父类构造器子类构造器触通过super触发
```typescript
class Person {
    constructor(public name:string){}
}
class Teacher extends Person{
    constructor (public age:number){
        super('dell')
    }
}
const teacher = new Teacher(28);
```

### 静态属性 Setter 和 Getter

```typescript
class Person {
    constructor(private _name:string) {}
    get name(){
        // ..... 处理逻辑
        return this._name + 'dell'
    }
    set name(name:string){
        // .... 处理逻辑
        this._name = name
    }
}
const person =  new Person('dell')
console.log(person.name) //通过get 获取类中受保护变量

```

### 单例模式

```typescript
class Demo {
    private static instance: Demo;

    private constructor(public name:string) {}

    static getInstance() {
        if (!this.instance) {
            this.instance = new Demo('dell lee')
        }
        return this.instance
    }
}
const demo = Demo.getInstance()
console.log(demo.name)

```

### 抽象类
```typescript
// 正常写法
class Person{
    constructor(public name:string) {}
}
const person = new Person('Dell')
person.name = 'hello'
console.log(person.name)
```

```typescript
// 正常操作
class Person{
    constructor(public name:string) {}
}
const person = new Person('Dell')
person.name = 'hello'
console.log(person.name)
```
实现内部属性保护方式?

```typescript
// 通过设置 private 配合 get 进行使用
class Person{
    private _name:string;
    constructor(name:string) {
        this._name  =  name
    }
    get name(){
        return this._name
    }
}
const person = new Person('Dell')
console.log(person.name)
```
```typescript
// 通过设置 readOnly
class Person{
    readonly name:string;
    constructor(name:string) {
        this.name  =  name
    }
}
const person = new Person('Dell')
console.log(person.name)
```



### 抽象列和抽象方法

```typescript
abstract class Geom {
    width: number;
    getType(){
        return 'Geom'
    }
    abstract getArea():number;
}
class Circle extends  Geom{
    getArea(): number {
        return 0;
    }
}

```
















