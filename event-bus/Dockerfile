# docker build -t event-bus .
# docker run -d --env-file .env --name event-bus -p 4000:4000 event-bus

FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g pm2
COPY . .
EXPOSE 4000
CMD ["pm2-runtime", "start", "server.js", "--name", "event-bus", "-i", "1"]