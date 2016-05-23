<img src="https://raw.github.com/codementum/experimentr/master/experimentr-logo.png" title="Experimentr" alt="Experimentr" />
========

Experimentr is a hosting/data-collection backend and module-based frontend for web-based visualization studies.

This repo is a working experiment. The best way to get started is to copy this repo and edit it for your experiment.

Experimentr.js
-------

Experimentr.js is a front-end framework for experiments.

Experiment stages are defined in modules.
Modules consist of a small amount of HTML and Javascript and correspond to one stage of the experiment (such as a post-test).

Experimentr.js also contains several helper functions for experiments, such as timing.
[Check the source](https://github.com/codementum/experimentr/blob/master/public/experimentr.js) for more.

Modules
-------
Experiment modules are defined in `public/modules`.
Here is [an example questionnaire module](https://github.com/codementum/experimentr/blob/master/public/modules/nasa-tlx/).

Modules will be loaded in order using the `experimentr.sequence()` function:

    experimentr.sequence([
      'modules/consent',
      'modules/self-assessment-manikin',
      'modules/emotion-prime-story',
      'modules/demographics',
      'modules/nasa-tlx'
    ]).start();

In some modules the Next button is not needed, so it can be hidden and shown via `experimentr.hideNext()` and `experimentr.showNext()`.

Each module must be unique and cannot be loaded twice in experimentr.sequence().
For example, if you use the same questionnaire as a pre-test and post-test, the same questionnaire HTML must appear in two uniquely named files. 

For example modules, please see [public/modules/](https://github.com/codementum/experimentr/blob/master/public/modules/). 

How Experimentr Works
---
Once experimentr.js loads, it creates a div in `<body>`: `<div id="experimentr">`.
Experimentr then adds three elements to the page:

- ``#experimentr` div: to hold the module and controls
- ``#module` div: holds module content
- ``#control` div: holds controls for the modules

Running the server
--------

Start redis:

    redis-server redis.conf

Run the server:

    node app.js

Then access the page at [localhost:8000](http://localhost:8000).

Installation
-------
## Before-Clone Installation Dependencies:
### Node.js
To find installation instructions for your operating system (Linux, OSX, and Windows), please visit https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager
### Redis
**Note:** Redis is _not_ installed through `npm install` and must be installed separately.
Redis can be manually downloaded at redis.io/download. Please note that Windows is not directly supported, however there is an experimental Windows port maintained by Microsoft. If you are on OSX and have `brew` installed, you can install Redis with the following: `brew install redis`.

## Clone and Post-Clone Installation:
- clone this repo
- cd to this repo and run `npm install`

Testing experiments
-------

You can use `debug` as your workerId when testing live experiments to help make sure your data doesn't end up the experiment data.
See [convert.js](https://github.com/codementum/experimentr/blob/master/analysis/src/convert.js#L24) for details.

Another useful trick is to empty the redis database. To do so, run `redis-cli` to get the redis command line prompt, then type `FLUSHDB` to delete all current keys.

More redis commands can be found at [http://redis.io/commands](http://redis.io/commands).
