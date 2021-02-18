# base image
FROM node:15

# set working directory
WORKDIR /app

COPY package*.json ./

RUN npm install

# add app
COPY . /app

EXPOSE 8080

CMD ["npm", "run", "start"]
