// import fs from 'fs'
// import path from 'path'
// import {NextFunction, Request, Response, Router} from 'express'
// import Crowller from './utils/crowller'
// import WebAnalyzer from "./utils/webAnalyzer";
// import {getResponseData} from './utils/util'
//
// interface RequestBody extends Request {
//     body: {
//         password: string | undefined
//     }
// }
//
// // 检测登录中间件
// const checkLogin = (req: Request, res: Response, next: NextFunction) => {
//     const isLogin = req.session ? req.session.login : false
//     if (isLogin) {
//         next()
//     } else {
//         res.json(getResponseData(null, '请重新登录'))
//     }
// }
//
// // 1.express库的类型定义文件，d.ts文件类型描述不准确/
// // interface 定义字段password 类型
// // 2.当时用中间件对req或res做了修改之后，实际上类型并不能提示
// const router = Router()
//
//
// router.get('/getData', checkLogin, (req: RequestBody, res: Response) => {
//     const url = 'https://www.zhuwang.cc/';
//     const analyzer = WebAnalyzer.getInstance()
//     new Crowller(url, analyzer)
//     res.send('数据已更新')
// })
// router.get('/showData', checkLogin, (req: RequestBody, res: Response) => {
//     try {
//         const position = path.resolve(__dirname, '../data/course.json')
//         const result = fs.readFileSync(position, 'utf-8')
//         res.send(JSON.parse(result))
//     } catch {
//         res.send('尚未爬去内容')
//     }
//
// })
// export default router
