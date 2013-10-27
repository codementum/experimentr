experimentr
========

Experimentr is a hosting/data-collection backend and module-based frontend for web-based visualization studies. 

This repo is a working experiment. The best way to get started is to copy this repo and edit it for your experiment.

__Disclaimer: experimentr is still under development and sparsely documented. If you get stuck, contact me via email or file an issue.__

Experimentr.js
-------

Experimentr.js is a front-end framework for experiments.

Experiment stages are defined in modules. 
Modules consist of a small amount of HTML and Javascript and correspond to one stage of the experiment (such as a post-test). 
Experimentr.js also contains several helper functions for experiments, such as timing. 
[Check the source](https://github.com/codementum/experimentr/blob/master/public/experimentr.js) for more.

Once experimentr.js loads, it creates a div in `<body>`: `<div id="experimentr">`. 
Experimentr then adds three elements to the page: 

- #experimentr div: to hold the module and controls
- #module div: holds module content
- #control div: holds controls for the modules

(Eventually, more controls such as Previous and Quit will be added).

Modules
-------
Experiment modules are defined in `public/modules`. 
Here is [an example questionnaire module](https://github.com/codementum/experimentr/blob/master/public/modules/post-test.html).

Modules will be loaded in order using the experimentr.sequence() function:

    experimentr.sequence([
      'modules/consent.html', 
      'modules/pre-test.html', 
      'modules/prime.html', 
      'modules/post-test.html', 
      'modules/debrief.html'
    ]).start();

In some modules the Next button is not needed, so it can be hidden and shown via `experimentr.hideNext()` and `experimentr.showNext()`.

Currently, each module must be unique and cannot be loaded twice in experimentr.sequence(). 
For example, if you use the same questionnaire as a pre-test and post-test, the same questionnaire HTML must appear in two files (but slightly modified, see [preSAM.html](https://github.com/codementum/experimentr/blob/master/public/modules/preSam.html) and [postSAM.html](https://github.com/codementum/experimentr/blob/master/public/modules/postSam.html)).
Module re-use will be added in a later release.

Running the server
--------

Start redis: 

    redis-server redis.conf

Run the server:

    node app.js

Then access the page at [localhost:8000](http://localhost:8000).

Installation
-------

- Node.js: https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager#ubuntu-mint
- redis-server: http://redis.io/download
- clone this repo
- cd to this repo and run `npm install`

Testing experiments
-------

Use `debug` as your workerId when testing experiments, so you can filter out your data later.
