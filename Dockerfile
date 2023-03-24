FROM node:16-bullseye-slim

WORKDIR /app
RUN npm install -g npm

COPY . /app
RUN npm install
RUN npm run build:prod

EXPOSE 4173

CMD ["npm", "run", "preview"]