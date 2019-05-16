let user = require('./user')

let path = require('path')

let http = require('http')
// console.log(path,__dirname,__filename)
let server = http.createServer((req,res) => {
    res.statusCode = 200
    res.setHeader("Content-Type","text/plain;charset=utf-8")
    res.end("node.js")
})
server.listen(3000,'127.0.0.1',() => {
    console.log('http://127.0.0.1:3000')
})
// console.log(http)
