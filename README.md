# feed-hyperify

[![NPM Version](https://img.shields.io/npm/v/feed-hyperify.svg)](https://www.npmjs.com/package/feed-hyperify) [![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

a crawler to convert RSS/ATOM feed to [hyperfeed](https://github.com/poga/hyperfeed)

`npm i feed-hyperify`

## Usage

```js
var Hyperify = require('feed-hyperify')
var hf = hyperfeed().createFeed()
var crawler = new Hyperify(hf, 'RSS_URL', 'crawl_interval')

crawler.on('update', cb)
crawler.on('error', cb(err))

crawler.stop()
```

## License

The MIT License

