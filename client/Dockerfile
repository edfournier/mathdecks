# docker build -t client .
# docker run -d --env-file .env --name client -p 5173:5173 client

FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["node", "start.js"]