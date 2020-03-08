import {Request, Response, Router} from 'express'
import Crowller from './crowller'
import WebAnalyzer from "./webAnalyzer";

interface RequestBody extends Request {
    body: {
        password: string | undefined
    }
}

// 1.express库的类型定义文件，d.ts文件类型描述不准确/
// interface 定义字段password 类型
// 2.当时用中间件对req或res做了修改之后，实际上类型并不能提示
const router = Router()


router.get('/', (req: RequestBody, res: Response) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Title</title>
        </head>
        <body>
        <form method="post" action="/getData">
            <input type="password" name="password">
            <button>提交</button>
        </form>
        </body>
        </html>
    `)
})
router.post('/getData', (req: RequestBody, res: Response) => {
    const {password} = req.body
    if (password === '123') {
        const url = 'https://www.zhuwang.cc/';
        const analyzer = WebAnalyzer.getInstance()
        new Crowller(url, analyzer)
        res.send('数据已更新')
    } else {
        res.send(`${req.teachName}密码错误`)
    }
})
export default router
