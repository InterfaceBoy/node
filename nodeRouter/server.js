// 引入模块
const http = require("http");
const url = require("url");
/**
 * 用 http 模块创建服务
 * req 获取 url 信息 (request)
 * res 浏览器返回响应信息 (response)
 */
function start(route, handle) {
  function onRequest(request, response) {
    let pathname = url.parse(request.url).pathname;
    /**
     * @description: 调用路由
     * handle：已有的地址后缀对象
     * pathname：当前地址后缀
     * response：浏览器返回响应信息
     */
    route(handle, pathname, response);
  }
  http.createServer(onRequest).listen(8888);
  console.log("服务器已启动");
}

exports.start = start;
