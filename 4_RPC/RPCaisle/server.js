const net = require("net");
//创建net服务
const server = net.createServer((socket) => {
  //监听套接字接收data
  socket.on("data", function (buffer) {
    const lessonId = buffer.readInt32BE();
    setTimeout(() => {
      socket.write(Buffer.from(data[lessonId]));
    }, 500);
  });
});
server.listen(4800);

const data = {
  1: "11",
  2: "22",
  3: "33",
  4: "44",
  5: "55",
  6: "66",
  7: "77",
  8: "88",
  9: "99",
};
