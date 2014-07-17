var im = require('imagemagick');
var fs = require('fs');

var dirWWW = process.cwd() + '/';
var dir = dirWWW + 'doc/img/';
var files = fs.readdirSync(dir);
var files = fs.readdirSync(dir);
console.log(im);
for(var i = 0; i < files.length; i++){
	var baseName = files[i];
	var name = dir+baseName;
	im.resize({
	    srcPath: name,
	    dstPath: name,	
		width:400,
		height:245
	}, function(err, stdout){
	  if (err) throw err;
	  console.log('stdout:', stdout);
	});
}
