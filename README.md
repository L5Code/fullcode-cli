# fullcode-cli

![](https://img.shields.io/badge/version-0.4.1-green)

一个帮助你快速开发和搭建【全栈项目】的 cli，解放双手！

> 脚手架通常是代码编写的第一个标准化方案，它告诉所有参与同一个项目的人们如何合理划分项目模块以及如何专注于功能实现。 标准化的脚手架可以使团队协作开发和开始第二个相同技术栈的项目更加容易。出色快速的项目进度需要一个更易于使用的脚手架工具。

## 特征

- 使用简单，为方便快速开发，提高开发效率，提供命令行一行式构建。
- 高自动化，自动拉取模板，自动依赖，自动部署。
- 框架丰富，提供了绝大多数 nodejs 全栈开发中需要用要的框架组件。**(目前支持 Koa, Vue, 后期会支持 Express, 前端框架 React 考虑中~)**
- 兼容性高，支持 windows, linux, macos。

## 🎨 演示

## 背景

本项目的开始是因为许多相同使用技术栈的项目并没有形成相应的技术规范， 这就导致了每次新开项目时很多刚接触的新开发者会对项目的结构规划很是茫然， 甚至出现所有代码全都写在入口文件之中。

这样的项目整合起来将是十分困难，而且很难维护它。 通过以脚手架工具将前期代码工作加以规范，解决项目协作人员水平参差不齐的问题，减轻项目交付的负担， 也能减少花费在担心初始代码是否良好的时间。

本项目的目标是：

1. 定义各个框架明确的项目划分。用于统一公司内部因人而异的项目结构。
2. 项目模板生成器。该模板可以快速帮助开发人员进行产品功能开发。
3. 模块自动注册。自动化所有能自动化的标准代码。

## 🛠️ 如何使用？

> 在决定使用 fullcode-cli 前，必须明确的一点是，
> 此框架暂时给出的是一整套符合作者就职某公司时，基于某公司特色而设计的整体项目解决方案，
> 如果你想让其代替你平时开发工作的脚手架搭建过程，那需要特定修改部分 config 配置来迎合你相关的代码风格和目录风格。
> 如果你是想学习如何拥有一套可以定制的、统一的项目开发解决方案的话，那么你就继续往下看吧！

该项目使用[node.js](https://nodejs.org/en) 。请确认本地是否安装。

`npm install fullcode-cli -g`

## 命令行参数说明:`fullcode --help`

```shell
Usage: fullcode [options] [command]

Options:
  -V, --version          output the version number
  -d, --dest <dest>      Set the project directory
  -h, --help             display help for command

Commands:
  create                 create a new project into a folder
  add                    add a new template into your project
  add-koa-router <name>  add router into your project, e.g. fullcode add-koa-router orders [-d routes]
  add-vue-cpn <name>     add vue component, e.g. fullcode add-vue-cpn HelloWorld [-d src/components]
  add-vue-page <name>    add vue page and router config, e.g. fullcode add-vue-page Home [-d src/pages]
  add-vue-store <name>   add vue store, e.g. fullcode add-vue-store Home [-d src/store/modules]
  help [command]         display help for command
```

## 功能简介

目前 fullcode 仅开放以下功能：

- 针对 Koa 脚手架提供：
  - 创建 router 路由
- 针对 Vue 脚手架提供：
  - 创建 Vue Component
  - 创建 Vue Page, 并配置 router
  - 创建 Vuex 子模块

### 创建项目

```javascript
// 交互模式命令
$ fullcode create

// 1. 自动拉取项目模板
// 2. 安装项目依赖
// 3. 自动启动项目
```

### 创建相应组件

```javascript
// 交互模式命令
$ fullcode add

// 创建 koa router ，router的名称为hello，默认会放到routes目录中
$ fullcode add-koa-router hello
// 创建 koa router ，router的名称为hello，存放在routes目录下
$ fullcode add-koa-router hello -d routes

// 创建 vue component ，component的名称为hello，默认存放在src/components目录下
$ fullcode add-vue-cpn hello
// 创建 vue component ，component的名称为hello，存放在src/components目录下
$ fullcode add-vue-cpn hello -d src/components

// 创建 vue page 和相应 router ，page的名称为hello，默认会在src/pages目录下创建home/router.js 和 home/Home.vue
$ fullcode add-vue-page hello
// 创建 vue page 和相应 router ，page的名称为hello，会在src/pages目录下创建/home/router.js 和 /home/Home.vue
$ fullcode add-vue-page hello -d src/pages

// 创建 vue store ，store的名称为hello，默认会在src/store/modules目录下创建 home/index.js 和 types.js
$ fullcode add-vue-store hello
// 创建 vue store ，store的名称为hello，会在src/store/modules目录下创建 home/index.js 和 types.js
$ fullcode add-vue-store hello -d src/store/modules
```

## 项目简介：

### Vue 项目模块已经帮你配置：

- 常用的目录结构（你可以在此基础上进行修改）

- vue.config.js（其中配置了别名，你可以自行修改和配置更多）

- axios（网络请求 axios 的安装以及二次封装）

- vue-router（router 的安装和配置，动态加载路由）

  使用 fullcode 创建 page 后，路由会自动注册，无需手动注册。

  **为什么要在创建 page 时会要创建 `router.js` ? 动态路由加载是如何实现的？**

  Vue 项目中 `src/router/index.js` 会自动加载 pages 目录下的路由到 routes 配置中，不需要手动配置（当然如果你不使用我提供的配置文件夹，要自定义配置文件夹则需要手动配置）

  `src/router/index.js` 已完成以下自动路由注册：

  ```js
  // 动态加载pages中所有的路由文件
  const files = require.context('@/pages', true, /router\.js$/)
  const routes = files.keys().map((key) => {
    const page = require('@/pages' + key.replace('.', ''))
    return page.default
  })
  ```

- vuex（vuex 的安装和配置，动态加载子模块）

  使用 fullcode 创建好 vuex 子模块后，也不再需要手动配置，项目会自动动态加载：

  ```js
  // 动态加载modules
  const modules = {}
  const files = require.context('./', true, /index\.js$/)
  files
    .keys()
    .filter((key) => {
      if (key === './index.js') return false
      return true
    })
    .map((key) => {
      // 获取名字
      const modulePath = key.replace('./modules/', '')
      const moduleName = modulePath.replace('/index.js', '')
      const module = require(`${key}`)

      modules[`${moduleName}`] = module.default
    })
  ```

### Koa2 项目模块已经帮你配置：

- 常用的目录结构（你可以在此基础上进行修改）

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

- koa-router（router 的安装和配置，动态加载路由）

  **为什么 router 文件不存放在 routes 文件夹中需要自行注册路由？**

  文件夹 routes 中会自动加载到路由到项目的 routes 配置中，（实际上是一个读取文件夹的过程）不需要手动配置了（如果是自己配置的文件夹需要手动配置）

  routes/index.js 中已经完成如下操作：

  ```js
  // 动态加载 routes 中所有的路由文件
  for (let item of fs.readdirSync(routesUrl)) {
    let routerName = path.win32.basename(item, '.js')
    routes[routerName] = require(path.resolve(routesUrl, routerName))
  }

  // 动态路由映射
  Object.keys(routes).forEach((key) => {
    app.use(routes[key].routes(), routes[key].allowedMethods())
  })
  ```

## 相关脚手架项目地址

- [Vue 脚手架 ：https://github.com/wangxinleo/fullcode-vue-temp](https://github.com/wangxinleo/fullcode-vue-temp)

- [Koa 脚手架 ：https://github.com/wangxinleo/fullcode-koa-temp](https://github.com/wangxinleo/fullcode-koa-temp)

## 提问

- [报告问题]()

## 🙏 特别鸣谢

## 联系方式

## 🏘️ 社区

- 欢迎加入 B3LOG 的小众开源社区，详情请看[这里](https://hacpai.com/article/1463025124998)
