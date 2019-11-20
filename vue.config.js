module.exports = {
    //项目地址加一个二级目录;默认值为'/'
    publicPath: process.env.PUBLIC_PATH,
    devServer: {
        port: process.env.DEVSERVER_PORT,// 端口
        proxy:{
            '/back': {
                target: process.env.DEVSERVER_PROXY_BACK_TARGET,
                ws: true,
                changeOrigin: true,
                pathRewrite:{  //需要rewrite重写的, 如果在服务器端做了处理则可以不要这段
                    '/back':''
                }
            },
            '/file': {
                target: 'process.env.DEVSERVER_PROXY_FILE_TARGET',
                ws: true,
                changeOrigin: true,
                pathRewrite:{
                    '/file':''
                }
            }
        }
    }
}