FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./backend ./backend

CMD ["node", "backend/server.js"]