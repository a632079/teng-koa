#### 网易云
接口: `https://v1.hitokoto.cn/nm/`  

> 目前该接口已开启缓存服务 （开启检测的概要查询缓存 7 天， 其余数据缓存 2 小时）
> 目前 API 正在逐步更新， 由 Linux API -> Web API 以增加 `offset` 和 `limit` 参数

支持以下 ~~8~~ 16 个功能：  
* 搜索曲目 - `https://v1.hitokoto.cn/nm/search/:keyword`
  * 参数：
    * 种类 - `type`:
      * 专辑: `ALBUM`
      * 歌手: `ARTIST`
      * 电台: `DJ`
      * 歌词: `LYRIC`
      * 视频: `MV`
      * 歌单: `PLAYLIST`
      * 歌曲: `SONG` (默认)
      * 用户: `USER`
    * 偏移量 - `offset`
    * 限制量 - `limit`
      * 一次返回多少结果
  * 调用示例: `https://v1.hitokoto.cn/nm/search/海阔天空?type=SONG&offset=0&limit=30`
* 获得歌单 - `https://v1.hitokoto.cn/nm/playlist/:id`  
* 获得曲图 - `https://v1.hitokoto.cn/nm/picture/:id/:height?`  
* 获得歌手 - `https://v1.hitokoto.cn/nm/artist/:id`  
* 获得专辑 - `https://v1.hitokoto.cn/nm/album/:id`  
* 获得歌词 - `https://v1.hitokoto.cn/nm/lyric/:id`  
* 获得歌曲 - `https://v1.hitokoto.cn/nm/url/:id`   
* 获得细节 - `https://v1.hitokoto.cn/nm/detail/:id`  
* 获得概要 - `https://v1.hitokoto.cn/nm/summary/:id`
  * 启用歌词 - `https://v1.hitokoto.cn/nm/summary/:id?lyric=true`
  * 关闭检测 - `https://v1.hitokoto.cn/nm/summary/:id?quick=true`
    * 默认开启检测， 目的是筛除无法播放的歌曲（未返回 URL）
  * 优化结果 - `https://v1.hitokoto.cn/nm/summary/:id?common=true`
  * 调用示例 -  `https://v1.hitokoto.cn/nm/summary/28391863,22640061?common=true&lyric=true&quick=true`
* 重定向
  * 歌曲 - `https://v1.hitokoto.cn/nm/redirect/music/:id`
  * ~~图片 - `https://v1.hitokoto.cn/nm/redirect/picture/:id`~~ 因为图片地址不改变，所以移除该 API
* 播放记录 - `https://v1.hitokoto.cn/nm/record/:uid`
  * 获取周记录 - `https://v1.hitokoto.cn/nm/record/:uid?weekly=true`
* 歌曲评论 - `https://v1.hitokoto.cn/nm/comment/music/:id`
  * 可选参数 -  `offset` `limit`
  * 调用示例 - `https://v1.hitokoto.cn/nm/comment/music/28391863?offset=0&limit=100`
* 视频链接 - `https://v1.hitokoto.cn/nm/url/mv/:mvid`
  * 受上级 SDK 影响， 暂时 302 至另一个接口
* 用户电台 - `https://v1.hitokoto.cn/nm/user/dj/:uid`
  * 参数 - `offset` `limit`
  * 调用示例 - `https://v1.hitokoto.cn/nm/user/dj/91239965?limit=30&offset=0`
* 电台节目 - `https://v1.hitokoto.cn/nm/dj/:rid`
  * 参数 - `offset` `limit`
  * 调用示例 - `https://v1.hitokoto.cn/nm/dj/336355127?limit=30&offset=1`
* 电台细节 - `https://v1.hitokoto.cn/nm/dj/detail/:rid`
