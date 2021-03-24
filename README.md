# 如何安装？

npm install coderwhy -g
创建项目
目前支持 Vue，后期会支持 React，Angular 考虑中~

vue 项目模块已经帮你配置：

常用的目录结构（你可以在此基础上修改）
vue.config.js（其中配置了别名，你可以自行修改和配置更多）
axios（网络请求 axios 的安装以及二次封装）
vue-router（router 的安装和配置，另外有路由的动态加载，后面详细说明）
vuex（vuex 的安装和配置，另外有动态加载子模块，后面详细说明）
创建项目

coderwhy create your_project_name
自动拉取项目模板、安装项目依赖、打开浏览器 http://localhost:8080/、自动启动项目

项目开发
项目开发目前提供三个功能：

创建 Vue 组件
创建 Vue 页面，并配置路由
创建 Vuex 子模块
创建 Vue 组件：
coderwhy addcpn YourComponentName # 例如 coderwhy add NavBar，默认会存放到 src/components 文件夹中
coderwhy addcpn YourComponentName -d src/pages/home # 也可以指定存放的具体文件夹
创建 Vue 页面，并配置路由
coderwhy addpage YourPageName # 例如 coderwhy addpage Home，默认会放到 src/pages/home/Home.vue 中，并且会创建 src/page/home/router.js
coderwhy addpage YourPageName -d src/views # 也可以指定文件夹，但需要手动集成路由
为什么会创建 router.js 文件：

router.js 文件是路由的其中一个配置；
创建该文件中 src/router/index.js 中会自动加载到路由的 routes 配置中，不需要手动配置了（如果是自己配置的文件夹需要手动配置）
src/router/index.js 中已经完成如下操作：

// 动态加载 pages 中所有的路由文件
const files = require.context('@/pages', true, /router\.js$/);
const routes = files.keys().map(key => {
const page = require('@/pages' + key.replace('.', ''));
return page.default;
})
创建 Vuex 子模块
coderwhy addstore YourVuexChildModuleName # 例如 coderwhy addstore home，默认会放到 src/store/modules/home/index.js 和 types.js
coderwhy addstore YourVuexChildModuleName -d src/vuex/modules # 也可以指定文件夹
创建完成后，不需要手动配置，已经动态将所有子模块集成进去：

// 动态加载 modules
const modules = {}
const files = require.context('./', true, /index\.js$/);
files.keys().filter(key => {
  if (key === './index.js') return false;
  return true
}).map(key => {  
  // 获取名字
  const modulePath = key.replace('./modules/', '');
  const moduleName = modulePath.replace('/index.js', '');
  const module = require(`${key}`);

modules[`${moduleName}`] = module.default;
})
