FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY . /app

RUN npm run build

EXPOSE 3000

CMD ["node", "build"]