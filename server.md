>在本机启动了screen 回话，回话id是nodeserver，可通过screen -ls 查看
>screen -wipe  nodeserver 可关闭回话，node server也会终止
>重新启动，screen -S nodeserver
>回话启动后，执行node server.js

>/etc/sysconfig/iptables里加入下面一行
-A INPUT -m state --state NEW -m tcp -p tcp --dport 8088 -j ACCEPT
service iptables restart 重启防火墙
重启虚拟机,开启8088端口号
