module.exports = {
    //项目地址加一个二级目录;默认值为'/'
    publicPath: 'music_front',
    devServer: {
        port: 8081,// 端口
        proxy:{
            '/back': {
                target: 'http://10.25.163.22:8082',
                ws: true,
                changeOrigin: true,
                pathRewrite:{  //需要rewrite重写的, 如果在服务器端做了处理则可以不要这段
                    '/back':''
                }
            },
            '/file': {
                target: 'http://106.15.248.92:8083',
                ws: true,
                changeOrigin: true,
                pathRewrite:{
                    '/file':''
                }
            }
        }
    }
}