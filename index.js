const fs = require("fs")
const path = require("path")
const express = require('express');

const modulesPath = "./modules"
const configFileName = "config"

function parseConfigJSON(paths) {
  const configPath = paths + "/" + configFileName
  var config = require(configPath) || [];
  config.forEach(item => {
    if (item.isP) {
      item.child = parseConfigJSON(paths + "/" + item.key)
    } else {
      item.path = paths.substring(1, paths.length - 1) + "/" + item.key
    }
  })
  return config;
};

function writeJSON(jsonPath, jsonstr) {
  fs.writeFile(jsonPath, jsonstr, function(err) {
    if (err) {
      console.error(err);
    } else {
      console.log('----------修改成功-------------');
    }
  });
}

const config = parseConfigJSON(modulesPath);
writeJSON('./js/config.js', "window.treeMenue=" + JSON.stringify(config))


const app = express();
// 静态服务器
app.use(express.static(__dirname));
app.listen(8088, () => {
  console.log(`localhost:8088`);
});