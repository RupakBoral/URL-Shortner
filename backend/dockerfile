FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g pm2

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["pm2-runtime", "dist/index.js", "--name", "clipURL"]

