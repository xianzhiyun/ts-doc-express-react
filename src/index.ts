import express,{Request, Response, NextFunction} from 'express'
import router from './router'
import bodyParser from 'body-parser'
const app = express()
app.use(bodyParser.urlencoded({extended:false}))
// 类型融合,类型扩展
app.use((req:Request,res:Response,next:NextFunction) => {
    req.teachName = 'dell'
})
app.use(router)
app.listen(7001, () => {
    console.log('\x1B[32m%s\x1B[0m', '打印', '服务已经启动, http:localhost:7001')
})
