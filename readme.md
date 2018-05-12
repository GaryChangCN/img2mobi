# img2mobi

[中文文档](./readme-zh.md)

Convert image file or images fold to kindle (.mobi) files.

## Usage

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

### Principle

> imgs -> epub -> mobi

### Dev

```bash
git clone git@github.com:GaryChangCN/img2mobi.git
npm install
npm run dev
```

### License
[MIT](.LICENSE)

