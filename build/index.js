const fs = require('fs')
const path=require('path');
var projectDir=path.join(__dirname,'../');
function replaceTmpParamter(htmlStr,name,value) {
  return htmlStr.replace(new RegExp(`<\\%\\=\\s*${name}\\s*\\%>`,'g'),value)
}

function readTemplate(path) {
  const templatePath = path.join(projectDir,path)
  return fs.readFileSync(templatePath).toString()
}

function buildStyle(style) {
  
}

function buildMeta() {
  
}

function buildJS() {
  
}

function exportHtml(htmlStr,outdir){
  const outPath = path.join(projectDir,outdir)
  fs.writeFileSync(outPath, htmlStr)
}

module.exports=function buildTemplate(config = {}) {
  
}