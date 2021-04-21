# fullcode-cli

![](https://img.shields.io/badge/version-0.4.1-green)

一个帮助你快速开发和搭建【全栈项目】的cli，解放双手！

> 脚手架通常是代码编写的第一个标准化方案，它告诉所有参与同一个项目的人们如何合理划分项目模块以及如何专注于功能实现。 标准化的脚手架可以使团队协作开发和开始第二个相同技术栈的项目更加容易。出色快速的项目进度需要一个更易于使用的脚手架工具。

## 特征

- 使用简单，为方便快速开发，提高开发效率，提供命令行一行式构建。
- 框架丰富，提供了绝大多数nodejs全栈开发中需要用要的框架组件。**(目前支持 Koa, Vue, 后期会支持 Express, 前端框架 React 考虑中~)**
- 兼容性高，支持windows, linux, macos。

## 背景

本项目的开始是因为许多相同使用技术栈的项目并没有形成相应的技术规范， 这就导致了每次新开项目时很多刚接触的新开发者会对项目的结构规划很是茫然， 甚至出现所有代码全都写在入口文件之中。

这样的项目整合起来将是十分困难，而且很难维护它。 通过以脚手架工具将前期代码工作加以规范，解决项目协作人员水平参差不齐的问题，减轻项目交付的负担， 也能减少花费在担心初始代码是否良好的时间。

本项目的目标是：

1. 定义各个框架明确的项目划分。用于统一公司内部因人而异的项目结构。
2. 项目模板生成器。该模板可以快速帮助开发人员进行产品功能开发。
3. 模块自动注册。自动化所有能自动化的标准代码。

## 如何使用？

> 在决定使用fullcode-cli前，必须明确的一点是，
> 此框架暂时给出的是一整套符合作者就职某公司时，基于某公司特色而设计的整体项目解决方案，
> 如果你想让其代替你平时开发工作的脚手架搭建过程，那需要特定修改部分config配置来迎合你相关的代码风格和目录风格。
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

## 示例

```shell
# 创建脚手架
# 使用交互模式
$ fullcode create

# 模板生成器
# 使用交互模式
$ fullcode add

# 创建 vue component ，component的名称为hello，存放在src/components目录下
$ fullcode add-vue-cpn hello -d src/components
```

## Koa2 项目模块已经帮你配置：

### 常用的目录结构

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

## Koa2 项目模块已经帮你配置：

### 常用的目录结构

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
