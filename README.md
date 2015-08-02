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


### Usage

Import the `AbstractLog` class into your code (via AMD, CommonJS, etc) and
use as a configurable logger. The basic abstraction is:

```js
var log = new AbstractLog(OPTIONS);

log.METHOD(MESSAGE_STRING, METADATA_OBJECT);  // Abstraction
log.warn("My message", { an: "object" });     // Example
```

The instance of an `AbstractLog` requires an `OPTIONS` object that defines the
actual methods available for the logger.

* **TODO**: Document initialization options.
* **TODO**: Also place options examples in each `AbstractLog(` call...
  https://github.com/FormidableLabs/abstract-log/issues/3

The underlying logger used by the abstraction ideally has:

* `METHOD`: A method like `warn`, `info`, `error` that takes typically two
  arguments.
* `MESSAGE`: A human-readable string, typically the first argument.
* `METADATA`: An structured JS object of metadata that is meant to be outputted
  as a JSON line and hopefully programmatically ingested and used later. The
  ideal use is any aspect of a log message that is a _metric_ like: database
  response time, number of database connections, timestamp, user id, etc.

#### AMD

```js
define(["abstract-log"], function (AbstractLog) {
  var log = new AbstractLog();
  log.info("Hello world!");
});
```

#### CommonJS

```js
var AbstractLog = require("abstract-log");
var log = new AbstractLog();
log.info("Hello world!");
```

#### VanillaJS

In your HTML:

```html
<!-- Option One: Minified -->
<script src="PATH/TO/abstract-log/dist/abstract-log.min.js"></script>

<!-- Option Two: Raw source -->
<script src="PATH/TO/abstract-log/abstract-log.js"></script>
```

In your JS:

```js
var log = new window.AbstractLog();
log.info("Hello world!");
```


### Build Integration

* **TODO**: Document initialization here?
  https://github.com/FormidableLabs/abstract-log/issues/3

* **TODO**: Document shimming.
  https://github.com/FormidableLabs/abstract-log/issues/1

* **TODO**: Document integration with (1) console, (2) bunyan
  https://github.com/FormidableLabs/abstract-log/issues/2


### Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md)

[trav_img]: https://api.travis-ci.org/FormidableLabs/abstract-log.svg
[trav_site]: https://travis-ci.org/FormidableLabs/abstract-log
