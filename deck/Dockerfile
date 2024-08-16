# docker build -t deck .
# docker run -d --env-file .env --name deck -p 3001:3001 deck

FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g pm2
COPY . .
EXPOSE 3001
CMD ["pm2-runtime", "start", "server.js", "--name", "deck", "-i", "5"]