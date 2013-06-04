experimentr
========

Experimentr is a backend for web-based visualization studies. 

Experiment modules are defined in `public/modules`.

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
