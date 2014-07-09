var page = require('webpage').create();
var fs = require('fs');
var system = require('system');
page.viewportSize = {
	  width: 1024,
	  height:680 
};
page.clipRect = {
	width: 1024,
	height:680 
};
var address;
if (system.args.length === 1) {
	phantom.exit(1);
} else {
	address = system.args[1];
	page.open(address, function (status) {
		console.log(address);
		//page.render(address.match(/\.([^.]+?)\.doc\.html$/)[1] + '.png');
		phantom.exit();
	});
}
