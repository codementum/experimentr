experimentr
========

Experimentr is a backend for web-based visualization studies. 

Experiment modules are defined in `public/modules`.

Once modules are defined, they are loaded in order into the #experimentr div.
This div also contains controls (initially, only a Next button), to control experiment flow.
Eventually, more controls such as Previous and Quit should be added.

Also, sometimes the Next button is not needed, and it should be hidden until some sort of validation is completed.

Experimentr adds three main elements to the page: 

- #experimentr div: to hold the module and controls
- #module div: holds module content
- #control div: holds controls for the modules

Currently, each module must be unique. Module re-use will be added in a later release.

Running the server
--------

Start redis: 

    redis

Run the server:

    npm start

Then access the page at [localhost:8000](http://localhost:8000).

### AppFog
There is a `var host` in public/index.html, public/modalForm.js, and app.js. Switch these if you are running locally or on AppFog.

To access the redis instance on AppFog:

    af tunnel stucco-redis
