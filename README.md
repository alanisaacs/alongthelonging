# alongthelonging

This repository contains code for my poetry website, [alongthelonging.com](http://alongthelonging.com). It is linked to my other sites, [exultoshores.com](http://exultoshores.com) and [theflailingbaker.com](http://theflailingbaker.com). 

## Contents

The site is hosted on an Amazon Lightsail instance running an Ubuntu distribution of Linux. The stack looks like this:

- Web server: Apache 2
- Application language: Python 3
    - Main libraries: Flask, SQLAlchemy
- Database: PostgreSQL 10
- Frontend: JavaScript, CSS and HTML (no frameworks)

## Features

- "Aphorisms for the Neurodivergent": the content is contained in a json file which is processed in Python on the server and displayed in the browser with JavaScript. Editing requires updated the json file.
- "Poetic Manifesto": the content is contained in the database and can be updated in the browser (authentication required)
- Other pages are straight html for now