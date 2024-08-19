# ACE-DeveloperKit ACE插件开发者工具箱

## 请在self目录下编写您的插件。
**根据manifest.js内的提示修改您的插件描述文件**


## 工具箱命令
**输出插件包：node ./scripts/buildBundle.js**

**启动本地开发者服务器：node ./scripts/serveBundle.js**

## ACE Plugin Debug Bridge的连接路径填写
**默认端口为27390，因此连接信息为：http://localhost:27390/raw.json**

**自动安装桥接插件仅支持json格式，请务必填写hostname/raw.json**

## 下一步

### 安装此插件包
**注意，使用本工具箱编译的插件包未被签名，无法通过PSV(插件签名检查)。**

**要安装此插件，需要在设置内将PSV设置为 Half 或 None。**

### 签名
**在[AcFun Evolved Plugins](https://github.com/wenzi7777/AcFun-Evolved-Plugins)仓库提出pull request，提交您的entry.js与manifest.js即可发布插件，您的插件将被签名，随后在Plugin Store内可见。**
