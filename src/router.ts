import {Request, Response, Router} from 'express'
import Crowller from './crowller'
import WebAnalyzer from "./webAnalyzer";
import fs from 'fs'
import path from 'path'

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
    const isLogin = req.session ? req.session.login : false
    if (isLogin) {
        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Title</title>
        </head>
        <body>
        <form method="post" action="/login">
            <a href="/getData">爬去数据</a>
            <a href="/showData">查看数据</a>
            <a href="/loginout">退出</a>
        </form>
        </body>
        </html>
    `)
    } else {
        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Title</title>
        </head>
        <body>
        <form method="post" action="/login">
            <input type="password" name="password">
            <button>提交</button>
        </form>
        </body>
        </html>
    `)
    }
})
router.get('/loginout', (req: RequestBody, res: Response) => {
    if (req.session) {
        req.session.login = undefined
    }
    res.redirect('/')
})
router.post('/login', (req: RequestBody, res: Response) => {
    const {password} = req.body
    const isLogin = req.session ? req.session.login : false
    if (isLogin) {
        res.send(`登录成功`)
    } else {
        if (password === '123' && req.session) {
            req.session.login = true
            // res.send(`登录成功`)
            res.redirect('/')
        } else {
            // res.send(`密码错误`)
            res.redirect('/')
        }
    }
})

router.get('/getData', (req: RequestBody, res: Response) => {
    const isLogin = req.session ? req.session.login : false
    if (isLogin) {
        const url = 'https://www.zhuwang.cc/';
        const analyzer = WebAnalyzer.getInstance()
        new Crowller(url, analyzer)
        res.send('数据已更新')
    } else {
        res.send(`请登录后进行爬去数据`)
    }
})
router.get('/showData', (req: RequestBody, res: Response) => {
    const isLogin = req.session ? req.session.login : false
    if (isLogin) {
        try {
            const position = path.resolve(__dirname, '../data/course.json')
            const result = fs.readFileSync(position, 'utf-8')
            res.send(JSON.parse(result))
        } catch {
            res.send('尚未爬去内容')
        }
    } else {
        res.send('请登录')
    }

})
export default router
