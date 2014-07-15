var fs = require('fs');
var relativeRes = 'avalon.oniui/';
var dirWWW = process.cwd() + '/';
var dir = dirWWW + 'avalon.oniui/';
var files = fs.readdirSync(dir);
var child = require('child_process');
var childProcess = require('child_process')
var co = require('cheerio');
var phantomjs = require('phantomjs')
var binPath = phantomjs.path
var indexJson = {};
var monthIndex = {};
for(var i = 0; i < files.length; i++){
	var baseName = files[i];
	var name = dir+baseName;
	if (fs.statSync(name).isDirectory()){
		//avalon.tooltip.doc.html
		var absPath = name + '/avalon.' + baseName + '.doc.html' 
		if (fs.existsSync(absPath)) {
			var monthNum = monthIndex[baseName] || Math.ceil(Math.random() * 10);
			var fileBody = fs.readFileSync(absPath);
			var $ = co.load(fileBody);
			indexJson[monthNum] = indexJson[monthNum] || [];
			indexJson[monthNum].push({
				name:baseName,
				url: relativeRes + baseName + '/avalon.' + baseName + '.doc.html',
				title: $('head title').text(),
				des: $('meta[name="description"]').attr('content') || '暂无描述',
				cover: 'doc/img/' + baseName + '.png'
			});
			child.exec(binPath + ' ' + dirWWW + '/tool/capture.js ' + absPath,  function(err, stdout, stderr) {
				console.log(absPath + 'done');
				child.exec('mv *.png doc/img/', function () {});
			})
		}
	}
}
fs.writeFile(dirWWW + 'doc/index.js', 'window.indexData = ' + JSON.stringify(indexJson, null, 4), function(err) {}); 
