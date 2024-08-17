# docker build -t event-bus .
# docker run -d --env-file .env --name event-bus -p 4000:4000 event-bus

FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["node", "server.js"]