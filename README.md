#### **ui_timeline UI规范时间线**

> 根据指定规则(规则看[这里][1])抓取ui doc页面的信息（title和description，页面预览图），形成timeline

#### **安装步骤**
> 确保你的机器上已经安装了nodejs,grunt
 1. git clone 本项目到本地
 2. cd ui_timeline(确保你的用户有当前目录的读写权限)
 3. npm install
 4. git clone https://github.com/RubyLouvre/avalon.oniui.git
 5. node server.js 然后访问3000端口号

#### **如何重新部署**

> 确保你的机器上已经安装了nodejs,grunt,[phantomjs][2]

 1. npm install phantomjs
 2. 安装imagemacgick,获取和编辑图片信息。安装方法:(mac)brew install imagemagick / (ubuntu)apt-get install imagemagick
 3. 另开窗口，执行目录下得build.sh : ./bash.sh(可能没有执行权限，运行chmod a+x build.sh)


 
  [1]: http://wiki.corp.qunar.com/pages/viewpage.action?pageId=58054844
  [2]: http://phantomjs.org/download.html
