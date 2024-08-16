# docker build -t milestone .
# docker run -d -v --env-file .env --name milestone -p 3002:3002 milestone

FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g pm2
COPY . .
EXPOSE 3002
CMD ["pm2-runtime", "start", "server.js", "--name", "milestone", "-i", "5"]