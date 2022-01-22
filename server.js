const http = require('http')

const hostname = 'localhost'
const port = 3000

const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
  const errorMsg = (msg) => { 
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/html')
    res.end(`<html><body><h1> ${msg}</h1></body></html>`)
  }
  console.log(`Request for ${req.url} by method ${req.method}`)
  if (req.method === 'GET') {
    let fileUrl = req.url
    if (fileUrl === '/') {
      fileUrl = '/index.html'
    } 

    const filePath = path.resolve('./public' + fileUrl)
    const fileExt = path.extname(filePath)
    
    

    if (fileExt === '.html') {
      fs.access(filePath, err => {
        if (err) {
          errorMsg(`Error 404: ${fileUrl} not an HTML file`)
          return
        }
        res.statusCode = 200
        res.setHeader('Coontent-Type', 'text/html')

        fs.createReadStream(filePath).pipe(res)
      })
    } else {
      errorMsg(`Error 404: ${fileUrl} not an HTML file`)
    }
  } else {
    errorMsg(`Error 404: ${req.method} not supported`)
  }
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})