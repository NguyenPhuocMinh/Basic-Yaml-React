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
#Server
HOST=0.0.0.0
PORT=7979
CONTEXT_PATH=/rest/api

#Mongoose
MONGO_HOST=localhost if use docker then change localhost to YourIpAddress
MONGO_PORT=27017
MONGO_DATABASE=DATABASE_NAME

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