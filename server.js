var path = require('path')
var express = require('express')
var app = express()
var rootDir = __dirname

var indexPath = path.join(rootDir, 'src', 'index.html')
var jsPath = path.join(rootDir, 'build')
var staticPath = path.join(rootDir, 'static')

app.get('/', function (req, res) {
  res.sendFile(indexPath)
})

app.use(express.static(jsPath))
app.use(express.static(staticPath))

app.listen(process.env.PORT || 3000)
