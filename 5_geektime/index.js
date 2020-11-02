const koa = require("koa");
const fs = require("fs");
const mount = require("koa-mount");
const static = require("koa-static");

const app = new koa();

// app.use(static(__dirname + "/index_files/"));

app.use(
  mount("/", async (ctx) => {
    // ctx.body = fs.readFileSync(__dirname + "/index.html", "utf-8");
  })
);

// app.listen(3000);
const rpcClient = require("./client.js");

rpcClient.write(
  {
    id: 24,
  },
  function (err, data) {
    console.log(err, data);
  }
);
