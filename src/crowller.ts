import superagent from 'superagent'
import cheerio from 'cheerio'

class Crowller {
    private url = 'https://www.zhuwang.cc/';
    private rawHtml = '';

    async getRawHtml() {
        try{
            const result = await superagent.get(this.url).set({
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
            })
            this.getCourseInfo(result.text)
        }catch (e) {
            console.log(e)
        }
    }
    getCourseInfo(html:string){
        const $ = cheerio.load(html)
        const courseItems = $('.chart_nav>ul>li')
        console.log(courseItems.length)
        // courseItems.map((index, element) => {
        //     const descs = $(element).find('entry-list');
        //     const title = descs.eq(0).text()
        //     // console.log(title)
        // })
    }

     constructor() {
        this.getRawHtml()
    }
}

const crowller = new Crowller()
