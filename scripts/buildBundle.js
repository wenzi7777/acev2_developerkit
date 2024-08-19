/**
 * 编译可被桥接的插件包
 */

import { exec as execCb } from "child_process";
import { promises as fsPromises, copyFile as copyFileCb } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { promisify } from "util";

// 将callback风格的函数转换为Promise风格
const exec = promisify(execCb);
const copyFile = promisify(copyFileCb);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const webpackBuildAndCopy = async () => {
    try {
        // 第一步：执行webpack编译
        const { stdout, stderr } = await exec("webpack --config webpack.config.cjs");
        console.log(`webpack完成构建，输出: ${stdout}`);
        if (stderr) console.error(`webpack构建错误: ${stderr}`);

        // 第二步: 复制manifest.js文件
        const sourcePath = join(__dirname, '../', 'self', 'manifest.js');
        const destPath = join(__dirname, '../', 'Charon', 'raw', 'manifest.js');
        await copyFile(sourcePath, destPath);
        console.log('复制manifest.js文件成功。');

        // 第三步: 执行./Charon/index.js
        const { stdout: charonStdout, stderr: charonStderr } = await exec("node ./Charon/index.js");
        console.log(`卡戎输出: ${charonStdout}`);
        if (charonStderr) console.error(`卡戎组件执行时错误: ${charonStderr}`);
    } catch (error) {
        console.error(`执行过程中出错: ${error}`);
    }
};

webpackBuildAndCopy().catch(console.error);