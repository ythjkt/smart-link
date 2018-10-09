FROM node:8

# Create directory for node app
# and make it working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g nodemon

# This dose not expose
# This indicates which port this image is supposed to expose
EXPOSE 3000

CMD [ "npm", "start" ]