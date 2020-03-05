import superagent from 'superagent'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'

interface Course {
    title: string,
    per: string
}

interface CourseResult {
    time: number,
    data: Course[]
}

interface Content {
    [propName:number]:Course[]
}
class Crowller {
    private url = 'https://www.zhuwang.cc/';
    private rawHtml = '';

    async getRawHtml() {
        const result = await superagent.get(this.url).set({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
        });
        return result.text
    }

    getCourseInfo(html: string) {
        let courseInfos: Course[] = [];
        const $ = cheerio.load(html)
        const courseItems = $('.chart_nav>ul>li')
        console.log(courseItems.length)
        courseItems.map((index, element) => {
            const title = $(element).find('li>p').eq(0).text();
            const per = $(element).find('li>div').eq(0).text();
            courseInfos.push({
                title,
                per
            })
        })
        return {
            time: new Date().getTime(),
            data: courseInfos
        }
    }

    generateJsonContent(courseInfo: CourseResult) {
        let fileContent:Content = {}
        const filePath = path.resolve(__dirname,'../data/course.json')
        if (fs.existsSync(filePath)) {
            fileContent = JSON.parse(fs.readFileSync(filePath,'utf-8'))
        }
        return  fileContent[courseInfo.time] = courseInfo.data
    }

    async initSpiderProcess() {
        const filePath = path.resolve(__dirname,'../data/course.json')
        const html = await this.getRawHtml()
        const courseInfo = this.getCourseInfo(html);
        const fileContent =  this.generateJsonContent(courseInfo)
        fs.writeFileSync(filePath, JSON.stringify(fileContent))
    }

    constructor() {
        this.initSpiderProcess()
    }
}

const crowller = new Crowller()
