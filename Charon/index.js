/**
 * 组件【卡戎】
 * 用于生成可被桥接的插件安装包
 *
 * 经webpack编译：所需文件将自动输入raw目录下
 *
 * 未经webpack编译：手动将插件编译产物entry.js与manifest.js放于raw目录下
 *
 */

import path from 'path'
import fs from 'fs'
import fse from 'fs-extra'
import {manifest} from "./raw/manifest.js"
import {c} from "tar"
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createPack = async () => {
    try {
        const outputDir = path.join(__dirname, 'pack');
        fs.mkdirSync(outputDir, {recursive: true});

        const entryFilePath = path.join(__dirname, './raw/entry.js');
        const manifestFilePath = path.join(outputDir, 'manifest.json');

        fse.copySync(entryFilePath, path.join(outputDir, 'entry.js'));

        let manifestData = {...manifest};
        manifestData.signature = 'This plugin is currently under development, bridged installation required!';
        fse.writeJsonSync(manifestFilePath, manifestData);

        // 创建index.json
        const index = {
            self: fs.readFileSync(entryFilePath, 'utf8'),
            signature: 'This plugin is currently under development, bridged installation required!',
            manifest: manifestData
        };
        const indexPath = path.join(outputDir, 'raw.json');
        fs.writeFileSync(indexPath, JSON.stringify(index, null, 4));

        console.log('Pack directory prepared successfully.');

        await c(
            {
                gzip: true,
                file: path.join(outputDir, 'raw.json.tar.gz'),
                cwd: outputDir
            },
            ['raw.json']
        );
        console.log('raw.json has been compressed to raw.json.tar.gz successfully.');
    } catch (error) {
        console.error('Error processing the file:', error);
    }
};

createPack();