# postman 指南

### 导入

![](/img/2021-04-12-17-53-40.png)

postman 支持多种导入
- json文件

- 文件夹

- 连接

- curl命令

从浏览器获取curl命令

![](/img/2021-04-12-17-54-58.png)

### 环境
- 创建环境：


![](/img/2021-04-12-18-04-58.png)


- 编辑环境：

![](/img/2021-04-13-09-37-32.png)


- 选择环境：

![](/img/2021-04-13-09-36-53.png)


### collections

- 保存请求的集合
- 作用
    + 用于runner，跑自动化脚本（最小单位）
    + 用于mock，提供mock服务（最小单位）
    + 用于文件导出
    + 请求必须保存在集合中

![](/img/2021-04-13-09-42-54.png)


### request

#### pre-request-script

请求前置脚本

> 请求前，对数据进行处理，常用的是对参数进行加密（对称、非对称、MD5等，需要使用CryptoJS\forgeJS，与nodejs中的用法一致）


+ md5

```javascript

let md5 = CryptoJS.MD5(CryptoJS.enc.Utf8.parse('12345'))

```


+ RSA公钥加密

```javascript

var publicKey = forge.pki.publicKeyFromPem(public_key);

var buffer = forge.util.createBuffer(context, 'utf8');

var bytes = buffer.getBytes();

var pubencryptedText = forge.util.encode64( publicKey.encrypt(bytes, 'RSAES-PKCS1-V1_5', {
    md: forge.md.sha256.create(),
        mgf1: { md: forge.md.sha1.create() }
})

```
注：forgeJS并非postman自带，需要获取到forgetJS内容，使用eval加载函数后才可以使用。其他功能的js也可以这么引入


#### tests

请求后置测试脚本

> 请求后，对数据进行处理，常用的是对响应进行解密、断言、数据存储

+ 解密:用法与加密类似

+ 断言:

post提供了很多断言，主要用于runner自动化脚本

举例：

状态200判断

```javascript

pm.test("状态200", function () {
    pm.response.to.have.status(200);
});

```

内容判断

```javascript

pm.test("成功", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData["access_token"]).to.exist
});

```

+ 数据存储:将数据存储在环境中

存储在当前环境中

```javascript

pm.environment.set("access_token", resultobj.token);

```

存储在全局环境中

```javascript

pm.globals.set("access_token", resultobj.token);

```
+ 其它操作

发请求

```javascript

pm.sendRequest('https://postman-echo.com/get', (error, response) => {
    if (error) {
        console.log(error);
    } else {
        console.log(response);
    }
});

```
cookie

```javascript
// 设置
const jar = pm.cookies.jar();
jar.set("httpbin.org", "session-id", "abc123", (error, cookie) => {
    if (error) {
        console.error(`An error occurred: ${error}`);
    } else {
        console.log(`Cookie saved: ${cookie}`);
    }
});
// 校验（获取）
pm.test("Cookie JSESSIONID is present", () => {
    pm.expect(pm.cookies.has('JSESSIONID')).to.be.true;
});

```
解析xml

```javascript

const responseJson = xml2Json(pm.response.text());

```
解析csv

```javascript

const parse = require('csv-parse/lib/sync');
const responseJson = parse(pm.response.text());

```

解析html

```javascript

const $ = cheerio.load(pm.response.text());
console.log($.html());

```

包含

```javascript

pm.test("Body contains string",() => {
    pm.expect(pm.response.text()).to.include("customer_id");
});

```

类型

```javascript
// json
const schema = {
    "items": {
        "type": "boolean"
    }
};
const data1 = [true, false];
const data2 = [true, 123];
pm.test('Schema is valid', function() {
    pm.expect(tv4.validate(data1, schema)).to.be.true;
    pm.expect(tv4.validate(data2, schema)).to.be.true;
});

// 属性
pm.test("Test data type of the response", () => {
  pm.expect(jsonData).to.be.an("object");
  pm.expect(jsonData.name).to.be.a("string");
  pm.expect(jsonData.age).to.be.a("number");
  pm.expect(jsonData.hobbies).to.be.an("array");
  pm.expect(jsonData.website).to.be.undefined;
  pm.expect(jsonData.email).to.be.null;
});

```

#### 数据获取

> postman可在参数、url中，通过{{变量名}} 的方式获取变量的值


![](/img/2021-04-13-10-16-22.png)

### runner
> 自动化脚本

![](/img/2021-04-13-10-19-54.png)

结果：
![](/img/2021-04-13-10-22-38.png)

### mockserver

> 根据保存的响应结果对外提供mock服务


+ 保存响应

![](/img/2021-04-13-10-25-42.png)

+ 创建mock服务
![](/img/2021-04-13-10-24-52.png)

+ 使用mock服务（登录）

![](/img/2021-04-13-10-26-57.png)


### 脚本
- postman 集成库：

```javascript
ajv // JSON架构验证
atob // base-64 解码
btoa // base-64 编码
chai // JavaScript 数据诊断库（断言）
cheerio // nodejs爬虫模块，在服务器上处理页面dom层（类似于前台的JQuery简化版）
crypto-js // 摘要，加密
csv-parse/lib/sync // csv解析操作
lodash // 封装、简化javascript对数据对象的操作
moment // 解析、校验、操作、显示日期和时间
postman-collection // 对postman的collection进行创建保存等操作
tv4 // JSON架构验证
uuid // 创建uuid
xml2js // xml解析

// 例子：
const csvparse = require('csv-parse/lib/sync');
// cryptoJS直接使用

```

- nodejs 原生库:

```javascript
path // nodejs文件路径计算工具
assert // nodejs断言
buffer // nodejs二进制处理
util // nodejs 内部 API工具类
url // nodejs 处理与解析 URL
punycode // nodejs 处理域名中Unicode 与 ASCII 转换
querystring // nodejs 处理url中参数
string-decoder // nodejs 编码、解码字符串
stream // nodejs 流操作
timers // nodejs 定时器
events // nodejs 事件触发

// 例子：
const path = require('path');

```
