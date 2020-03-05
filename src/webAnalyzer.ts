import cheerio from "cheerio";
import fs from "fs";
import {Analyzer} from './crowller'

interface Course {
    title: string,
    per: string
}

interface CourseResult {
    time: number,
    data: Course[]
}

interface Content {
    [propName: number]: Course[]
}

export default class WebAnalyzer implements Analyzer{
    private getCourseInfo(html: string) {
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

    private generateJsonContent(courseInfo: CourseResult, filePath: string) {
        let fileContent: Content = {}
        if (fs.existsSync(filePath)) {
            fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        }
        fileContent[courseInfo.time] = courseInfo.data
        return fileContent
    }

    public analyze(html: string, filePath: string):string {
        const courseInfo = this.getCourseInfo(html)
        return JSON.stringify(this.generateJsonContent(courseInfo, filePath))
    }
}
