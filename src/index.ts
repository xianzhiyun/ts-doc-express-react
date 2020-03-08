import express from 'express'

const app = express()

app.get('/', (req,res) => {
    res.send('hello world')
})
app.listen(7001, () => {
    console.log('\x1B[32m%s\x1B[0m', '打印', '服务已经启动, http:localhost:7001')
})
