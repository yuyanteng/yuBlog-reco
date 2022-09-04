---
title: node概述
date: 2022/08/17
tags:
 - moreKonw
categories:
 - 百家齐放
---
<!-- more -->

<img src="../../.vuepress/public/node.png" alt="image-20220904234423300" style="width: 75%;" />

# 1.node概述

## 1.1 介绍

https://nodejs.org/zh-cn/

http://nodejs.cn/

查看自己的node版本，必须确保版本在12以上，如果不在，卸载node然后重新下载安装

Node.js 是一个开源与跨平台的JavaScript 运行时环境，使用C++语言编写

它是在浏览器外运行，它是一个 事件驱动异步I/O 单进程的服务端JS环境，基于Google的V8引擎，V8引擎执行Javascript的速度非常快，性能非常好。

它使用新的 ECMAScript 标准，不必等待所有用户更新其浏览器，可以通过更改其版本来决定要使用新的标准特性。

**注意**

- 浏览器是JS的前端运行环境
- Node.js是JS的后端运行环境，在后端中运行无法调用 DOM 和 BOM 等浏览器内置 API
- nodejs调用服务查看服务器相关api gulp基础 ->node环境

前端很多东西与node相关

## 1.2 node应用场景

- 创建应用服务
- web开发
- 接口开发
- 客户端应用工具 gulp webpack vue脚手架 react脚手架 小程序等

## 1.3 安装

nodejs环境安装非常便捷，直接可通过官网地址，下载对应的安装软件包即可安装使用。

![img](https://gitee.com/daxunxun/bk-2007-course/raw/master/note/week1-node/img/1%20install.png)

如果在开发的过程中，需要安装多个node的版本以支持 多个项目的使用，建议使用 [nvm node环境管理工具](https://www.runoob.com/w3cnote/nvm-manager-node-versions.html)，可以根据自己的电脑系统选择安装。

## 1.4 模块化

**听过哪些模块化规范**：

 Es6的模块化（export import）. ----- vue. React. Minpro ....

 Commonjs 规范. ------- node --- (vue react,minpro....)

 AMD规范 --- 淘汰 ---- require.js

 CMD规范 --- 淘汰. ---- sea.js

NodeJs基于 Commonjs 模块化开发的规范，它定义一个JS文件就称之为一个模块

node的模块类型

- 核心模块 - 安装nodejs自带的模块
- 第三方模块 - 需要手动通过（npm/cnpm/yarn）安装的模块
- 自定义模块 - 开发者自己编写的模块

```
// 模块导出
module.exports
exports

// 模块导入
require
```

Demo1:

```
// 01app.js
// 开发者A写的大量代码
var obj = { // 字面量
  name: '千锋北科校区H5-2007',
  sayName: function () {
    console.log(this.name)
  }
}

// 暴露对象 --- 暴露语法
module.exports = obj
// obj.sayName()

// 01index.js
// 开发者B调用
// ./ 相对路径之 当前路径
// ../ 相对路径之 上一层级路径
// 引入语法
var obj = require('./01app.js') // 引入的是相对路径 ---- 不可以使用绝对路径

// 调用功能
obj.sayName()
```

Demo2:

```
// 02app.js
var fun1 = function () {
  console.log('function1')
}

var fun2 = function () {
  console.log('function2')
}

var num = 100

var str = '2007的小伙伴们，非常棒'

// 如果只需要暴露一个  使用 module.exports 
// 如果要暴露多个  使用 exports
// exports.fun1 = fun1
// exports.fun2 = fun2
// exports.num = num
// exports.str = str

module.exports = {
  fun1: fun1,
  fun2: fun2,
  num: num,
  str: str
}

// 02index.js
// commonjs规范，自定义模块引入时后缀名可以省略
// var app = require('./02app')

// app.fun1()
// app.fun2()

// console.log(app.num)
// console.log(app.str)

// 如果结合 es6 的解构赋值
// 复习 es6 解构赋值 
// https://es6.ruanyifeng.com/#docs/destructuring
var { fun1, fun2, num, str } = require('./02app')

fun1()
fun2()
console.log(num)
console.log(str)
```

具体代码查看code

# 2.node快速开始

## 2.1 运行js文件

检测nodejs是否安装成功,命令行输入如下语句

```
$ node -v
```

如果需要查看node的相关语法以及使用命令

```
$ node
```

## 2.2 核心模块

### 2.2.1 [os操作系统](http://nodejs.cn/api/os.html)

```
const os = require('os');
// 操作系统特定的行末标志。根据操作系统生成对应的换行符. 
// console.log(os.EOL) // window 为 \r\n，linux为 \n

// 返回一个对象数组，其中包含有关每个逻辑 CPU 内核的信息。
// console.log(os.cpus())

// 以整数的形式返回系统的内存总量（以字节为单位）。
// console.log(os.totalmem() / 1024 / 1024 / 1024) // 16    以自己的电脑为例

// 以整数的形式返回空闲的系统内存量（以字节为单位）。
// console.log(os.freemem()  / 1024 / 1024 / 1024) // 2.79    以自己的电脑为例

// 其余属性查看
// http://nodejs.cn/api/os.html
console.log(os.platform()) // 返回标识操作系统平台的字符串
```

**用途**

判断用户的使用平台，给予提示

```
if (os.platform() === 'darwin') {
  console.log('这里是mac平台')
} else {
  console.log('不是mac系统')
}
```

> 场景：
>
> ​	登录网站不同的操作系统 显示不同的下载链接
>
> ​	下载文件时，提示文件过大，请先清除空间

### 2.2.2 [path模块](http://nodejs.cn/api/path.html)

path模块用于处理文件和目录(文件夹)的路径

```
// path模块用于处理文件和目录(文件夹)的路径

var path = require('path')

// console.log(path)
// 获取路径最后一部内容  一般用它来获取文件名称
// console.log(path.basename('c:/a/b/c/d.html'))  // d.html

// 获取目录名，路径最后分隔符部分被忽略
// console.log(path.dirname('c:/a/b/c/d.html')) // c:/a/b/c

// 获取路径中文件扩展名
// console.log(path.extname('c:/a/b/c/d.html')) // .html

// 给定的路径连接在一起
// console.log(path.join('c', 'a', 'd')) // c/a/d

// path.parse() 方法会返回一个对象，其属性表示 path 的有效元素
// console.log(path.parse('/目录1/目录2/文件.txt')) // { root: '/', dir: '/目录1/目录2', base: '文件.txt', ext: '.txt', name: '文件' }


// 注意查看 http://nodejs.cn/api/path.html#path_path_resolve_paths 中的中文 部分
// path.resolve() 方法会将路径或路径片段的序列解析为绝对路径。
// 给定的路径序列会从右到左进行处理，后面的每个 path 会被追加到前面，直到构造出绝对路径
// console.log(path.resolve('/目录1/目录2', './目录3')) // /目录1/目录2/目录3

// console.log(path.resolve('/目录1/目录2', '/目录3/目录4/')) // /目录3/目录4
// console.log(path.resolve('目录1', '目录2/目录3/', '../目录4/文件.gif')) // ../ 上级路径
// /Users/wudaxun/Desktop/workspace/code/sz2108/code/week4/day01/目录1/目录2/目录4/文件.gif

console.log(__dirname)


```

### 2.2.3 [url模块](http://nodejs.cn/api/url.html)

URL字符串是结构化的字符串，包含多个含义不同的组成部分。 解析字符串后返回的 URL 对象，每个属性对应字符串的各个组成部分。

```js
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                              href                                              │
├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │          host          │           path            │ hash  │
│          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │    hostname     │ port │ pathname │     search     │       │
│          │  │                     │                 │      │          ├─┬──────────────┤       │
│          │  │                     │                 │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │    hostname     │ port │          │                │       │
│          │  │          │          ├─────────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │          host          │          │                │       │
├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
│   origin    │                     │         origin         │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
│                                              href                                              │
└────────────────────────────────────────────────────────────────────────────────────────────────┘


const url = require("url")

const urlStr = 'https://www.baidu.com:8080/a/b/c?name=wudaxun&age=18#test'

// const obj = url.parse(urlStr)
// console.log(obj)
/**
 * Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com:8080',
  port: '8080',
  hostname: 'www.baidu.com',
  hash: '#test',
  search: '?name=wudaxun&age=18',
  query: 'name=wudaxun&age=18',
  pathname: '/a/b/c',
  path: '/a/b/c?name=wudaxun&age=18',
  href: 'https://www.baidu.com:8080/a/b/c?name=wudaxun&age=18#test'
}
 */
// const obj = url.parse(urlStr)
// console.log(obj.query) // name=wudaxun&age=18

const obj = url.parse(urlStr, true)
console.log(obj.query) // { name: 'wudaxun', age: '18' }
```

### 2.2.4 [querystring模块](http://nodejs.cn/api/querystring.html)

```js
const url = require("url")
const querystirng = require('querystring')
const urlStr = 'https://www.baidu.com:8080/a/b/c?name=wudaxun&age=18#test'

const queryStr = url.parse(urlStr).query // name=wudaxun&age=18
const obj = querystirng.parse(queryStr)
console.log(obj) // { name: 'wudaxun', age: '18' }
```

### 2.2.5 [global全局变量](http://nodejs.cn/api/globals.html)

```js
// const global = require('global')
// console.log(global) // Cannot find module 'global'

// 无需引入gloabl
console.log(__dirname) // 路径
console.log(__filename) // 路径 + 名称
// 使用场景： 如果需要获取文件的路径 以及 名称时使用
```

### 2.2.6 [fs模块](http://nodejs.cn/api/fs.html)

fs模块提供了用于与文件进行交互相关方法

```
const fs = require('fs')

# 写入数据
fs.writeFile(文件,数据,err=>{})

# 读取文件中数据
fs.readFile(文件, 'utf8’,(err,data)=>{})

# 检查文件是否存在    返回true/false
fs.existsSync(path)

# 获取文件信息
fs.stat(文件,(err,stats)=>{
	stats.isDirectory() // 是否是目录
	stats.isFile()       // 是否为文件
	stats.size            // 文件大小(以字节为单位)
})

# 删除文件
fs.unlink(文件,err=>{})

# 重命名
fs.rename(旧文件名，新文件名, err => {})


```

```js
const fs = require('fs')

// 写入文件
// fs.writeFile('test.txt', '你好，文件', err => {
//   if (err) {
//     console.log(err)
//   }
// })
// 追加
// fs.appendFile('test.txt', '追加', err => {
//   if (err) throw err // 抛出异常
// })

// 重命名
// fs.rename('test.txt', 'test.md', err => {
//   if (err) throw err // 抛出异常
// })

// fs.unlink('test.md', err => {
//   if (err) throw err // 抛出异常
// })

// 查看状态
// fs.stat('test.txt', (err, data) => {
//   if (err) throw err
//   console.log(data)
//   console.log(data.size)
//   console.log(data.isFile()) // true
//   console.log(data.isDirectory()) // false
// })

// 创建文件夹
// fs.mkdir('src', err => {
//   if (err) throw err
// })

// 读取文件信息
fs.readFile('test.txt', 'utf-8', (err, data) => {
  if (err) throw err
  console.log(data) // 你好，文件
})
```



# 3.web服务器

## 3.1 介绍

Web服务器一般指的是网站服务器，是指驻留因特网上某一台或N台计算机的程序，可以处理浏览器等Web客户端的请求并返回相应响应，目前最主流的三个Web服务器是Apache、 Nginx 、IIS。

## 3.2 传统开发和前后端分离开发

- 传统的开发也叫做前后端耦合开发

  前端写完页面，交给后端，后端把html页面后缀名改为自己需要的页面模版，然后渲染数据，示意图如下

- 前后端分离开发

  前端开发者编写html页面通过Ajax调用后端的RestFul API(get/post...)接口进行数据进行交互，后端负责接口开发无需关心页面结构，示意图如下


## 3.3 服务器相关概念

### 3.3.1 IP地址

IP地址就是互联网上每台计算机的唯一地址，因此IP地址具有唯一性。在开发期间，自己的电脑既是一台服务器，也是一个客户端，可以在本机浏览器中输入127.0.0.1进行访问

### 3.3.2 域名

尽管 IP地址能够唯一地标记网络上的计算机，但IP地址是一长串数字，不直观，而且不便于记忆，于是人们又发明了另一套字符型的地址方案，叫域名地址。IP地址和域名是一一对应的关系，这份对应关系存放在一种叫做域名服务器(DNS)的电脑中。在开发测试期间， 127.0.0.1 对应的域名是 localhost。

本地如果localhost无法使用，则是因为本机中的hosts文件中没有匹配上ip地址

- mac: /etc 下 hosts
- windows： c/**windows**/**System32**/**drivers**/**etc** 下hosts

添加 127.0.0.1 localhost

### 3.3.3 网络协议

网络上的计算机之间交换信息,就像我们说话用某种语言一样，在网络上的各台计算机之间也有一种语言，这就是网络协议，不同的计算机之间必须使用相同的网络协议才能进行通信。如：TCP、UDP、HTTP、FTP等等。

### 3.3.4 端口

服务器的端口号就像是现实生活中的门牌号一样。通过门牌号，外卖员就可以准确把外卖

送到你的手中。同样的道理，在一台电脑中，可以运行N多个web 服务。每个 web 服务都对应一个唯一的端口号。客户端发送过来的网络请求，通过端口号，可以被准确地交给对应的 web 服务进行处理

**注意**

- http 默认端口为 80
- https 默认端口为443

## 3.4 创建web服务器

NodeJs是通过官方提供的http模块来创建 web服务器的模块。

通过几行简单的代码，就能轻松的手写一个web服务，从而对外提供 web 服务。

```js
const http = require('http')

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'content-type': 'text/html;charset=utf-8'
    // 'content-type': 'text/plain;charset=utf-8'
  })
  res.write('<h1>hello world</h1>')
  res.write('您好')
  res.end()
})

server.listen(3000)
```

## 3.5 静态资源服务器

phpstudy 安装好之后，会在 www 文件夹下放置 静态的资源，启动phpstudy，然后通过 [http://localhost:80](http://localhost/) 再加上需要的信息即可访问，其中www文件夹就被称之为静态资源文件夹

客户端请求的每个资源uri地址，作为在本机服务器指定目录中的文件。

通过相关模块进行读取文件中数据进行响应给客户端，从而实现静态服务器。

假设目录结构如下：

07static

 -app.js

 www

 -read.txt 

-index.html



```js
const http = require('http')
const fs = require('fs')
const url = require('url')

// 学php的时候，是不是把写好的页面放到服务器的 www 的文件夹下 --- 静态资源服务器
// 想要达成目标 访问时不需要加www  ---- www就是静态资源的目录
/**
 * http://localhost:3000/  			# 显示 index.html
  http://localhost:3000/index.html	# 显示 index.html
  http://localhost:3000/read.txt		# 显示 read.txt
 */
var wwwDir = __dirname // 当前文件的绝对路径
const server = http.createServer((req, res) => {

  res.writeHead(
    200, {
      'content-type': 'text/html;charset=utf-8'
    }
  )
  // console.log(req.url) // /   /favicon.ico   过滤
  if (req.url !== '/favicon.ico') {
    // console.log(req.url)
    // 1.获取用户请求的地址
    const url = req.url
    // 2.默认值
    var filePath = '/index.html';		// 路径为 '/' 时 文件路径指向index.html

    if (url !== '/') {
      filePath = url
    }
    // 读取www文件夹下的文件
    fs.readFile(`${wwwDir}/www${filePath}`, 'utf-8', (err, data) => {
      if (err) throw err
      // console.log(data)
      res.write(data)
      res.end()
    })
  }
  
})

server.listen(3000)
```

地址栏输入如下测试

```
http://localhost:3000/  			# 显示 index.html
http://localhost:3000/index.html	# 显示 index.html
http://localhost:3000/read.txt		# 显示 read.txt
```

## 3.6 获取数据-get

get数据通过地址栏使用query方式进行传递的数据

例如请求地址http://localhost:3000/login?userName=wudaxun&password=123

08get/app.js

```js
const http = require('http')
const url = require('url')
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'content-type': 'text/html;charset=utf-8'
    // 'content-type': 'text/plain;charset=utf-8'
  })

  if (req.url !== '/favicon.ico') {
    const query = url.parse(req.url, true).query
    res.write('姓名:' +  query.userName + '<br />')
    res.write('密码:' +  query.password)
    res.end()
  }
  // 运行代码，地址栏输入 http://localhost:3000/login?userName=wudaxun&password=123 查看效果
})

server.listen(3000)
```

## 3.7 获取数据-post

表单数据多数为post进行提交到服务器端,可以通过[postman](https://www.postman.com/)测试

除非后端告诉你以form表单的形式提交数据，否则就选择x-www-form-urlencoded

![img](https://gitee.com/daxunxun/bk-2007-course/raw/master/note/week1-node/img/17.png)

```js
// 09post.js
const http = require('http')
const querystring = require('querystring')
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'content-type': 'text/html;charset=utf-8'
  })

  // post 接收数据 通过  data 事件接收
  let str = ''
  req.on('data', (data) => { // data 默认为Buffer数据
    // console.log(data.toString())
    str += data.toString() // 累加数据
  })

  req.on('end', () => {
    console.log(str)
    const obj = querystring.parse(str) // 处理数据
    res.write('姓名:' +  obj.userName + '<br />')
    res.write('密码:' +  obj.password)
    res.end()
  })
  
})

server.listen(3000)
```

# 4.NPM包管理器

npm

使用npm/cnpm/yarn安装的资源，都会显示到当前文件夹下的 node_modules 文件夹内，一般在上传文件时，忽略 node_modules

## 4.1介绍

npm是当前市场上最大的包资源管理器。你能想到的都可以去这里下载。其他的包管理器相当于是一个小卖部，npm包管理器相当于沃尔玛超市

npm是NodeJs项目模块管理工具，它已经集成了nodejs安装包中，在npm从从5.2版开始，增加了 npx 命令(解决的主要问题，就是调用项目内部安装的模块，很多工具不再需要npm -g 全局来完成使用了)，使用npm可以实现从NPM服务器下载别人编写的第三方包到本地使用。

npm仓库地址：https://www.npmjs.com/

当然除了npm以外还有Facebook贡献的Yarn，功能和npm一样。

## 4.2切换npm源

npm使用国外镜像源地址，在有的时候可能网络不是很通顺，这时可以使用国内镜像源来完成npm下载模块功能

切换到阿里提供的npm镜像源

地址：https://developer.aliyun.com/mirror/NPM?from=tnpm

```
# 执行如下命令
npm install -g cnpm --registry=https://registry.npm.taobao.org

执行完毕上述命名后，在系统中提供了一个cnpm包管理工具，功能和npm一样，所不同的是cnpm镜像源地址为 阿里提供的源地址。

推荐 日后工作是安装软件都使用cnpm
```

**使用nrm管理npm镜像源**

nrm 是一个 npm 源管理器，允许你快速地在 npm源间切换。npm默认情况下是使用npm官方源(npm config list 来查看),如果直接修改npm源，如果后续需要连接到官方源才能工作，这样来回切换源就变得麻烦了，nrm通过简单的命令就可以解决此问题

```
# 安装  通过cnpm来安装，cnpm使用的就是国内镜像源
cnpm i nrm -g
注 -g global 全局，让nrm不限于到某一个项目中，而是在所有的项目中都可使用
# 查看可用源
nrm ls
```

![img](https://gitee.com/daxunxun/bk-2007-course/raw/master/note/week1-node/img/18.png)

```
# 切换
nrm use 名称(npm)
nrm use cnpm
```

## 4.3 npm相关命令

```
npm init     生成项目的描述文件 package.json ---- 一路敲回车即可

# 如果嫌麻烦
创建文件夹 08npm
npm init -y   不再询问你的意见，直接生成
```

![img](https://gitee.com/daxunxun/bk-2007-course/raw/master/note/week1-node/img/19.png)

```
# 查看本项目已安装模块
npm list
```

![img](https://gitee.com/daxunxun/bk-2007-course/raw/master/note/week1-node/img/20.png)

```
# 安装模块
npm install 模块名[@版本号 可选]  或  npm i 模块名[@版本号 可选]

cnpm i bootstrap 

npm list
```

![img](https://gitee.com/daxunxun/bk-2007-course/raw/master/note/week1-node/img/21.png)

**只要出现模块以及他的版本号即代表成功，可能展示形式不太一样**

```
# 卸载已安装模块
npm uninstall 模块名

cnpm uninstall bootstrap

# 发现node_modules文件夹内容清空
```

安装 全局依赖 ---- 本电脑中的任何一个位置都可以访问的 ---- cnpm

```
cnpm i 模块 -g
```

安装 项目依赖 --- 项目运行时必不可少的依赖 --- 所有的依赖都可以安装成项目依赖 --- 默认

```
cnpm i 模块 --save
cnpm i 模块 -S
```

安装 开发依赖 --- 项目开发时需要，上线以后不需要的依赖 --- 代码格式的校验依赖（开发时校验好代码规则，项目上线就是符合规则的，不需要把它装到项目依赖）

```
cnpm i 模块 --save-dev
cnpm i 模块 -D
```

![img](https://gitee.com/daxunxun/bk-2007-course/raw/master/note/week1-node/img/22.png)

假如某一天，忘记了自己全局安装过的模块的路径，想要查看

```
# 查看全局node_modules的地址
npm root -g
```

![img](https://gitee.com/daxunxun/bk-2007-course/raw/master/note/week1-node/img/23.png)

如果是windows系统，**全局安装**的模块会有一定的小问题（安装没问题，但是使用会有问题，但并不是所有人都会有问题）

```
cnpm i @vue/cli -g     # 全局安装的vue的脚手架

vue -V    # @vue/cli 4.5.9
```

如果是windows的用户，部分人会报如下的错误

```
无法加载文件 C://****/vue.psl,因为在此系统上禁止运行脚本
```

![img](https://gitee.com/daxunxun/bk-2007-course/raw/master/note/week1-node/img/24.png)

```
npm root -g  # 找到全局安装的模块的文件夹
```

直接进入到这个文件夹的内部，调整显示文件的后缀名，然后删除vue.psl文件即可，重新执行就可以

**徐晓春贡献**

```
还有个法子win10这个设置 更新安全里开发者有这个选项 默认是关闭的 打开就好了
```

![img](https://gitee.com/daxunxun/bk-2007-course/raw/master/note/week1-node/img/25.png)

## 4.4 npm 自定义脚本命令

通过package.json文件中的scripts自定义脚本命令

```
{
  "scripts": {
    "dev": "node main.js"
  },
}

# 运行命令
npm run dev
```

## 4.5 自动重启应用

在编写调试Node.js项目，修改代码后需要频繁的手动重启应用，非常繁琐。nodemon这个工具，它的作用是监听代码文件的变动，当代码改变之后，自动重启。

```
# 全局安装nodemon
cnpm i -g nodemon

# 执行node脚本
nodemon app.js

# 配置脚本 package.json
{
  "scripts": {
    "dev": "nodemon main.js"
  },
}
```

还可以使用其余的模块。supervisor

```
cnpm i supervisor -g
# 执行node脚本
supervisor app.js

# 配置脚本 package.json
{
  "scripts": {
    "dev": "supervisor main.js"
  },
}
```

# 5.express

## 5.1 介绍

网址：https://www.expressjs.com.cn/

Express 是基于 Node.js 平台，快速、开放、极简的 Web 开发框架。搭建web服务器

Express 的本质：就是一个 npm 上的第三方包，提供了快速创建 Web 服务器的便捷方法。

使用Express开发框架可以非常方便、快速的创建Web网站的服务器或API接口的服务器

## 5.2 基本使用

### 5.2.1 安装

在项目目录express_course中，打开cmd命令窗口，执行如下命令

```
cnpm init -y
cnpm i -S express
```

**文件夹名称不要含有中文字符**

### 5.2.2 创建web服务

先用 node 服务器实现多个页面的路由

```js

// 10express_course/old.js
const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  if (req.url !== '/favicon.ico') {
    res.writeHead(
      200, {
        'content-type': 'text/html;charset=utf-8'
      }
    )
    const pathname = url.parse(req.url).pathname

    // node原生路由实现
    if (pathname === '/home') {
      res.write('首页')
    } else if (pathname === '/kind') {
      res.write('分类')
    } else if (pathname === '/cart') {
      res.write('购物车')
    } else if (pathname === '/user') {
      res.write('我的')
    } else {
      res.write('404')
    }

    res.end()
  }
})

server.listen(3000)
```

使用express实现同样的功能

```
// 10express_course/express.js
const express = require('express')
const app = express()

app.get('/home', (req, res, next) => {
  res.send('express首页')
})
app.get('/kind', (req, res, next) => {
  res.send('express分类')
})
app.get('/cart', (req, res, next) => {
  res.send('express购物车')
})
app.get('/user', (req, res, next) => {
  res.send('express个人中心')
})

app.listen(3000)
```

查看当前服务器的端口号是否启动

```
// windows
netstat -ano | findstr 3000

// linux/mac
lsof -i:3000      # 查询出哪个进程占用该端口号
kill -9 进程号			# 关闭该进程

```

**接口调试工具**

**postman/apipost/apizza 前两者是软件需安装，后在线即可使用**

RestFul路由规则定义

```js
// 10express_couse/restful.js
// 请求 get / post / put / patch / delete
const app = require('express')()

app.get('/proList', (req, res, next) => {
  const arr = [1, 2, 3]
  res.send(arr)
})

app.post('/login', (req, res, next) => {
  const arr = [4, 5, 6]
  res.send(arr)
})

app.put('/update', (req, res, next) => {
  const arr = [7, 8 ,9]
  res.send(arr)
})

app.delete('/delete', (req, res, next) => {
  const arr = []
  res.send(arr)
})
app.listen(3000)
```

调试可以使用上面所说三个软件中之一来进行调试即可



### 5.2.3 获取接口的相关参数

通过 req.query 对象，可以访问到客户端通过查询字符串的形式发送到服务器的参数

```
app.get('/',(req,res)=>{
	console.log(req.query)
})
```

通过 req.body 对象，可以访问到post请求发送到服务器的参数，但是得配置中间件

```js
const express = require('express')
const app = express()
// post 请求 需要额外的配置信息 ---- express 自带的
app.use(express.json()) // for parsing application/json json格式化
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/login', (req, res, next) => {
  res.send(req.body)
})

app.listen(3000)
```

### 5.2.4 URL中动态参数

通过 req.params 对象，可以访问到 URL 中动态参数

```js
const express = require('express')
const app = express()

// http://localhost:3000/detail/1
// http://localhost:3000/detail/2
// http://localhost:3000/detail/3
app.get('/detail/:proid', (req, res, next) => {
  res.send(req.params)
})

app.listen(3000)
```

### 5.2.5 静态资源管理

express提供了一个非常好用的方法，叫做 express.static()，通过此方法，可以非常方便地创建一个静态web资源服务器

```
const express = require('express')
const app = express()

// http://localhost:3000/a.js
// http://localhost:3000/b.js
// 设置public目录为静态资源目录
app.use('/', express.static('public'))

app.listen(3000)
```

## 5.3 路由

### 5.3.1 概述

路由在生活中如拨打服务电话时，按数字几能处理什么样的处理，它就是类似于按键与服务之间的映射关系。

在Express中，路由指的就是客户端发起的请求与服务器端处理方法之间的映射关系。

![img](https://gitee.com/daxunxun/bk-2007-course/raw/master/note/week1-node/img/26.png)

### 5.3.2 定义路由

express中的路由分3部份组件，分别是请求类型、请求uri和对应的处理函数。

当一个客户端请求到达服务端之后，先经过路由规则匹配，只有匹配成功之后，才会调用对应的处理函数。在匹配时，会按照路由的顺序进行匹配，如果请求类型和请求的 URL 同时匹配成功，则 Express 会将这次请求，转交给对应的函数进行处理。

```
app.<get/post/put/delete/use>(uri,(req,res)=>{})
```

### 5.3.3 模块化路由

在开发项目时，如果将所有的路由规则都挂载到入口文件中，程序编写和维护都变化更加困难。所以express为了路由的模块化管理功能，通过express.Router()方法创建路由模块化处理程序，可以将不同业务需求分开到不同的模块中，从而便于代码的维护和项目扩展。

路由模块化处理可以分为以下步骤来完成

Ø 创建独立js空白文件(最好是统一放在一个目录下)

Ø 在js中使用express.Router()方法创建路由模块对象

Ø 使用路由对象完成路由规则的对应的业务编写

Ø 使用模块化导出(module.exports=router)

Ø 在主入口文件中能过app.use方法来注册定义的路由模块

```
// 09router/pro.js
const express = require('express')
// 在js中使用express.Router()方法创建路由模块对象
const router = express.Router()
// 使用路由对象完成路由规则的对应的业务编写
router.get('/list', (req, res, next) => {
  res.send('产品列表')
})
router.get('/detail/:id', (req, res, next) => {
  res.send('产品详情')
})
router.get('/category', (req, res, next) => {
  res.send('产品分类')
})
// 使用模块化导出(module.exports=router)
module.exports = router
// 09router/user.js
const express = require('express')
// 在js中使用express.Router()方法创建路由模块对象
const router = express.Router()
// 使用路由对象完成路由规则的对应的业务编写
router.get('/list', (req, res, next) => {
  res.send('用户列表')
})
router.get('/detail/:id', (req, res, next) => {
  res.send('用户详情')
})
router.get('/role', (req, res, next) => {
  res.send('用户角色')
})
// 使用模块化导出(module.exports=router)
module.exports = router
// 09 express_router.js
const express = require('express')

const app = express()

// 产品相关路由   -----  A
// 用户相关路由   -----  B
// 为了团队合作，多人合作。提高开发效率
// 引入模块
const pro = require('./09router/pro')
const user = require('./09router/user')
// 在主入口文件中能过app.use方法来注册定义的路由模块
app.use('/pro', pro)
app.use('/user', user)

// 共同的路由
app.get('/', (req, res, next) => {
  res.send('首页')
})

app.listen(3000, (req, res) => {
  console.log('your server is running at http://localhost:3000')
})
```

浏览器分别输入如下代码测试

```
http://localhost:3000/      				首页
http://localhost:3000/pro/list      产品列表
http://localhost:3000/pro/detail/1  产品详情
http://localhost:3000/pro/category  产品分类
http://localhost:3000/user/list     用户列表
http://localhost:3000/user/detail/1 用户详情
http://localhost:3000/pro/role      用户角色
```

**思考： 09 express_router.js 文件中 有如下代码,是不是可以随意的放置位置**

```
// 共同的路由
app.get('/', (req, res, next) => {
  res.send('首页')
})
```

![img](https://gitee.com/daxunxun/bk-2007-course/raw/master/note/week1-node/img/27.png)

为什么 很多人喜欢放后面？

**一般情况下，很多会理解为 路由是从上到下匹配，匹配到就停止** ---- 理念在 vue react 中存在 ----- 坑

## 5.4 中间件

### 5.4.1 中间件理解

中间件可以理解为业务流程的中间处理环节。如生活中吃一般炒青菜，大约分为如下几步骤

![img](https://gitee.com/daxunxun/bk-2007-course/raw/master/note/week1-node/img/14.png)

express中当一个请求到达的服务器之后，可以在给客户响应之前连续调用多个中间件，来对本次请求和返回响应数据进行处理。

![img](https://gitee.com/daxunxun/bk-2007-course/raw/master/note/week1-node/img/15.png)

### 5.4.2 中间件分类

中间件可以分类可分如下几类

Ø 内置中间件 也就是express本身自带 无带npm安装

Ø 第三方中间件

 非 Express 官方内置的，而是由第三方开发出来的中间件，叫做第三方中间件。

在项目中可以通过npm进行安装第三方中间件并配置，从而提高项目的开发效率。

例如body-parser 此中间件可以很方便帮助我们获取到post提交过来的数据。

**坑：后期项目中部分同学电脑上会需要使用body-parser， 上传大图，以前的版本用这个，随着express的升级，通过 express.json()和express.urlencoded()实现**

Ø 自定义中间件 开发者自己编写的

### 5.4.3 自定义中间件

自定义中间件，其本质就是定义一个处理请求的函数，只是此函数中除了有request和response参数外还必须包含一个next参数，此参数作用让中间件能够让流程向下执行下去直到匹配到的路由中发送响应给客户端。也可以通过给request对象添加属性来进行中间件数据的向下传递

```
function mfn(req,res,next){
	
	// 中间件最后一定要执行此函数，否则程序无法向下执行下去
	next()
}
```

![img](https://gitee.com/daxunxun/bk-2007-course/raw/master/note/week1-node/img/16.png)

```
const express = require('express')
const app = express()

app.use((req, res, next) => {
  req.a = 10
  next()
})
app.use((req, res, next) => {
  req.b = 20
  next()
})
app.use((req, res, next) => {
  req.c = 30
  next()
})
app.get('/', (req, res, next) => {
  res.send({
    a: req.a,
    b: req.b,
    c: req.c
  })
})
app.listen(3000)
```

**使用中间件来实现错误的统一处理,即错误级别中间件**

```
app.get(uri,(req,res)=){
	// 如果处理有异常 抛出一个自定义错误
	throw new Error('服务器内部错误')

	res.send('hello')
})

// 自定义中间件完成错误级别中间件 --- 如果不设置。走默认路线，如果设置，走设置路线 --- 放到上一个案例中
app.use((err,req,res,next)=>{
	// 此处err必须为第1个参数，它会获取得到 throw抛出的异常信息
	console.log(err.message)
	res.send(err.message)
})
```

### 5.4.4 内置中间件

express也提供了好用的内置中间件，如提供一个静态资源管理的中间件，通过此中间件就可以帮助为我们快速搭建一个静态资源服务器

```
app.use(express.static('托管目录地址'))
```

### 5.4.5 第三方中间件

express搭建的web服务器中想要接受表单中的post数据可以通过第3方中间件帮助解析获取post数据

步骤如下：

Ø 安装第3方中间件 cnpm i -S body-parser

Ø 在应用文件中导入 require

Ø 通过中间件调用 app.use(body.urlencoded({extended: false}))

```
创建 application/x-www-form-urlencoded 解析
```

Ø 在匹配的路由中通过 req.body获数post中数据

```
注意：Express 内置的 express.urlencoded 中间件，就是基于 body-parser 这个第三方中间件进一步封装出来的。但内置的有版本兼容问题，所以一般项目选择安装使用第3方
// 11 express_next_install.js
const express = require('express')
const BodyParser = require('body-parser'); // cnpm i body-parser -S
const app = express()
// 通过中间件调用  ----  post 通过req.body 获取到数据
app.use(BodyParser.urlencoded({extended: false})) // 以前解决的方案

// http://localhost:3000/register
// postman - body - x-www-from-urlencoded 
// username  大勋勋
// password  654321
app.post('/register', (req, res) => {
  console.log(req.body) // 默认是 undefined ---- body-parser
  res.send(req.body)
})
app.listen(3000, (req, res) => {
  console.log('your server is running at http://localhost:3000')
})
```

注意观察 06 demo 以及 11 demo的区别

## 5.5 cookie和session

### 5.5.1 cookie

HTTP是一个无状态协议，客户端每次发出请求时候，下一次请求得不到上一次请求的数据，我们如何将上一次请求和下一次请求的数据关联起来呢？

如用户登录成功后，跳转到其他页面时候，其他的页面是如何知道该用户已经登录了呢？

此时就可以使用到cookie中的值来判断用户是否登录，cookie可以保存用户数据。

```
cookie 既可以在客户端使用，也可以在服务端使用
cookie 可以存储的大小为4K
cookie 存在有效期
```

cookie它是一个由浏览器和服务器共同协作实现的。cookie分为如下几步实现：

Ø 服务器端向客户端发送cookie并指定cookie的过期时间。

Ø 浏览器将cookie保存起来。

Ø 之后每次请求都会将cookie发向服务器端，在cookie没有过期时间内服务器都可以得到cookie中的值。

express中操作的cookie使用 cookie-parser模块 cnpm i -S cookie-parser

```js
const express = require('express')
const app = express()
const CookieParser = require('cookie-parser')

app.use(CookieParser())

app.get('/ list', (req, res, next) => {
  const cookies = req.cookies // 获取cookie
  console.log(cookies)
  res.cookie('username', 'wudaxun') // 设置cookie
  res.send({
    msg: '前端获取到的cookie为：' + cookies.username
  })
})

app.listen(3000)
```

### 5.5.2 session

 cookie操作很方便，但是使用cookie安全性不高，cookie中的所有数据存储在客户端浏览器中，数据很容易被伪造；

所以一些重要的数据就不能放在cookie当中了，并且cookie还有一个缺点就是不能存放太多的数据，一般浏览大约在4k左右，为了解决这些问题，session就产生了，session中的数据保留在服务端的 ---- 内存中。

 把数据放到cookie中是不安全的，我们可以在cookie中存放一个sessionId值,该sessionId会与服务器端之间会产生映射关系，如果sessionId被篡改的话，那么它就不会与服务器端数据之间产生映射，因此安全性就更好，并且session的有效期一般比较短，一般都是设置是20分钟左右，如果在20分钟内客户端与服务端没有产生交互，服务端就会将数据删除。

**session的原理是通过一个sessionid来进行的，sessionid是放在客户端的cookie中，当请求到来时候，服务端会检查cookie中保存的sessionid是否有，并且与服务端的session数据映射起来，进行数据的保存和修改，也就是说当我们浏览一个网页时候，服务端会随机生成一个1024比特长的字符串，然后存在cookie中的sessionid字段中，当我们下次访问时，cookie会带有sessionid这个字段。**

```js
const express = require('express')
const app = express()
const session = require('express-session')

app.use(session({
  secret: 'sz2108', // 密钥  自己随便制定
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.get('/list', (req, res, next) => {
  const session = req.session // 获取 session
  console.log(session)
  req.session.username = 'wudaxun11111' // 设置 session
  res.send({
    msg: '前端获取到的 session 为：' + session.username
  })
})

app.listen(3000)
```

# 作业

## day01作业

- 复习 es6 的解构赋值

https://es6.ruanyifeng.com/#docs/destructuring

- 查找面试题： 说说AMD，CMD以及Commonjs规范，以及es6模块化之间的区别？

- 下载资源

  下载bootstrap项目模板 百度网盘下载 链接：https://pan.baidu.com/s/128UX3FzlkkNNYc3IoR5jvA 提取码：lbbg

  安装数据库相关软件 --- windows 安装mongodb 百度网盘下载: 链接：https://pan.baidu.com/s/1mIbNrhzFMzMzB3jLs92Dsg 提取码：o8pw

  mac

  https://www.cnblogs.com/cbowen/p/11748922.html

## day02作业

- 高频面试题：nodejs中的错误优先回调

  **通俗讲，在node中，我们在设计一个回调函数的时候，要优先解决错误，然后再传参**

  如果有错，我还谈什么继续

  ```
  if (err) throw err
  .....
  ```

- 熟练web服务器的搭建

- 了解并且知道npm相关概念

- 预习第5个步骤express

## day03作业

- 经典面试题：尽可能全面比较 webStorage 以及cookie
- 熟记 cookie 以及 session 的区别
- 预习 --- 预习笔记中第二天第6点开始
- 好好练习今天的代码