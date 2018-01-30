# 使用
## 中间件 / 插件
可以通过 `./plugins.js` 快速注册 koa 中间件/ 插件

## 路由
路由表放置在 `./routes.js`
可以根据需要在里面添加路由

## 控制器
控制器请放置在 `./src/controllers/` 目录下
该目录下的控制器会在启动时被自动注册，可以在路由表中很方便得调用控制器
控制器的暴露必须是 函数 或者 对象 （对象中包含函数）
两个在路由中的简单用例:
* `controller.hello.index` ( hello 控制器暴露对象)
* `controller.status` (status 控制器暴露函数)

## 计划任务
计划任务是基于 `Cron` 模块实现。
将不同的模块放置在 `./src/crons` 下， 然后就可以直接在 `./crons.js` 中直接注册。
框架提供了 自动注册 和 按需注册的方式， 在 `./crons.js` 中：
* 暴露 `true` - 自动注册 `./src/crons` 下的所有 计划任务
* 暴露 数组 - 按需注册计划任务

### 计划任务模板
```
module.exports = [
  '* * * * * *', // Cron Config
  () => {
    // Do something
  },
  () => {
    // This function is executed when the job stops
  },
  true, // Start the job right now,
  'Asia/Shanghai' // Timezone
]
```
计划任务模块应该暴露一个 数组：
* 数组第一项是 `crontab` 时间设置
* 数组第二项是 触发计划任务时执行的函数
* 数组第三项是 计划任务被停止时进行的函数
* 数组第四项是 是否立即执行计划任务 （实际上，不管你填写 false 还是 true，我们都会立即执行计划任务）
* 数组第五项是 时区的设置

## 数据库
数据库默认使用的 mysql， 基于 `sequelize` 的 ORM 实现。
数据库模板存放在 `./src/models/databases` 下，使用时可以直接调用 `db.registerModel' 方法直接注册模板。

在使用中，我们只需要配置好信息，然后:
```
const db = require(SrcDir + 'db')
const user = await db.registerModel('model') // Async Function
// Or Common Promise
db.registerModel('model')
  .then(model => {
      // do something
  })
  .catch(err => {
      // Catch err
  })
```

对于一些 `sequelize` 实例化之后才能使用的 参数， 比如 : `sequelize.rand()`。
我们可以通过其子对象进行调用，比如： `model.sequelize.rand()`

> `behaviors` 是 行为库，这里的库通常暴露的方法是可以直接操作的（可以直接达到目的，比如 `behavior.getName(ids)`）。由于时间不多，会在 v0.0.4 补充 例子。
> `migrations` 是 迁移库 ，目前尚未提交。会在 v0.0.4 详细介绍


## 缓存
缓存系统是基于 `Redis` 的实现。
简单的用例：
```
const cache = require(SrcDir + 'cache')
// Async Function
const get = await cache.get(key)
let set = await cache.set(key, value) // Forever key
set = await cache.set(key, value, time) // Redis Time Level is EX

// Common Promise
cache.get(key)
  .then(value => {
      // do something
  })
  .catch(err => {
      // catch error
  })
```
需要注意的是，`set` 方法也返回 promise 。
在通常的用例中，这有助于控制流程和捕获错误。

## 邮件
邮件是基于 `nodemailer` 的实现
暴露了两个接口:
* `mail.send(msg)`
* `mail.error(e)`
`msg` 的 参数：
```
{
  to: '',
  title: '',
  body: '',
  html: false
}
```
简单的用例:
```
const mail = require(SrcDir + 'mail')
await mail.send({
    to: 'i@a632079.me',
    title: 'Hello World',
    body: 'Test Mail',
    html: false
})
```

## 日记
日记保存在 `./logs`。
默认的日记系统使用的是  `winston`
可以通过配置 `log_level` 来控制日记级别

## More
由于时间仓促，这次就先这些简单的内容吧。 下周，会将文档更新得更加全面。
