import * as fs from 'fs/promises';
import path from 'path';
import readline from 'readline';
import yamlFront from 'yaml-front-matter';

const sourcePath = './static/content/pages/tutorial',
    listAllPath = './static/content/all.yaml',
    timestampToID = (date) => {
        return new Date(date).getTime().toString(20)
    }
let targetPath = sourcePath
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
}),
    writeHandle = (inputPath) => {
        return new Promise(async () => {
            const items = await fs.readdir(targetPath),
                yamlify = (str) => {
                    return yamlFront.loadFront(str)
                }
            for (let i = 0; i < items.length; i++) {
                if (path.extname(items[i]) === '.md') {
                    let fulPath = path.join(targetPath, items[i]),
                        docStr = await fs.readFile(fulPath, 'utf-8'), docState = await fs.stat(fulPath);

                    if (!yamlify(docStr).id) {
                        let id = timestampToID(docState.birthtime), fileName = path.basename(fulPath), slug = fileName.replace(path.extname(fileName), '')
                        docStr = docStr.replace('---\r\ntitle:', '---\r\nid: ' + id + '\r\ntitle:')
                        await fs.writeFile(fulPath, docStr).then(() => { console.log(path.join(inputPath, fileName) + '\'s ID is generated'); }).catch(err => console.error(fileName + 'is NOT generated'));
                        await fs.appendFile(listAllPath, `${id}-{${slug}}\r\n`)
                    }
                }
            }
            console.log('DONE');
            rl.close()

        })



    }

const readlineHandle = () => {
    rl.question('输入tutorial目录 (默认为根): ', (inputPath) => {
        targetPath = path.join(sourcePath, inputPath)

        rl.question('目标目录为：' + targetPath + ' 是否进行操作 (Y/N)', async (val) => {
            let stat = await fs.stat(targetPath).catch((err) => console.error('目录不存在'))
            if (!(stat && stat.isDirectory())) throw '目录不存在'
            if (val.toLowerCase() === 'y' || val == '') {
                await writeHandle(inputPath)

            }

        })
    })

    rl.on('line', () => { });
    rl.on('close', () => process.exit(0))
};
readlineHandle()

