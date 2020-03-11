import fs from 'fs';
import path from 'path';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { controller, get, use } from './decorator';
import { getResponseData } from '../utils/util';
import Crowller from '../utils/crowller';
import WebAnalyzer from '../utils/webAnalyzer';

interface BodyRequest extends Request {
    body: { [key: string]: string | undefined };
}

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        next();
    } else {
        res.json(getResponseData(null, '请先登录'));
    }
};

@controller
class CrowllerController {
    @get('/getData')
    @use(checkLogin)
    getData(req: BodyRequest, res: Response) {
        const url = 'https://www.zhuwang.cc/';
        const analyzer = WebAnalyzer.getInstance()
        new Crowller(url, analyzer)
        res.send('数据已更新')
    }

    @get('/showData')
    @use(checkLogin)
    showData(req: BodyRequest, res: Response) {
        try {
            const position = path.resolve(__dirname, '../../data/course.json')
            const result = fs.readFileSync(position, 'utf-8')
            res.send(JSON.parse(result))
        } catch {
            res.send('尚未爬去内容')
        }
    }
}
