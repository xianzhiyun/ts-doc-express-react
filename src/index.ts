import express, {Request, Response, NextFunction} from 'express'
// import router from './router'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import './controller/LoginController'
import './controller/CrowllerController'
import {router} from "./controller/decorator";


const app = express()
// 解析请求发送的内容
app.use(bodyParser.urlencoded({extended: false}))
// 设置cookie-session
app.use(cookieSession({
    name: 'session',
    keys: ['teacher dell'],
    maxAge: 24 * 60 * 60 * 1000
}))
// 类型融合,类型扩展
// app.use((req:Request,res:Response,next:NextFunction) => {
//     req.teachName = 'dell'
// })
app.use(router)
app.listen(7001, () => {
    console.log('\x1B[32m%s\x1B[0m', '打印', '服务已经启动, http:localhost:7001')
})
