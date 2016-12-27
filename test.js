const tape = require('tape')
const http = require('http')
const RSS = require('rss')
const Hyperify = require('.')
const hyperfeed = require('hyperfeed')
const openport = require('openport')

var feed = new RSS({
  title: 'test',
  feed_url: 'http://example.com',
  site_url: 'http://example.com'
})
feed.item({
  title: 'foo',
  description: 'foo',
  url: 'foo.com',
  guid: 'foo'
})

var server = http.createServer(function (req, res) {
  res.end(feed.xml())
})
var port
openport.find((_, p) => {
  port = p
  server.listen(p)
})

tape('crawler', function (t) {
  var c = 0
  var hf = hyperfeed().createFeed()
  var crawler = new Hyperify(hf, `http://localhost:${port}`, 2000)
  crawler.on('update', () => {
    if (c === 0) {
      c += 1
      hf.list((err, entries) => {
        t.error(err)
        t.same(entries.length, 1)
        // add a new feed item
        feed.item({
          title: 'bar',
          description: 'bar',
          url: 'foo.com',
          guid: 'bar'
        })
      })
    } else if (c === 1) {
      server.close()
      crawler.stop()
      hf.list((err, entries) => {
        t.error(err)
        t.same(entries.length, 2)
        t.end()
      })
    }
  })
  crawler.on('error', t.error)
})

