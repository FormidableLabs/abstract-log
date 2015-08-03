module.exports = function () {
  return "TODO: IMPLEMENT";
};

/*

  var noop = function () {};

  module.exports = function AbstractLog(opts) {
    // Set member variables.
    opts = opts || {};
    this._instance = opts.instance || null;
    this._fallback = opts.fallback || null;

    // Locals.
    var i;

    // Patch in log levels.
    var levels = opts.levels || [];
    for (i = 0; i < levels; i++) {
      this[levels[i]] = AbstractLog.prototype._createLogMeth(levels[i]);
    }

    // Set fallback.
    if (this._fallback) {
      // TODO HANDLE FALLBACK...
    }

    // Patch in shims.
    var shims = opts.shims || [];
    for (i = 0; i < shims; i++) {
      // If we don't _already_ have a level, patch the fallback or noop.
      if (!this[shims[i]]) {
        this[shims[i]] = noop;
      }
    }
  }

  AbstractLog.prototype._createLogMeth = function (level) {
    var instance = this._instance;

    // TODO HANDLE FALLBACK...
    // Noop non-existent levels or instance.
    if (!instance) { return noop; }
    if (!this._fallback) { return noop; }
    if (!(instance && instance[level] && instance[level].apply)) { return noop; }

    // Create a new function correctly bound to the logging instance.
    return function () {
      return instance[level].apply(instance, arguments);
    }
  };

  AbstractLog.setGlobal = function setGlobal(opts) {
    AbstractLog._global = new AbstractLog(opts);
  };

  AbstractLog.setGlobal();


  Usage
  -----

  var leveled = new AbstractLog({
    levels: "debug,warn,info,error".split(",")
  });

  var cons = new AbstractLog({
    instance: console,
    fallback: "log",
    maps: { fatal: "error" }
  });


  Fallback
  --------

  Levels
  -----

  Maps
  --------

  ## Bunyan

  https://github.com/trentm/node-bunyan/blob/master/lib/bunyan.js#L208-L228

  var levelFromName = {
    'trace': TRACE,
    'debug': DEBUG,
    'info': INFO,
    'warn': WARN,
    'error': ERROR,
    'fatal': FATAL
  };

  ## Console

  https://developer.mozilla.org/en-US/docs/Web/API/Console

  ... the basic support in IE8

  debug // fallback log.
  log
  info
  warn
  error

  ## Core

  ISSUE: Have a default?

  debug
  info
  warn
  error

  Logger
  ------

 */
