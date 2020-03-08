import superagent from 'superagent'

import fs from 'fs'
import path from 'path'
import WebAnalyzer from './webAnalyzer'

export interface Analyzer {
    analyze: (html: string, filePath: string) => string
}
class Crowller {
    private filePath = path.resolve(__dirname, '../data/course.json')

    private async getRawHtml() {
        const result = await superagent.get(this.url).set({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
        });
        return result.text
    }


    private async initSpiderProcess() {
        const html = await this.getRawHtml()
        const fileContent = this.analyzer.analyze(html, this.filePath)
        console.log(fileContent)
        fs.writeFileSync(this.filePath, fileContent)
    }

    constructor(private url: string, private analyzer: Analyzer) {
        this.initSpiderProcess()
    }
}

const url = 'https://www.zhuwang.cc/';

const analyzer = WebAnalyzer.getInstance()
const crowller = new Crowller(url, analyzer)
