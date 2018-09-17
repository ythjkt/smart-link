# Get started
1. Install the following
* Docker
* yarn or npm 

2. Install dependencies of the project

Using yarn
```bash
cd client && yarn
cd ../server && yarn
```

Using npm
```bash
cd client && npm install
cd ../server && npm install
```

3. Build docker images and run
```bash
# Back to root of the project
cd ..

# Build docker images
docker-compose build

# Start docker containers: mongo, server, client
docker-compose up
```

# Memo
## To bash into a running container
1. docker ps
2. docker exec -ti CONTAINER_ID bash

## Client Side
