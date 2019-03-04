## 小程序开发流程
  - 1. 注册整个应用： app.js ---> App({})
  - 2. 全局的配置文件: app.json ---> pages(页面的路径), window(窗口的表现)
  - 3. 注册页面
    - 注册页面: index.js ---> Page({})
    - wxml, wxss, json


## 小程序特点
  1. 没有DOM，一切基于组件化
  2. 单项数据流： MODEL ---> VIEW
  3. 事件： 1) 冒泡事件(bind + 事件名) 2) 非冒泡事件(catch + 事件名)
  4. 小程序环境里全局对象是wx而不是window


## 数据传递
  1. 如何向事件回调中传递： data-key = value
  2. 如何在事件的回调中获取数据： event.currentTarget || event.target.dataset
  3. 如何通过路由跳转传递数据： 路由地址?key=value
  4. 如何在页面中获取路由传过的数据: 在onLoad中的options