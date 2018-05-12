import genEpub, {Options} from './gen-epub'
import genMobi from './gen-mobi'
import * as fs from 'fs'

async function main (imgPath: string, outPath: string, options?: Options) {

    const epubPath = await genEpub(imgPath, options)
    const savePath = await genMobi(epubPath, outPath)
    fs.unlinkSync(epubPath)

    // tslint:disable-next-line:no-console
    console.log('Generator success on ' + savePath)
}

export default main
