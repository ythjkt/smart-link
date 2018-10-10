# Get started
1. Have the following installed
* Docker
* yarn or npm 

2. Install dependencies of the project

Using npm
```bash
# From root directory
# This will install npm packages in server and client directory
npm install
```

Using yarn
```bash
cd client && yarn
cd ../server && yarn
```

3. Build docker images and run
```bash
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
