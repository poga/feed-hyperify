const request = require('request')
const events = require('events')
const inherits = require('inherits')

module.exports = Hyperify

function Hyperify (feed, url, interval) {
  events.EventEmitter.call(this)
  var self = this
  request(url, (err, resp, body) => {
    if (err) return error(err)

    feed.update(body).then(updated)
  })

  if (interval) {
    self.timer = setInterval(() => {
      request(url, (err, resp, body) => {
        if (err) return error(err)

        feed.update(body).then(updated)
      })
    }, interval)
  }

  function error (err) {
    self.emit('error', err)
  }

  function updated () {
    self.emit('update')
  }
}

Hyperify.prototype.stop = function () {
  clearInterval(this.timer)
}

inherits(Hyperify, events.EventEmitter)
