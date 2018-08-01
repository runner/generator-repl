Tasks generator for REPL
========================

[![build status](https://img.shields.io/travis/runner/generator-repl.svg?style=flat-square)](https://travis-ci.org/runner/generator-repl)
[![npm version](https://img.shields.io/npm/v/@runner/generator-repl.svg?style=flat-square)](https://www.npmjs.com/package/@runner/generator-repl)
[![dependencies status](https://img.shields.io/david/runner/generator-repl.svg?style=flat-square)](https://david-dm.org/runner/generator-repl)
[![devDependencies status](https://img.shields.io/david/dev/runner/generator-repl.svg?style=flat-square)](https://david-dm.org/runner/generator-repl?type=dev)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-blue.svg?style=flat-square)](https://gitter.im/DarkPark/runner)
[![RunKit](https://img.shields.io/badge/RunKit-try-yellow.svg?style=flat-square)](https://npm.runkit.com/@runner/generator-repl)


## Installation ##

```bash
npm install @runner/generator-repl
```


## Usage ##

Add to the scope:

```js
var generator = require('@runner/generator-repl');
```

Generate tasks according to the given config:

```js
var tasks = generator({
    runner: runnerInstance,
    readline: {
        historySize: 200
    }
});
```

Add generated tasks to the `runner` instance:

```js
var runner = require('runner');

Object.assign(runner.tasks, tasks);
```

The following tasks will become available:

 Task name     | Description
---------------|-------------
 `repl:config` | prints the current configuration used for generated tasks
 `repl:start`  | starts repl server
 `repl:stop`   | stops repl server

Generator accepts two arguments: base configuration and additional options.


### Base configuration ###

It's an object with the following properties:

 Name     | Description
----------|-------------
 runner   | existing runner instance
 readline | [options](https://nodejs.org/api/readline.html#readline_readline_createinterface_options) passed to the `readline.createInterface` method 


### Additional options ###

It's an object with the following properties:

 Name   | Description
--------|-------------
 prefix | an affix placed before a task name (default is `repl:`)  
 suffix | a string added at the end of a task name (empty by default)
 
So it's possible to change generated tasks names: 

```js
Object.assign(runner.tasks,
    generator(config, {
        prefix: 'readline:',
        suffix: ':develop'
    })
);
```

It will add the following tasks:

* `readline:config:develop` 
* `readline:start:develop`  
* `readline:stop:develop`  
 

## Contribution ##

If you have any problems or suggestions please open an [issue](https://github.com/runner/generator-repl/issues)
according to the contribution [rules](.github/contributing.md).


## License ##

`@runner/generator-repl` is released under the [GPL-3.0 License](http://opensource.org/licenses/GPL-3.0).
