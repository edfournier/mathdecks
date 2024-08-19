# Overview
Mathdecks is a full-stack web application allowing users to create and share study aids with native support for LaTeX-style markup. The site was built with Node, Express, Svelte, and MongoDB, and is containerized using Docker and Docker Compose for seamless deployment. 

# Learning Goals
I set out to create Mathdecks to deepen my understanding of:
1. Scalable microservice architectures
2. Containerization and orchestration of Node applications with Docker and Docker Compose
3. The implementation of authentication servers using JWTs

# Deployment
Configure each service's `.env` file. Then, at the project's root, run:
```sh
docker-compose up --build -d
```
