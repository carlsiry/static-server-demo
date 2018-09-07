
const http = require('http')
const path = require('path')
const fs = require('fs')
const handlebars = require('handlebars')
const promisify = require('util').promisify

const conf = require('./config/default')
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)

const rootDir = conf.root
const tplPath = path.join(__dirname, './template/dir.tpl')
const source = fs.readFileSync(tplPath, 'utf8')
const template = handlebars.compile(source)

const server = http.createServer(async (req, res) => {
  const url = path.join(rootDir, req.url)
  res.statusCode = 200
  try {
    const status = await stat(url)
    if (status.isFile()) {
      res.setHeader('Content-Type', 'text/plain')
      fs.createReadStream(url).pipe(res)
    } else if(status.isDirectory()) {
      res.setHeader('Content-Type', 'text/html')
      const files = await readdir(url)
      // const dir = path.relative(rootDir, url)
      const data = {
        title: path.basename(url),
        // dir: dir ? '/' + dir : '',
        dir: req.url === '/' ? '' : req.url,
        files,
      }
      res.end(template(data))
    }
  } catch (error) {
    res.statusCode = 404
    res.end('file or directory not found \n' + error)
  }
})

const hostname= conf.hostName
const port = conf.port

server.listen(port, hostname, () => {
  console.info(`server running at http://${hostname}:${port}/`)
})
