/*
 * @Autor: 何元鹏
 * @Date: 2020-03-18 16:52:48
 * @LastEditors: 何元鹏
 * @LastEditTime: 2020-03-19 11:09:03
 */
const http = require("http");
const url = require("url");
const formidable = require("formidable");
const util = require("util");

function start(route, handle) {
  function onRequest(request, response) {
    let pathname = url.parse(request.url).pathname;

    route(handle, pathname, response, request);

    // let postData = "";
    // request.setEncoding("utf8");
    // request.addListener("data", function(postDataChunk) {
    //   postData += postDataChunk;
    //   console.log("接收的POST数据块" + postDataChunk + "'.");
    // });

    // request.addListener("end", function() {
    //   route(handle, pathname, response, postData);
    // });
  }
  http.createServer(onRequest).listen(8081);
  console.log("服务器已启动");
}

exports.start = start;
