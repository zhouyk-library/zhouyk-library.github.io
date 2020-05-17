# vscode编辑Markdown时的贴图工具

#### 安装vscode 插件 Paste Image

![](/img/2020-05-17-17-11-13.png)


#### 在工作空间中设置

- 项目中创建.vscode/settings.json,粘贴下面json

```json
{
  "pasteImage.basePath": "${projectRoot}",
  "pasteImage.path": "${projectRoot}/img",
  "pasteImage.prefix": "/"
}
```
#### 用法
- 截图后，在vscode中Ctrl+Alt+V

#### 成果
![](/img/2020-05-17-17-15-53.png)
