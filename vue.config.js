module.exports = {
    //项目地址加一个二级目录;默认值为'/'
    publicPath: 'vue_study',
    devServer: {
        port: 8081,// 端口
        proxy:'http://localhost:8082'
    }
}