FROM node:alpine
ENV NODE_ENV=development

# Create app directory
WORKDIR /usr/src/app

RUN apk update && apk add bash
RUN apk --no-cache add curl

# Install app dependencies
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 9000

RUN ["chmod", "+x", "/usr/src/app/entrypoint.sh"]

ENTRYPOINT /usr/src/app/entrypoint.sh
