var AbstractLog = require("../lib/index");
var log = new AbstractLog({
  instance: console,
  shims: "debug,warn,info,error".split(",")
});

/*eslint-disable no-console*/
log.warn("TODO HI");
/*eslint-enable no-console*/

/* TODO: Demos!
   https://github.com/FormidableLabs/abstract-log/issues/4

  - Input box for message
  - Select for instance

  - `new AbstractLog({ shims: ["info", "error", "foo"] })`
  - `new AbstractLog({ logger: console })` (And note ie9- wonkiness)
  - `new AbstractLog({ logger: console, map: { fatal: "error" }})`
  - `new AbstractLog({ logger: SimpleConsole })`
  - `new AbstractLog({ logger: bunyanInstance })`


  victory-line/logger.js
  ----------------------
  module.exports = new AbstractLog( { shims: ["warn"] });

  MY_APP_SERVER/config.js
  ----------------
  AbstractLog.setGlobal({
    instance: bunyanLogger,
    map: { warn: "warning" }
  });

 */
