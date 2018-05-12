import * as cmder from 'commander'
import * as path from 'path'
import * as fs from 'fs'
import img2mobi from './index'
import {Options} from './gen-epub'

// tslint:disable-next-line:no-console
console.log(`
    Example: img2mobi -i ./imges -o new.mobi
`)

const json = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../package.json')).toString()
)
cmder
    .version(json.version)
    .option('-i, --img-path <str>', 'image file or fold')
    .option('-o, --out-path <str>', 'out path')
    .option('--title [optional]', 'mobi file name')
    .option('--author [optional]', 'mobi file author')
    .option('--desc [optional]', 'mobi file description')
    .option('--rights [optional]', 'mobi file rights')
    .parse(process.argv)

const {imgPath, outPath, title, author, rights} = cmder
const description = cmder.desc

if (!imgPath) {
    throw new Error('imgPath is needed')
}

if (!outPath) {
    throw new Error('outPath is needed')
}

const opt = {
    title,
    author,
    rights,
    description
} as Options

img2mobi(imgPath, outPath, opt)
