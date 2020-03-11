import 'reflect-metadata'
import {Request, Response} from 'express'
import {controller, get, post, put, del} from './decorator'

interface RequestBody extends Request {
    body: {
        password: string | undefined
    }
}

@controller
class LoginController {
    @get('/')
    home(req: RequestBody, res: Response) {
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
    }

    @post('/login')
    login(req: RequestBody, res: Response) {
        const {password} = req.body
        if (password === '123') {
            if (req.session) {
                req.session.login = true
            }
            res.redirect('/')
        } else {
            res.redirect('/')
        }

    }

    @get('/loginout')
    loginout(req: RequestBody, res: Response) {
        if (req.session) {
            req.session.login = undefined
        }
        res.redirect('/')
    }

}
