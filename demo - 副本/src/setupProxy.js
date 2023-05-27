const {createProxyMiddleware} = require("http-proxy-middleware")


module.exports = function(app) {
    app.use(createProxyMiddleware("/api",{
          target: "http://open.douyucdn.cn/api",
          changeOrigin:true,
          pathRewrite:{
            "^/api":""
          }
    }))
 }