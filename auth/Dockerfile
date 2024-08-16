# docker build -t auth .
# docker run -d --env-file .env --name auth -p 3000:3000 auth

FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g pm2
COPY . .
EXPOSE 3000
CMD ["pm2-runtime", "start", "server.js", "--name", "auth", "-i", "5"]