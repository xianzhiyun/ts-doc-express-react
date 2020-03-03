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

