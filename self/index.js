const testPlugin = async (showDialog, manifest, getSelfPreference) => {
    showDialog({
        title: 'Hello，AcFun Evolved!',
        content: '你成功执行了一个插件。',
        okAction: () => {
            console.log(JSON.stringify(getSelfPreference({manifest})))
        }
    })
}

testPlugin(showDialog, manifest, getSelfPreference)