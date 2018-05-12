const img2mobi = require('../dist').default
const path = require('path')

img2mobi(path.join(__dirname, './images'), './ogogogo.mobi', {
    title: 'my'
})
