[![Travis Status][trav_img]][trav_site]

Abstract Log
============

An micro log wrapper to implement production shims, loggers, etc.

The primary use case for this wrapper is for a project that needs to do _some_
logging but doesn't want to take dependencies on a specific logger (like
Bunyan, Winston, Good, etc.) or assume use in a specific environment (browser,
Node.js, etc.). And it is easily configured as a straight shim to do nothing
in the most lightweight manner possible.

### Installation

Install via [npm](https://www.npmjs.com/package/abstract-log):

```
$ npm install abstract-log
```

or [bower](http://bower.io/search/?q=abstract-log):

```
$ bower install abstract-log
```


### Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md)

[trav_img]: https://api.travis-ci.org/FormidableLabs/abstract-log.svg
[trav_site]: https://travis-ci.org/FormidableLabs/abstract-log
