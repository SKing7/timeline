#! /bin/bash
cd avalon.oniui
git pull
cd -
node tool/start.js
grunt concat
grunt uglify
