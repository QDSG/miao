const express = require('express')
const app = express()
var apiRoutes = express.Router();
app.use('/api',apiRoutes)


var singer = require('./src/static/data/github-goods.json') //本地json文件数据
var recommend=require('./src/static/data/goods.json')


module.exports = {
    publicPath:'/miao',
    devServer : {
        before(app) {
            app.get('/api3/singer', (req, res) => {
                res.json({ 
                    msg:"ok",
                    status:0,
                    data:singer
                })
            })
            app.get('/api3/recommend', (req, res) => {
                res.json({ 
                    msg:"ok",
                    status:0,
                    data: recommend
                })
            })
        },
        proxy : {
            '/api2' : {
                target : 'http://localhost:3000',
                changeOrigin : true
            },
            '/api' : {
                target : 'http://39.97.33.178',
                changeOrigin : true
            }
        }
    },
    
}


// module.exports = {
//     devServer:{ 
//         open: process.platform === 'darwin',
//         host: '0.0.0.0',
//         port: 8080,
//         https: false,
//         hotOnly: false,
//         proxy: null //设置跨域，即将本文件内任何没有匹配到的静态文件，都指向跨域地址
//         },
// }