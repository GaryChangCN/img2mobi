import * as epubGenerator from 'epub-generator'
import * as fs from 'fs'
import * as path from 'path'

export interface Options {
    title?: string
    author?: string
    description?: string
    rights?: string
    cover?: string
}


export default function (imgPath: string, option: Options): Promise<string> {
    return new Promise (resolve => {
        if (!imgPath) {
            throw new Error('image path is needed')
        }

        imgPath = path.resolve(process.cwd(), imgPath)

        const baseOpt = {
            title: 'ImageEbook',
            author: 'img2mobi',
            description: 'auto generator by img2mobi',
            rights: 'CC-BY http://creativecommons.org/licenses/by/4.0/'
        } as Options

        let imgList: string[] = []

        const stat = fs.lstatSync(imgPath)
        if (!stat.isDirectory) {
            baseOpt.cover = imgPath
            imgList = [imgPath]
        } else {
            imgList = fs.readdirSync(imgPath).map(item => {
                return path.join(imgPath, item)
            })
        }

        if (imgPath.length === 0) {
            throw new Error('img fold is empty')
        }

        option.title = option.title || baseOpt.title
        option.author = option.author || baseOpt.author
        option.description = option.description || baseOpt.description
        option.rights = option.rights || baseOpt.rights

        const stream = epubGenerator(option)

        imgList.forEach((imagePath, i) => {
            const buf = fs.readFileSync(imagePath)
            stream.add(imagePath, buf, {
                title: `Page ${i}`,
                toc: true
            })
        })

        const outPath = path.resolve(__dirname, `../epub/${option.title}.epub`)
        const outStream = fs.createWriteStream(outPath)
        stream.end().pipe(outStream)

        stream.on('finish', () => {
            resolve(outPath)
        })
    })
}
