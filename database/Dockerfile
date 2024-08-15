# docker build -t mongodb .
# docker run -d --name mongodb -p 27017:27017 mongodb
# docker stop mongodb
# docker rm mongodb

FROM mongo:latest
ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=password
COPY init.js /docker-entrypoint-initdb.d/
EXPOSE 27017
CMD ["mongod"]