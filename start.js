var fs = require('fs');
var dir = '/Users/liuzhe/qunar/avalon.oniui/';
var dirWWW = dir + 'www/';
var files = fs.readdirSync(dir);
var child = require('child_process');
var childProcess = require('child_process')
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
			var monthNum = monthIndex[baseName] || 6;
			indexJson[monthNum] = indexJson[monthNum] || [];
			indexJson[monthNum].push({
				name:baseName,
				url: '../' + baseName + '/avalon.' + baseName + '.doc.html',
				cover: 'doc/img/' + baseName + '.png'
			});
			child.exec(binPath + ' ' + dirWWW + 'capture.js ' + absPath,  function(err, stdout, stderr) {
				console.log(absPath + 'don');
				child.exec('mv *.png doc/img/', function () {});
			})
		}
	}
}
fs.writeFile(dirWWW + 'doc/index.js', 'window.indexData = ' + JSON.stringify(indexJson, null, 4), function(err) {}); 
