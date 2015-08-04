
// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------
var NOOP = function () {};
var DEFAULT_SHIMS = "debug,warn,info,error".split(","); // TODO: MAKE DEFAULT
var hasOwn = Object.prototype.hasOwnProperty;

// ----------------------------------------------------------------------------
// Abstract Log
// ----------------------------------------------------------------------------
/**
 * Create an abstract logger instance.
 *
 * @param {Object}        opts          Options object.
 * @param {Object}        opts.instance Logging instance.
 * @param {Array<String>} opts.shims    List of method names to shim.
 * @param {Object}        opts.map      Map of shim name to log instance name.
 * @param {String}        opts.fallback Method name for default / no match.
 */
function AbstractLog(opts) {
  // Locals
  var globalLog = this._global || {}; // TODO BUG: AbstractLog.getGlobal()
  var i;

  // Set member variables.
  opts = opts || {};
  this._instance = opts.instance || null;
  this._fallback = opts.fallback || null;
  this._shims = opts.shims || [];
  this._map = opts.map || {};

  // Iterate maps and attach.
  var globalMapKeys = this._attachMapMeths(globalLog._map);
  var mapKeys = this._attachMapMeths(this._map);

  // Shims include instance/global shims **and** mapped levels.
  var shims = this._shims.concat(globalLog._shims, mapKeys, globalMapKeys);

  // Iterate shims and attach to log object.
  for (i = 0; i < shims.length; i++) {
    if (!this[shims[i]]) {
      this[shims[i]] = this._createLogMeth(shims[i]);
    }
  }
}

/**
 * Attach mapped-level methods and return all keys.
 *
 * @api private
 */
AbstractLog.prototype._attachMapMeths = function (map) {
  var keys = [];

  // for `{ foo: "bar" }` we want to attach a method `foo` to the logger
  // and point it to `underlyingLogger.bar`.
  for (var key in map) {
    if (hasOwn.call(map, key)) {
      // Stash key.
      keys.push(key);

      // Attach as `abstractLog.foo = underlyingLogger.bar` if unset.
      if (!this[key]) {
        this[key] = this._createLogMeth(map[key]);
      }
    }
  }

  return keys;
};

/**
 * Create a logger method.
 *
 * Used to attach log methods to `AbstractLog` instance object.
 *
 * @param   {String}    level   Name of level log method.
 * @returns {Function}          Logger method.
 * @api private
 */
AbstractLog.prototype._createLogMeth = function (level) {
  var instance = this._instance;
  var fallback = this._fallback;

  // Noop non-existent instance.
  if (!instance) { return NOOP; }

  // Check if non-existent level.
  if (!(instance[level] && instance[level].apply)) {
    // Noop if no fallback or the fallback is a nonexistent level too.
    if (!fallback || !(fallback[level] && fallback[level].apply)) {
      return NOOP;
    }

    // Set level to fallback, which have confirmed we _have_.
    level = fallback;
  }

  // Create a new function correctly bound to the logging instance.
  return function () {
    return instance[level].apply(instance, arguments);
  }
};

// ----------------------------------------------------------------------------
// Global handler.
// ----------------------------------------------------------------------------
/**
 * Get or create global log instance.
 *
 * Returns current global log singleton or creates a default one.
 *
 * @api private
 */
AbstractLog.getGlobal = function getGlobal() {
  return this._global || this.setGlobal();
};

/**
 * Set global overrides / behavior for the logger.
 *
 * The global logger overrides the existing behavior for logging instances,
 * meaning if a global condition and a local option collide, the global one
 * generally wins.
 *
 * **Note**: Calls to `setGlobal` should come _before_ instantiating
 * `AbstractLog` instances so that stateful behavior in the constructor
 * correctly picks up global behavior.
 *
 * @param {Object}        opts          Options object.
 * @param {Object}        opts.instance Logging instance.
 * @param {Array<String>} opts.shims    List of method names to shim.
 * @param {Object}        opts.map      Map of shim name to log instance name.
 * @param {String}        opts.fallback Method name for default / no match.
 * @returns {Object}                    Global `AbstractLog` instance.
 */
AbstractLog.setGlobal = function setGlobal(opts) {
  return (this._global = new AbstractLog(opts));
};

// Export.
module.exports = AbstractLog;

/*

  TODO: Incorporate maps in documentation.

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
