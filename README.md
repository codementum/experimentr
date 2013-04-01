Visualization Primitives Backend/User-Study Server
================

This server will host VisPrim and capture demographics and the Creativity-Support Index.

Installation
--------------

    npm install

Running
--------------

    node server.js

Use
--------------

Open a browser to `http://localhost:3000`.


### POST test

Try something like the following: 

    curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"userID":100}' http://localhost:3000

### Adding forms

See `public/forms` for existing forms; add new forms there and call them via `modal('formName.html')`.
