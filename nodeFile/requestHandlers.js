/*
 * @Autor: 何元鹏
 * @Date: 2020-03-17 16:36:05
 * @LastEditors: 何元鹏
 * @LastEditTime: 2020-03-19 11:20:33
 */
// 建立子进程
const exec = require("child_process").exec;
const querystring = require("querystring");
const fs = require("fs");
const formidable = require("formidable");

// 不同路由下面操作
function start(response, request) {
  var body =
    "<html>" +
    "<head>" +
    '<meta http-equiv="Content-Type" ' +
    'content="text/html; charset=UTF-8" />' +
    "</head>" +
    "<body>" +
    '<form action="/upload" enctype="multipart/form-data" ' +
    'method="post">' +
    '<input type="file" name="upload">' +
    '<input type="submit" value="Upload file" />' +
    "</form>" +
    "</body>" +
    "</html>";

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(body);
  response.end();
}

function upload(response, request) {
  var form = new formidable.IncomingForm();
  form.parse(request, function(error, fields, files) {
    fs.renameSync(files.upload.path, "img/kn.jpg");
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}

function show(response, request) {
  fs.readFile("img/kn.jpg", "binary", function(error, file) {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, { "Content-Type": "image/jpg" });
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
