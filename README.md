# @studiohyperdrive/status #

This middleware exposes a status-endpoint to check the status. This returns the (git) version, mongodb, postgres and redis status. Mongoose, Sequelize and RedisClient are optional.

# Table of contents #

* [Setup](#setup) 
  * [System Dependencies](#system-dependencies)
  * [Usage](#usage)
* [Result](#result)
* [Code Contribution](#code-contribution)
  * [Guidelines](#guidelines)
  * [Branches](#branches)
  * [Codebase](#codebase)
    * [Structure](#structure)
    * [NPM Scripts](#npm-scripts)

## Setup ##

### System Dependencies ###

this package works from NodeJS 4 and up.

### Usage ###

#### Basic usage ####

```js
// Create your app
const app = require('express')();

// Setup the status route
require('@studiohyperdrive/status')(app);

```

#### Adding custom path ####

```js
// Create your app
const app = require('express')();

// Setup the status route
require('@studiohyperdrive/status')(app, {,
  path: ['/myCustomStatusEndpoint']
});

```

#### Adding Service: Redis ####

```js
const config = require('./config');
const redis = require('redis');

// Create your app
const app = require('express')();

// Setup your database

const redisClient = redis.createClient(config.redis.port, config.redis.host, { socket_keepalive: true });

// Setup the status route
require('@studiohyperdrive/status')(app, {
  globalSuccessBasedOnServices: true
  redisClient
});

```

#### Adding Service: PostgreSQL ####

```js
const config = require('./config');
const Sequelize = require('sequelize');

// Create your app
const app = require('express')();

// Setup your database
const sequelize = new Sequelize(config.db.dbname, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: 'postgres',
});

// Setup the status route
require('@studiohyperdrive/status')(app, {
  globalSuccessBasedOnServices: true
  sequelize
});

```

#### Adding Service: MongoDB ####

```js
const config = require('./config');
const mongoose = require('mongoose');

// Create your app
const app = require('express')();

// Setup your database

mongoose.connect(config.db.host);

// Setup the status route
require('@studiohyperdrive/status')(app, {
  globalSuccessBasedOnServices: true
  mongoose
});

```

## Result ##

This package exposes a status route in your API. if you navigate towards https://myproject.com/status (while replacing the domain with your own url) you will see a similar json output like the one below:

```json
{
  "name": "myApplication",
  "version":"v1.5.2",
  "success":true,
  "services":[{
    "name":"MongoDB",
    "online":true
  },{
    "name":"Redis",
    "online":true
  }]
}
```

## Code Contribution ##

### Guidelines ###

yoloswag? whatever?

### Branches ###

We follow these naming conventions:

* **master**: Production-ready code.
* **release/***: Snapshot of a release. To be started from te master branch and merged back into the master branch via a Pull Request.
* **feature/***: For developing new features, to be started from master branch and merged via PR into a release branch.
* **bugfix/***: For bugs that are logged during testing, to be PRed to a release branch.

### Codebase ###

#### Structure ####

* **lib/**: Contains the NodeJS module business logic.

#### NPM Scripts ####

| Command       | Description                                 |
| ------------- | ------------------------------------------- |
| start         | Install dependencies.                       |
| clean         | Remove the coverage folder.                 |
| lint          | Run all the lint tasks                      |
| lint:eslint   | Run eslint                                  |
| test          | Run tests                                   |

All commands are executable by running `npm run [COMMAND-NAME]`.
