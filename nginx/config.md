# nginx 常见配置
```shell
#配置用户组 默认nobody
#user  nobody;
#表示允许生成的进程数
worker_processes  1;

#错误日志 这个设置可以放入全局块，http块，server块，级别以此为：debug|info|notice|warn|error|crit|alert|emerg
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#进程地址
#pid        logs/nginx.pid;

#事件模块
events {
    #设置网路链接序列化，默认为no
    accept_mutex on;
    #设置一个进程是否同时接受多个网络链接，默认off
    multi_accept on;
    #事件驱动模型，select|poll|kqueue|epoll|resig|/dev/poll|eventport
    #use epoll;
    #最大连接数
    worker_connections  1024;
}

#http模块 可以嵌套多个server，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置
http {
    #文件扩展名与文件类型映射表 include引入文件
    include       mime.types;
    #默认文件类型，默认为text/plain
    default_type  application/octet-stream;

    #自定义格式
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #取消日志服务
    #access_log  logs/access.log  main;

    #是否允许发送文件 http块，server块，location块。
    sendfile        on;

    #每个进程每次调用传输数量不能大于设定的值，默认为0，即不设上限。
    sendfile_max_chunk 100K; 

    #开启或者关闭nginx在FreeBSD上使用TCP_NOPUSH套接字选项， 在Linux上使用TCP_CORK套接字选项。 选项仅在使用sendfile的时候才开启
    #tcp_nopush     on;

    #链接超时时长 http块，server块，location块。
    #keepalive_timeout  0;
    keepalive_timeout  65;
    
    #是否开启压缩文件
    #gzip  on;
        
    #nginx服务器与被代理的服务器建立连接的超时时间，默认60秒
    #proxy_connect_timeout 1;   

    #nginx服务器想被代理服务器组发出read请求后，等待响应的超时间，默认为60秒。
    #proxy_read_timeout 1; 

    #nginx服务器想被代理服务器组发出write请求后，等待响应的超时间，默认为60秒。
    #proxy_send_timeout 1; 

    #客户端断网时，nginx服务器是否终端对被代理服务器的请求。默认为off。
    #proxy_ignore_client_abort on;  

    #反向代理upstream中设置的服务器组，出现故障时，被代理服务器返回的状态值。 error|timeout|invalid_header|http_500|http_502|http_503|http_504|http_404|off
    #proxy_next_upstream timeout;  

    #Nginx服务器不处理设置的http相应投中的头域，这里空格隔开可以设置多个。
    #proxy_ignore_headers "Expires" "Set-Cookie"; 

    #如果被代理服务器返回的状态码为400或者大于400，设置的error_page配置起作用。默认为off。
    #proxy_intercept_errors on;    

    #存放http报文头的哈希表容量上限，默认为512个字符。
    #proxy_headers_hash_max_size 1024; 

    #nginx服务器申请存放http报文头的哈希表容量大小。默认为64个字符。
    #proxy_headers_hash_bucket_size 128; 

    #定义服务器列表
    upstream mysvr {
        server 127.0.0.1:3000;
        server 127.0.0.1:8088 backup; #热备
    }
     
    #轮询服务器列表 优点平滑，缺点各个服务器节点处理能力不同
    #upstream mysvr { 
    #    server 127.0.0.1:7878;
    #    server 192.168.10.121:3333;       
    #}

    #加权轮训服务器列表 优点最大限度的发挥服务器节点的处理能力，缺点不平滑
    #upstream mysvr { 
    #    server 127.0.0.1:7878 weight=1;
    #    server 192.168.10.121:3333 weight=2;
    #}

    #ip_hash:nginx会让相同的客户端ip请求相同的服务器。
    #upstream mysvr { 
    #    server 127.0.0.1:7878; 
    #    server 192.168.10.121:3333;
    #    ip_hash;
    #}

    #服务配置模块
    server {
        #监听端口号
        listen       80;
        #配置监听的地址
        server_name  localhost;

        #字符集
        #charset koi8-r;
        
        #设置服务日志
        #access_log  logs/host.access.log  main;

        #url请求过滤
        location / {
            #根目录
            root   html;
            #默认页面
            index  index.html index.htm;

            # 下面为 vue react 相关单页项目配置
            # try_files $uri $uri/ /index.html;
        }
        
        #url从写
        if ($uri ~ "/") {
               rewrite "^https://www.baiee.cn/" "/$1" redirect;
         }
        #location ～*^.+${
        # proxy_pass http://mysvr; #请求转向mysvr 定义的服务器列表
        # deny 127.0.0.1； #拒绝的ip
        # allow 192.168.1.13;  #允许访问的ip
        #}

        #错误页面
        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        # 重定向服务端错误页面到对应的静态页面
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        # 代理PHP设置
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        # PHP默认配置
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    拒绝来访的IP
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    # 带加密证书的协议配置
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}
```