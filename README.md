# 如何安装？

`npm install wecode -g`

# 创建项目

目前支持 Koa2.\* ,后期会支持 Express,前端框架 Vue; React 考虑中~

# Koa2 项目模块已经帮你配置：

## 常用的目录结构

```
├── bin                        # 项目初始化脚本
├── cache                      # 数据缓存
│   │── api                    # 缓存存储目录
│   └── index.js               # 数据缓存实现代码
├── config                     # 项目配置文件夹
│   │── database.config.js     # 数据库配置文件
│   │── table.config.js        # 数据表配置文件
│   └── index.js               # 基本配置文件
├── database                   # 静态资源
│   │── database.function.js   # 数据库连接方法封装文件
│   └── db.js                  # 数据库连接文件
├── middleware                 # 中间件
├── public                     # 公共静态资源文件
├── routes                     # 动态路由文件
├── routesFunc                 # 动态路由的专属方法，不通用
├── timedtask                  # 定时任务
├── utils                      # 公共方法
│   │── dbMiddleware.js        # 访问数据库方法
│   │── error.js               # 错误回调方法
│   └── index.js               # 基本通用方法
├── views                      # 接口平台网站
├── app.js                     # 入口文件
├── .eslintrc.js               # eslint 配置项
├── pm2.json                   # pm2服务启动配置文件
├── package-lock.json          # package-lock.json
└── package.json               # package.json
```

# 创建项目

wecode create your_project_name koa

1. 自动拉取项目模板
2. 安装项目依赖
3. 打开浏览器 http://localhost:3000/
4. 自动启动项目

# 项目开发

项目开发目前提供一个功能：

- 创建 Router 路由组件，并自动配置路由：

wecode addrouter YourRouterName # 例如 wecode addrouter user，默认会存放到 /routes 文件夹中

wecode addrouter YourComponentName -d config/test # 也可以指定存放的具体文件夹,但是需要在 app.js 自行注册路由

- 为什么 router 文件不存放在 routes 文件夹中需要自行注册路由：

文件夹 routes 中会自动加载到路由到项目的 routes 配置中，（实际上是一个读取文件夹的过程）不需要手动配置了（如果是自己配置的文件夹需要手动配置）

routes/index.js 中已经完成如下操作：

```
// 动态加载 routes 中所有的路由文件
for (let item of fs.readdirSync(routesUrl)) {
  let routerName = path.win32.basename(item, '.js');
  routes[routerName] = require(path.resolve(routesUrl, routerName));
}

// 动态路由映射
Object.keys(routes).forEach(key => {
  app.use(routes[key].routes(), routes[key].allowedMethods());
});
```
