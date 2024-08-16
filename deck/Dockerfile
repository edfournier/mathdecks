# docker build -t deck .
# docker run -d --env-file .env --name deck -p 3001:3001 deck

FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD [ "node", "server.js" ]