const EventEmitter = require("events").EventEmitter;

class GoodsUpdate extends EventEmitter {
  constructor() {
    super();
    // 每*秒执行一次
    setInterval(() => {
      // 抛出事件
      this.emit("newGoods", { price: Math.random() * 100 });
    }, 3000);
  }
}
const goodsPush = new GoodsUpdate();

// 监听
goodsPush.addListener("newGoods", (res) => {
  console.log("yeah!", res);
});
