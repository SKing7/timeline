**在linux启用会话下的服务**
在本机启动了screen 回话，回话id是nodeserver，可通过 `screen -ls` 查看
`screen -wipe  nodeserver` 关闭会话
如果要启动一个会话，`screen -S nodeserver`
会话启动后，执行`node server.js`

**开放linux的端口号**
`/etc/sysconfig/iptables`里加入下面一行

    -A INPUT -m state --state NEW -m tcp -p tcp --dport 8088 -j ACCEPT

`service iptables restart` 重启防火墙
重启虚拟机后就开启8088端口号
