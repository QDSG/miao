# miaoserver

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm start
```



# 运行前准备

- 还原数据库

  ```
  //将miaoDatabase还原tank_new数据库中
  mongorestore -d miaoDatabase D:\Desktop\tank_new
  ```

- miaoserver\untils\config.js文件中

  ```
  auth: {
            user: '', // **邮箱**
            pass: '' // **连接POP3/IMAP/SMTP服务的SSL码**
         }  
  ```

    配置对应的**邮箱**和**连接POP3/IMAP/SMTP服务的SSL码**



# 项目介绍

express生成器的项目 + MongoDB

### 目录简介

| 文件名       | 简介                                                         |
| ------------ | ------------------------------------------------------------ |
| bin          | 文件下有一个无后缀的www文件，项目的入口，配置web服务端口和一些监听事件 |
| public       | 项目的静态资源文件集                                         |
| routes       | 路由模块                                                     |
| views        | 项目的模版文件，是jade模版引擎（这个模版很简洁，但是坑也比较多，比如对空格的要求都非常严格，多一个少一个空格都会报错的，曾经踩过很多坑，其实它的性能也不是很高还不如用ejs呢） |
| app.js       | 项目的启动文件                                               |
| package.json | 模块管理包                                                   |

