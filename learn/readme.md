# 前端学习-拉勾教育
> 文章内容输出：拉钩教育-大前端高薪训练营

我是大前端高薪训练营第五期的学员，从 2020/09/17 开班到现在 2020/10/24 刚好五周，此时再来回顾下，报班时的场景，很庆幸我报了训练营，不然要错过好几个亿，具体原因请看我细细道来～

## 学习前

了解到大前端高薪训练营这个课程的时间，大概是在 2020/09/02 一开始的目标很清晰，报班系统学习下前端相关的知识，也算是查漏补缺。（ps：后端出身，因为不是现有上司嫡系，给强行转成前端了）

开班前一个星期，听了下汪老师的 vue 公开课，给我的感受是特别基础，没有讲到特别深入的东西，然后让我原本特别清晰的心，产生了动摇 😂，这话给汪老师看到不知道会不会被打死。

本来已经在自我学习提升，但是总感觉不系统，最终咬咬牙报了班，这个学费说高不高，说低不低，但对于时间观念比较重的同学来说，挺便宜的～

## 学习中

> 真香

学习一段时间后，你会发现物超所值，那些原本困扰我许久的问题，在学习的过程中逐步解决了。

1. 关于 this 指向的问题

   - 其实大部分人 都知道 function 函数中 谁调用指向谁
   - 箭头函数中，指向定义的地方（确切的说，与定义的地方指向是一致的）

   但是在真正使用的时候，还是会或多或少会出现这样或者那样的错误，例如下面这段代码：

   ```javascript
   const obj2 = {
     foo: function () {
       console.log(this); // this => obj2
       const bar = () => {
         // 容易出错
         console.log(this); // this => window
       };
       bar();
     },
   };
   // obj2.foo.call(123)

   console.log(this);
   ```

   最终总结出以下几点：

   - obj.test() 指向 obj
   - test() 指向 thisGlobal
   - new ClassName() 指向 ClassName
   - 箭头函数 this 指向随定义的者指向

2. eventloop 相关的知识点

- 同步代码、异步代码、消息队列、任务栈、宏任务、微任务
- **EventLoop** 是一种循环机制 ，不断去轮询一些队列 ，从中找到 需要执行的任务并按顺序执行的一个执行模型。
- 微任务，在一轮任务 结束前执行
- 宏任务，在新一轮任务 开始前执行
- ……

3. promise 相关

- then 的穿透性
- then 的返回值
  ```javascript
  const demo = () => {
    return new Promise();
  };
  // 学习之前 一直以为 res === res1, 学习后才发现 res1 等于 then(res=>{}) 中的返回值
  demo()
    .then((res) => {})
    .then((res1) => {});
  ```

4. 函数式编程、函子、管道等概念

5. typescript 的声明类型 declare xxx xxx

6. GC 算法、计数引用、标记清除、标记整理、增量标记等概念及原理

7. gulp 和 grunt 构建自动工作流程，构建一个小型脚手架

   - 引入 inquirer 模块
   - 创建用户与命令行交互的工具
   - 编写所需问题及字段
   - 创建模板目录 templates 将项目文件导入到目录中
   - 引入 ejs 模块 结合所需功能问题变量
   - 改写 templates 下项目文件 达到所需功能
   - 在 inquirer 回调中 结合 nodejs 读写功能 和 ejs 模块将问题变量 重写到项目中
   - 最后发布到 npm 上

   ```JavaScript
   #!/usr/bin/env node
   // index.js
   const inquirer = require('inquirer')
   const ejs = require('ejs')
   const fs = require('fs')
   const path = require('path')

   inquirer.prompt([
       // 询问用户要创建的 文件名称
       {
       type: 'input',
       name: 'projectName',
       message: 'Your components name?'
       },
       // 询问用户要创建的文件路径 默认 当前目录下 /src/components
       {
           type: 'input',
           name: 'createPath',
           message: 'The path you are about to create?',
           default: '/src/components'
       }
   ])
   .then(anwsers => {
       // 获取模版文件地址
       const tmplDir = path.join(__dirname, 'templates')
       // 获取当前根目录
       const destDir = process.cwd()
       // 获取当前目录下的文件
       fs.readdir(tmplDir, (err, files) => {
       if (err) throw err
       // 循环当前的路径
       files.forEach(file => {
           // 读取模板文件
           ejs.renderFile(path.join(tmplDir, file), anwsers, (err, result) => {
           if (err) throw err
           // 获取模板文件的后缀
           let hz = /\..*/.exec(file)[0]
           // 根据用户输入的文件名称 项目路径创建 对应的文件
           fs.mkdir(`${destDir}${anwsers.createPath}/${anwsers.projectName}`, { recursive: true }, (err) => {
               if (err) throw err
               // 创建文件，写入文件流
               fs.writeFileSync(path.join(`${destDir}${anwsers.createPath}/${anwsers.projectName}`, `${anwsers.projectName}${hz}`), result)
           })
           })
       })
       })
   })
   ```

8. webpack 的构建流程

    webpack是运行在nodejs环境下，配置文件遵循commonjs规范。其配置文件webpack.config.js导出一个object/function/promise/array。 Webpack在启动后，会从entry开始，递归解析entry依赖的所有Module，每找到一个Module，就会根据Module.rules里配置的Loader规则进行相应的转换处理，对Module进行转换后，再解析出当前Module依赖的Module，这些Module会以entry为单位进行分组，即为一个Chunk。因此一个Chunk，就是一个entry及其所有依赖的Module合并的结果。最后Webpack会将所有的Chunk转换成文件输出Output。在整个构建流程中，Webpack会在恰当的时机执行Plugin里定义的逻辑，从而完成Plugin插件的优化任务。其流程如下：

    1、配置初始化
    webpack会首先读取配置文件，执行默认配置

    2、编译前准备
    webpack 会实例化compiler，注册plugins、resolverFactory、hooks。

    3、reslove前准备
    webpack 实例化compilation、NormalModuleFactory和ContextModuleFactory

    4、reslove流程
    解析文件的路径信息以及inline loader和配置的loader合并、排序

    5、构建module
    runLoaders处理源码，得到一个编译后的字符串或buffer。将文件解析为ast，分析module间的依赖关系，递归解析依赖文件

    6、生成chunk
    实例化chunk并生成chunk graph，设置module id，chunk id，hash等

    7、资源构建
    使用不同的template渲染chunk资源

    8、文件生成
    创建目标文件夹及文件并将资源写入，打印构建信息

9. loader 和 plugin 的实现  

    loader：用于对模块源码的转换，因为webpack本身只支持js处理，loader描述了webpack如何处理非javascript模块，并且在build中引入这些依赖。loader可以将文件从不同css预处理转换为css,将ts转换为JavaScript，或者将内联图像转换为data URL。比如说：sass-loader、css-Loader，style-Loader、file-loader等。

    loader开发:就像开发中间件管道，可以首先新建一个导出模块,入参为source，对source进行一系列处理，然后返回js代码（或跟上别的loader）

    module.exports = (source)=>{
        return result(source)
    }  

    plugin：plugin通过webpack钩子机制实现，相比于loader,plugin拥有更宽的能力。其目的在于解决loader无法实现的其他事，从打包优化和压缩，到重新定义环境变量，功能强大到可以用来处理各种各样的任务。 plugin开发：plugin被要求必须是一个函数或者是包含apply方法的对象。入参是一个compiler对象，其包含构建所需信息，开发时可以通过compiler中hooks属性访问到emit钩子，并通过其tap方法注册一个钩子函数，定制钩子名称和挂载函数。该函数入参为compilation打包上下文，通过遍历compilation下assets的所有键得到所有文件名称。然后根据 键 的source（）方法拿到对应的content内容，然后对content进行一些处理，并返回给souce函数，以达到我们的插件目的。

10. vue-router 的实现原理
    - 注册插件
    - 实例化 vue-router 对象
    - 挂载到 vue 实例上
    ```javascript
    let _Vue = null
    export default class VueRouter {
        static install (Vue) {
            // 1.判断当前插件是否已经被安装
            if (VueRouter.install.installed) {
                return
            }
            VueRouter.install.installed = true
            // 2.把vue构造函数记录到全局变量
            _Vue = Vue
            // 3.把创建vue实例时候传入的router对象注入到vue实例上
            // 混入实现
            _Vue.mixin({
                beforeCreate () {
                    if (this.$options.router) {
                        _Vue.prototype.$router = this.$options.router
                    }
                }
            })
        }

        constructor (options) {
            this.options = options
            this.routeMap = {}
            this.data = _Vue.observable({
                current: '/'
            })
        }

        init () {
            this.createRouteMap()
            this.initComponents(_Vue)
            this.initEvent()
        }

        createRouteMap () {
            // 遍历所有的路由规则，将路由规则解析成键值对的形式，存储到routeMap中
            this.options.routes.array.forEach(route => {
                this.routeMap[route.path] = route.component
            });
        }

        initComponents (Vue) {
            Vue.component('router-link', {
                props: {
                    to: String
                },
                // template: '<a :href="to"><slot></slot></a>'
                render (h) {
                    return h('a', {
                        attrs: {
                            href: this.to
                        },
                        on: {
                            click: this.clickHandler
                        }
                    }, [this.$slots.default])
                },
                methods: {
                    clickHandler (e) {
                        history.pushState({}, '', this.to)
                        this.$router.data.current = this.to
                        e.preventDefault()
                    }
                }
            })

            const self = this
            Vue.component('router-view', {
                render (h) {
                    const component = self.routeMap[self.data.current]
                    return h(component)
                }
            })
        }

        initEvent () {
            window.addEventListener('popstate', () => {
                this.data.current = window.location.pathname
            })
        }
    }
    ```

……

等等一系列的知识，都极大的提高了我对前端的认知，拓展了自身的视野，提高了技术的深度，以及自己动手的能力，不再停留在阅读理解，而不动手的层面。

如果，你跟我有同样的经历，或者相似的困惑，建议您报名学一下，拉钩的课程，良心推荐，也可私聊笔者，我帮你引荐给老师～

不要觉得价格贵哈，在这里我给你算笔帐，你可能就清楚了；相同的知识点，自学的话，可能要花双倍的时间，而且不一定能够吃透内容的本质。

如果要学习 180 天 一天 2 小时 那就是 360 小时，自学需要花的时间就是 720 小时， 你的工资 以 10000/22 元/天 计算 大概 65 元/每小时，那么 65 \* 360 = 23400， 23400 - 10000 = 13400 成本算下来还是赚的 🙈

目前就先讲到这里了，先去学习了，有缘再见～
