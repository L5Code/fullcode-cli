// 二进制数据流
/*
  from -> 将数据转成二进制数据流
  alloc -> 创建拥有N位的空的二进制数据流
 */
const buffer1 = Buffer.from("wangxin");
const buffer2 = Buffer.from([1, 2, 3, 4]);
const buffer3 = Buffer.alloc(20);

console.log(buffer1);
console.log(buffer2);
console.log(buffer3);
