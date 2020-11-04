# 强缓存与协商缓存

## 什么是强缓存？
强缓存不会像服务器发送请求，直接从缓存中读取资源，状态码为 200，通过设置 expires 以及 Cache-Control 实现，expires 是为了向下兼容， 设置 Cache-Control。

## 什么是协商缓存？
当 expires 以及 Cache-Control 过期或者设置为 no-cache 时，浏览器第二次请求时就会与服务器进行协商，与服务器端进行对比判断资源文件是否进行了修改更新。主要通过头部信息的 Last-Modified 与 If-Modified-Since 比较,只可以用在 GET 或 HEAD 请求中;以及Etag比较判断缓存是否需要更新。

## 缓存类型

- 私有缓存(private为默认值)  
只能被浏览器缓存,只能用于单独用户

- 共享缓存(public)  
既可以被浏览器缓存,也可以被代理服务器缓存,能够被多个用户使用

## 为什么使用缓存？
- 减少服务器压力
- 提高页面访问速度
- 减少网络IO的消耗
- 减少带宽的消耗

## 如何设置
```shell
location / {
    # 尝试根据 uri 资源访问对应的路径，访问不到则返回当前根目录下的 index.html 文件
    try_files $uri $uri/ /index.html;

    # 协商缓存 通过 Etag > Last-Modified 进行比较 判断是否需要更新
    add_header Cache-Control no-cache;
    # 强缓存 设置
    # add_header Cache-Control max-age=86400,must-revalidate,public;
    # 强缓存 设置N天，一般用于图片等不常更新的资源文件
    # expires 1d;
}

# 开启压缩文件
gzip on;
```