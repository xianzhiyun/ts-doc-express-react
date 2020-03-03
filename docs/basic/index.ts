// 类型在ts中指的是静态类型
let b: string = '123'
b = '123'


function testDemo(data: { x: number, y: number }) {
    return Math.sqrt(data.y + data.y ** 2)
}

testDemo({x: 1, y: 2})


interface Point {
    x: number,
    y: number
}

const point: Point = {
    x: 3,
    y: 4
}

function testDemo2(data: Point) {
    return Math.sqrt(data.y + data.y ** 2)
}

const counter = 123
counter.toFixed()
let firstNumber:number = 123
let lastNumber:number = 123
const total = firstNumber + lastNumber
console.log(total)
