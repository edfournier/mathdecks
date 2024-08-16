# docker build -t client .
# docker run -d --env-file .env --name client -p 5173:5173 client

FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g pm2
COPY . .
EXPOSE 5173
CMD ["pm2-runtime", "start", "start.js", "--name", "client", "-i", "1"]