# docker build -t auth .
# docker run -d --env-file .env --name auth -p 3000:3000 auth

FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "server.js" ]