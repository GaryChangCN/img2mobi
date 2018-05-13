import * as os from 'os'
import * as cp from 'child_process'
import * as path from 'path'
import * as fs from 'fs'

async function exec (command: string, verbose: boolean) {
    return new Promise((resolve, reject) => {
        cp.exec(command, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            }
            if (verbose) {
                // tslint:disable-next-line:no-console
                console.log('data: ', err, stdout, stderr)
            }
        }).on('exit', () => {
            resolve(true)
        })
    })
}

export default async function (epubPath: string, outPath: string, verbose: boolean) {
    const platform = os.type()
    if (platform !== 'Darwin' && platform !== 'Windows_NT' && platform !== 'Linux') {
        throw new Error('Platform not support. Only support win, mac, linux')
    }

    const binPath = path.resolve(__dirname, `../bin/${platform}/kindlegen`)

    const savePath = path.resolve(process.cwd(), outPath)
    const fileName = path.parse(savePath).base

    await exec(`${binPath} ${epubPath} -o ${fileName}`, verbose)

    await new Promise((resolve, reject) => {
        const oldPath = path.resolve(epubPath, `../${fileName}`)
        fs.rename(oldPath, outPath, err => {
            if (err) {
                reject(err)
            } else {
                resolve(true)
            }
        })
    })

    return savePath
}
