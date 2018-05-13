import genEpub, {Options} from './gen-epub'
import genMobi from './gen-mobi'
import * as fs from 'fs'

async function main (imgPath: string, outPath: string, options?: Options, verbose = false) {

    const epubPath = await genEpub(imgPath, options)
    try {
        const savePath = await genMobi(epubPath, outPath, verbose)
        // tslint:disable-next-line:no-console
        console.info('Generator success on ' + savePath)
    } catch (error) {
        throw new Error(error)
    }
    fs.unlinkSync(epubPath)

}

export default main
