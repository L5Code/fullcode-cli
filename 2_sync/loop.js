// 观察者模式，监听事件
const eventLoop = {
  queue: [],
  loop() {
    while (this.queue.length) {
      let callback = this.queue.shift();
      callback();
    }
    setTimeout(this.loop.bind(this), 50);
  },
  add(callback) {
    this.queue.push(callback);
  },
};
eventLoop.loop();

setTimeout(() => {
  eventLoop.add(function () {
    console.log(1);
  });
}, 500);

setTimeout(() => {
  eventLoop.add(function () {
    console.log(2);
  });
}, 800);
