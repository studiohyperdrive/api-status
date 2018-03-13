# Status module

This middleware exposes a status-endpoint to check the status. This returns the (git) version, mongodb, postgres and redis status. Mongoose, Sequelize and RedisClient are optional.

## Example result

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

## Usage

### Basic usage

```js
// Create your app
const app = require('express')();

// Setup the status route
require('@studiohyperdrive/status')(app);

```

### Adding custom path

```js
// Create your app
const app = require('express')();

// Setup the status route
require('@studiohyperdrive/status')(app, {,
  path: ['/myCustomStatusEndpoint']
});

```

### Adding Service: Redis

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

### Adding Service: PostgreSQL

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

### Adding Service: MongoDB

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