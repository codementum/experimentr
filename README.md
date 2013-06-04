stucco Bookmarklet
========

Running the server
--------

Start redis: 

    redis

Run the server as root:

    sudo node server.js

Then access the bookmarklet page at [localhost](http://localhost).

### AppFog
There is a `var host` in public/index.html, public/modalForm.js, and app.js. Switch these if you are running locally or on AppFog.

To access the redis instance on AppFog:

    af tunnel stucco-redis

### ssl keys

Note, the server will not work with https pages unless you have server.crt, server.csr, and server.key in the ssl/ directory.
See ssl/readme.md for info on how to generate these keys.

Data collected
--------

All submissions from the bookmarklet contains the following variables:

- url: the page you were looking at when you launched the bookmarklet
- relevance (1-5): how relevant the page's security information is to your network
- concept: the security concept (e.g. attacker, malware) involved
- credibility (1-5): how credible the source is (in your opinion)
- userid: an md5 hash of your email (created when you install the bookmarklet)
- postId: a unique id for each submission
