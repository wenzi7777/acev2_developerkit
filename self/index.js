const testPlugin = async (showDialog, manifest, ACEV2Log, getSelfPreference) => {
    showDialog({
        title: 'Hello，AcFun Evolved Runtime V2!',
        content: '你成功执行了一个插件。',
        okAction: () => {
            ACEV2Log.success({
                message: JSON.stringify(getSelfPreference({manifest}))
            })
        }
    })
}

testPlugin(showDialog, manifest, ACEV2Log, getSelfPreference)