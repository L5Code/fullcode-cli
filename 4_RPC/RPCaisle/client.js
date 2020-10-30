const net = require("net");
// 创建套接字
const socket = new net.Socket({});
// 套接字连接
socket.connect({
  host: "127.0.0.1",
  port: 4800,
});

function RandomTest() {
  // 模拟随机访问
  let index = Math.floor(Math.random() * lessonId.length);
  // 创建空buffer数据
  let buffer = Buffer.alloc(4);
  // 写入随机索引
  buffer.writeInt32BE(lessonId[index]);
  // 在套接字上发送数据
  socket.write(buffer);
  return index;
}
RandomTest();
// 套接字监听接收到data
socket.on("data", (buffer) => {
  console.log(buffer.toString());
  RandomTest();
});

// socket.write("good morning");
// 测试字段
const lessonId = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
