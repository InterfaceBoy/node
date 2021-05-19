// 1. 引入 url 模块
const url = require("url");

// 2. 引入 http 模块
const http = require("http");

// 3、数据库连接

const mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "hyp",
});
// SQL新增功能
let addSqlParams = ["1", "2", "3"],
  items;

// 3. 用 http 模块创建服务
/**
 * req 获取 url 信息 (request)
 * res 浏览器返回响应信息 (response)
 */
http
  .createServer(function (req, res) {
    // 设置跨域的域名，* 代表允许任意域名跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
    // 设置 header 类型
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // 跨域允许的请求方式
    res.setHeader("Content-Type", "application/json");
    // 4. 获取服务器请求
    /**
     * 访问地址是：http://localhost:3000/?userName=hyp
     * 如果你执行 console.log(req.url)，它将执行两次，分别返回下面的信息：
     * /  ?userName=hyp
     * /  /favicon.ico
     * 这里为了防止重复执行，所以排除 req.url == /favicon.ico 的情况
     */
    if (req.url != "/favicon.ico") {
      // 判断请求
      switch (req.method) {
        // post 请求时，浏览器会先发一次 options 请求，如果请求通过，则继续发送正式的 post 请求
        case "OPTIONS":
          res.statusCode = 200;
          res.end();
          break;

        // 如果是 get 请求，
        case "GET":
          // 查询数据库数据
          let data = JSON.stringify(items);
          res.write(data);
          res.end();
          break;

        // 如果是 post 请求
        case "POST":
          let item = "";
          // 读取每次发送的数据
          req.on("data", function (chunk) {
            item += chunk;
          });
          // 数据发送完成
          req.on("end", function () {
            // 存入
            addSqlParams = Object.values(JSON.parse(item));
            // 新增的 SQL 语句及新增的字段信息
            let addSql = "INSERT INTO hypData(name,age,gender) VALUES(?,?,?)";
            SqlFn(addSql, addSqlParams);
            console.log(item);
            // 将数据返回到客户端
            let data = JSON.stringify(items);
            res.write(data);
            res.end();
          });
          break;
      }
    }
  })
  .listen(3000);

connection.query("SELECT * FROM hypData", function (error, results) {
  if (error) throw error;
  items = results;
});
const SqlFn = function (addSql, addSqlParams) {
  // 连接 SQL 并实施语句
  connection.query(addSql, addSqlParams, function (err, res) {
    if (err) {
      console.log("新增错误：", err);
      return;
    } else {
      console.log("新增成功：", res);
    }
  });
};
