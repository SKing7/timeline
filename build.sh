#! /bin/bash
cd avalon.oniui
git pull
cd -
node tool/start.js
node tool/resize.js
grunt concat
grunt uglify
