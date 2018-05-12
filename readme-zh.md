# img2mobi

[English doc](./readme.md)

把图片或者图片转换为 kindle 可以使用的 mobi 格式。

## 使用

```bash
    npm install img2mobi -g
    // and
    img2mobi -i /Downloads/images -o ./aaa.mobi
```

### Api

```js
import img2mobi from 'img2mobi'

img2mobi('./images', './ogogogo.mobi', {
    title: 'my-ebook'
})

// mgPath: string
// outPath: string
// options {
//     title?: string
//     author?: string
//     description?: string
//     rights?: string
//     cover?: string
// }
```

### 原理

> imgs -> epub -> mobi

使用 amazon 提供的 kindlegen 工具把 epub 文件转为 mobi 文件。
因为某些网络原因，国内下载这个工具很慢，所以我把他放到 bin 文件夹下面了。

### 开发

```bash
git clone git@github.com:GaryChangCN/img2mobi.git
npm install
npm run dev
```

### License
[MIT](.LICENSE)

