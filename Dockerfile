FROM node:15-slim
WORKDIR /app
COPY package*.json /app
RUN npm ci
COPY src/ src/
EXPOSE 3000
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
CMD /wait && npm start