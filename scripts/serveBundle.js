/**
 * 编译可被桥接的插件包，然后使用本地服务器部署插件包。
 *
 * 将自动监听本地文件更改
 */
import chokidar from 'chokidar';
import express from 'express';
import { exec as execCb } from "child_process";
import { copyFile as copyFileCb } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { promisify } from "util";

const exec = promisify(execCb);
const copyFile = promisify(copyFileCb);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceDir = join(__dirname, '../', 'self');
const destDir = join(__dirname, '../', 'Charon', 'raw');

const webpackConfigPath = join(__dirname, '../', 'webpack.config.cjs');
const publicPath = join(__dirname, '../', 'Charon', 'pack');

// 第一步和第二步：执行webpack编译并复制文件
const buildAndCharon = async () => {
    try {
        // 使用webpack的watch模式
        await exec(`webpack build --config ${webpackConfigPath}`);
        // 复制manifest.js文件
        await copyFile(join(sourceDir, 'manifest.js'), join(destDir, 'manifest.js'));
        console.log('复制manifest.js文件成功。');
        // 第三步: 执行./Charon/index.js
        const { stdout: charonStdout, stderr: charonStderr } = await exec("node ./Charon/index.js");
        console.log(`卡戎输出: ${charonStdout}`);
        if (charonStderr) console.error(`卡戎组件执行时错误: ${charonStderr}`);
    } catch (error) {
        console.error(`执行过程中出错: ${error}`);
    }
};

// 启动一个本地服务器
const startServer = () => {
    const app = express();
    app.use(express.static(publicPath));
    const port = 27390;
    app.listen(port, () => {
        console.log(`服务器运行在 http://localhost:${port}`);
    });
};

// 监控文件变动并重新执行webpack构建和文件复制
const watchFiles = () => {
    chokidar.watch(sourceDir).on('change', (event, path) => {
        console.log(`${path} has changed, rebuilding...`);
        buildAndCharon();
    });
};

// 主函数
const main = async () => {
    // 开始监控文件变动
    watchFiles();
    // 启动本地服务器
    startServer();
    // 初始执行一次webpack构建和文件复制
    await buildAndCharon();
};

main().catch(console.error);
