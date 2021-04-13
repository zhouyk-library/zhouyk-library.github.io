const fs = require("fs")
const path = require("path")
const express = require('express')
const args = process.argv.splice(2)
const isBuild = args.includes('build') || args.length === 0;
const isServer = args.includes('server')
const modulesPath = "./modules"
const configFileName = "config"

function parseConfigJSON(i18nModules, paths) {
  const configPath = paths + "/" + configFileName
  var config = parseConfigPath(i18nModules, paths);
  config.forEach(item => {
    if (item.isP) {
      item.child = parseConfigJSON(i18nModules, paths + "/" + item.key)
    } else {
      item.child = []
      item.path = paths.substring(1, paths.length) + "/" + item.key
    }
  })
  return config;
};

function parseConfigPath(i18nModules, dirPath) {
  const config = []
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach(function(file) {
      var curPath = dirPath + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        config.push({
          "key": file,
          "name": i18nModules[file] || file,
          "isP": true
        })
      } else {
        const type = getFileType(file)
        var title = '--'
        if ('md' === type) {
          const text = fs.readFileSync(curPath).toString()
          var startIndex = text.indexOf('# ');
          if (startIndex > -1) {
            var context = text.substring(startIndex + 2, text.length);
            var index = context.indexOf('\n');
            index = index === -1 ? 0 : index
            title = context.substring(0, index);
          }
        }
        if ('html' === type) {
          const text = fs.readFileSync(curPath).toString()
          var startIndex = text.indexOf('<!-- ');
          var endIndex = text.indexOf(' -->');
          if (startIndex > -1) {
            title = text.substring(startIndex + 5, endIndex) || '--';
          }
        }
        config.push({
          "key": file,
          "name": title,
          "type": type
        })
      }
    })
  }
  return config;
};

function getFileType(filepath) {
  if (filepath.indexOf('.md') > -1) {
    return 'md'
  }
  if (filepath.indexOf('.html') > -1) {
    return 'html'
  }
}

function writeJSON(jsonPath, jsonstr) {
  fs.writeFile(jsonPath, jsonstr, function(err) {
    if (err) {
      console.error(err);
    } else {
      console.log('构建成功!');
    }
  });
}
if (isBuild || isServer) {
  var i18nModules = {}
  const modulespath = path.join(__dirname, 'i18n')
  if (fs.existsSync(modulespath)) {
    fs.readdirSync(modulespath).forEach(function(file) {
      const module = require(modulespath + '/' + file)
      i18nModules = { ...i18nModules, ...module }
    })
  }
  const config = parseConfigJSON(i18nModules, modulesPath);
  writeJSON('./js/config.js', "window.treeMenue=" + JSON.stringify(config))
}

if (isServer) {
  const app = express();
  // 静态服务器
  app.use(express.static(__dirname));
  app.listen(8088, () => {
    console.log('localhost:8088');
  });
}