//protocol-buffers  RPC(远程过程调用)
const protobuf = require("protocol-buffers");
const fs = require("fs");

const message = protobuf(fs.readFileSync(__dirname + "/test.proto"));

var buf = message.Test.encode({
  num: 42,
  payload: "hello word",
});

console.log(buf);

const obj = message.Test.decode(buf);

console.log(obj);
