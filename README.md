[![Travis Status][trav_img]][trav_site]

Abstract Log
============

An micro log wrapper to implement production shims, loggers, etc.


## Build

Build for production use (NPM, bower, etc).

```
$ npm run build
```

Which is composed of commands to create `dist` UMD bundles (min'ed, non-min'ed)

```
$ npm run build-dist
```

Note that `dist/` files are only updated and committed on **tagged releases**.


## Development

All development tasks consist of watching the demo bundle, the test bundle
and launching a browser pointed to the demo page.

Run the `demo` application with watched rebuilds:

```
$ npm run dev       # dev test/app server (OR)
$ npm run open-dev  # dev servers _and a browser window opens!_
```

From there you can see:

* Demo app: [127.0.0.1:3000](http://127.0.0.1:3000/)
* Client tests: [127.0.0.1:3001/test/client/test.html](http://127.0.0.1:3001/test/client/test.html)

## Quality

### In Development

During development, you are expected to be running either:

```
$ npm run dev
```

to build the lib and test files. With these running, you can run the faster

```
$ npm run check-dev
```

Command. It is comprised of:

```
$ npm run lint
$ npm run test-dev
```

Note that the tests here are not instrumented for code coverage and are thus
more development / debugging friendly.

### Continuous Integration

CI doesn't have source / test file watchers, so has to _build_ the test files
via the commands:

```
$ npm run check     # PhantomJS only
$ npm run check-cov # (OR) PhantomJS w/ coverage
$ npm run check-ci  # (OR) PhantomJS,Firefox + coverage - available on Travis.
```

Which is currently comprised of:

```
$ npm run lint      # AND ...

$ npm run test      # PhantomJS only
$ npm run test-cov  # (OR) PhantomJS w/ coverage
$ npm run test-ci   # (OR) PhantomJS,Firefox + coverage
```

Note that `(test|check)-(cov|ci)` run code coverage and thus the
test code may be harder to debug because it is instrumented.

### Client Tests

The client tests rely on webpack dev server to create and serve the bundle
of the app/test code at: http://127.0.0.1:3001/assets/main.js which is done
with the task `npm run server-test` (part of `npm dev`).

#### Code Coverage

Code coverage reports are outputted to:

```
coverage/
  client/
    BROWSER_STRING/
      lcov-report/index.html  # Viewable web report.
```

## Releases

Built files in `dist/` should **not** be committeed during development or PRs.
Instead we _only_ build and commit them for published, tagged releases. So
the basic workflow is:

* [`npm version`](https://docs.npmjs.com/cli/version): Runs verification,
  builds `dist/` and `lib/` via `scripts` commands.
    * Our scripts also run the applicable `git` commands, so be very careful
      when running out `version` commands.
* [`npm publish`](https://docs.npmjs.com/cli/publish): Uploads to NPM.
    * **NOTE**: We don't _build_ in `prepublish` because of the
      [`npm install` runs `npm prepublish` bug](https://github.com/npm/npm/issues/3059)


**Note - NPM**: To correctly run `preversion`, etc. scripts, please make sure
you have a very modern `npm` binary:

```
$ npm install -g npm
```

In code:

```
# Update version (_probably_ `patch`), rebuild `dist/` and `lib/`.
$ npm version major|minor|patch -m "Version %s - INSERT_REASONS"
# ... the project is now patched and committed to git (but unpushed).

# Check that everything looks good in last commit and push.
$ git diff HEAD^ HEAD
$ git push && git push --tags
# ... the project is now pushed to GitHub and available to `bower`.

# And finally publish to `npm`!
$ npm publish
```

Side note: `npm publish` runs `npm prepublish` under the hood, which does the
build.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md)

[trav_img]: https://api.travis-ci.org/FormidableLabs/abstract-log.svg
[trav_site]: https://travis-ci.org/FormidableLabs/abstract-log

