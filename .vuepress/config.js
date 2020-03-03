module.exports = {
    base: '/ts-dox/',
    dest: 'dist',
    title: 'TypeScript 学习文档',
    description: '爬虫、express + TypeScript',
    markdown: { //markdown编辑器的配置
        lineNumbers: true, //代码显示行号，默认 false
        toc: {includeLevel: [1]}, //显示目录的默认层级
    },
    themeConfig: {
        editLinks: false,
        nav: [],
        docsDir: 'docs',
        sidebar: [
            {
                title: '指南',
                collapsable: false,
                children: [
                    ['docs/', '简介'],
                    'docs/start',
                    'docs/basic/'
                ]
            },
        ],
        // 文档更新时间：每个文件git最后提交的时间,
        lastUpdated: 'Last Updated',
    }
}
