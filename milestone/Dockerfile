# docker build -t milestone .
# docker run -d -v --env-file .env --name milestone -p 3002:3002 milestone

FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3002
CMD ["node", "server.js"]