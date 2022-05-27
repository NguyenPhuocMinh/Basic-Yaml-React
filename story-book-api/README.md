## Building story book api node js

## Structure
```
.
├── README.md
├── config
│   ├── data
│   │   ├── enablePaths.js
│   │   ├── errorCodes.js
│   │   ├── permissions.js
│   │   ├── protectedPaths.js
│   │   ├── publicPaths.js
│   │   └── secret.js
│   └── dev
│       └── sandbox.js
├── Dockerfile
├── docker-compose.yml
├── package-lock.json
├── package.json
├── server.js
├── src
│   ├── mappings
│   │   └── router
│   └── services
└── ...
```

#### Step 1: install
```sh
  - cd story-book-api and npm install
```

#### Step 2: add .env file
```bash

NODE_ENV=development
#Server
SERVER_HOST=localhost
SERVER_PORT=7979
CONTEXT_PATH=/rest/api/v1
DOCS_PATH=/api-docs
CLIENT_UI_PATH=http://localhost:4000
#SECRET
SESSION_SECRET=***
TOKEN_SECRET=***
REFRESH_TOKEN_SECRET=***

keyManager.json
privateKey=***
publicKey=***


#Mongoose
MONGO_HOST=localhost if use docker then change localhost to YourIpAddress
MONGO_PORT=27017
MONGO_DATABASE=DATABASE_NAME
MONGO_USER=USER_NAME
MONGO_PASSWORD=PASSWORD

#REDIS
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

#GRAPHQL
GRAPHQL_PATH=/graphql

#CONSUL_INIT
CONSUL_HOST=IP adress
CONSUL_PORT=8500

#CONSUL_REGISTER
SERVICE_ID=story-book-service
SERVICE_NAME=story-book-service

#KONG ADMIN
KONG_PORT=8001
```
#### Step 3: run server
```bash
  - npm start or node server.js
```

### Docs Api Using Swagger
  - http://localhost:7979/api-docs