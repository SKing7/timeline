var express = require('express');
var app = express();
app.use(express.static(process.cwd()));
console.log("listen at port 3000");
app.listen(3000);
