# @studiohyperdrive/status #

This middleware exposes a status-endpoint to check the status. This returns the (git) version, mongodb, postgres and redis status. Mongoose, Sequelize and RedisClient are optional.

# Table of contents #

* [Setup](#setup)
  * [System Dependencies](#system-dependencies)
  * [Output](#output)
  * [Usage](#usage)
* [Codebase](#codebase)
  * [Structure](#structure)
  * [NPM Scripts](#npm-scripts)
* [Code Contribution](#code-contribution)
  * [Guidelines](#guidelines)
  * [Branches](#branches)
* [Project Context](#project-context)
  * [Details](#details)
  * [Team](#team)

## Setup ##

### System Dependencies ###

* E.g. [Node 6.10.2](https://nodejs.org/en/)

### Output ###

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

## Codebase ##

### Structure ###

* **lib/**: Contains the NodeJS module business logic.

### External Services ###

This project does not implement any external services

### NPM Scripts ###

| Command       | Description                                 |
| ------------- | ------------------------------------------- |
| start         | Install dependencies.                       |
| clean         | Remove the coverage folder.                 |
| lint          | Run all the lint tasks                      |
| lint:eslint   | Run eslint                                  |
| test          | Run tests                                   |

All commands are executable by running `npm run [COMMAND-NAME]`.

## Code Contribution ##

### Guidelines ###

yoloswag? whatever?

### Branches ###

We follow these naming conventions:

* **master**: Production-ready code.
* **release/***: Snapshot of a release.
* **feature/***: For developing new features, to be PRed to a release branch.
* **bugfix/***: For bugs that are logged during testing, to be PRed to a release branch.

## Project Context ##

This project is a Studio Hyperdrive team effort.

### Details ###

* **Client**: Studio Hyperdrive
* **Start**: 12/03/2018
