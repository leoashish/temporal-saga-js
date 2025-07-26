FROM node:20

WORKDIR /usr/src

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Default command (can be overridden by docker-compose)
CMD ["npm", "start"]