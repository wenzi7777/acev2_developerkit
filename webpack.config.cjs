const path = require('path');

module.exports = {
    mode: "production",
    entry: './self/index.js', // 插件的入口文件
    output: {
        path: path.resolve(__dirname, 'Charon', 'raw'), // 自动输入到卡戎的raw目录内，请勿修改
        filename: 'entry.js', // 输出文件名，请勿修改
    },
    module: {
        rules: [
            {
                test: /\.css$/,       // css代码需要以plain test输出。包括js代码也一样，
                type: 'asset/source', // 如果你需要js代码解析请你在下面自己添加。
            }
        ],
    }
};

