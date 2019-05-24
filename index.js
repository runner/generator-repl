/**
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

const
    name = 'repl',
    log  = require('runner-logger').wrap(name);


function start ( config, done ) {
    const
        readline = require('readline'),
        instance = readline.createInterface(config.readline);

    //readline.setPrompt(config.readline.prompt);

    instance.on('line', function ( line ) {
        if ( line ) {
            // silent mode for future
            //readline.moveCursor(process.stdout, 0, -1);
            //readline.clearLine();

            config.runner.run(line);
        }
    });

    instance.on('close', function () {
        done();
    });

    // ctrl+c
    instance.on('SIGINT', function onSIGINT () {
        /* eslint-disable no-process-exit */
        process.exit(0);
    });

    return instance;
}


function stop ( instance ) {
    if ( instance ) {
        instance.close();
    }
}


function generator ( config = {}, options = {} ) {
    const tasks = {};

    let instance;

    // sanitize and extend defaults
    config = Object.assign({
        readline: {
            input: process.stdin,
            output: process.stdout,
            prompt: '',
            historySize: 100,
            removeHistoryDuplicates: true,
            completer: function ( line ) {
                const
                    taskList = Object.keys(config.runner.tasks).sort(),
                    hits = taskList.filter(function ( task ) {
                        return task.startsWith(line);
                    });

                // show all completions if none found
                return [hits.length ? hits : taskList, line];
            }
        }
    }, config);

    // sanitize and extend defaults
    options = Object.assign({}, {
        prefix: name + ':',
        suffix: ''
    }, options);

    tasks[options.prefix + 'config' + options.suffix] = function () {
        log.inspect(config, log);
    };

    tasks[options.prefix + 'start' + options.suffix] = function ( done ) {
        instance = start(config, done);
    };

    tasks[options.prefix + 'stop' + options.suffix] = function () {
        stop(instance);
        instance = null;
    };

    return tasks;
}


// export main actions
generator.methods = {
    start: start,
    stop: stop
};


// public
module.exports = generator;
