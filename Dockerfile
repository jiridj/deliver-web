FROM node:16-bullseye-slim

ENV VITE_DELIVER_APP_MODE=dark
ENV VITE_DELIVER_APP_COLORS=dark
ENV VITE_DELIVER_API_URL=http://localhost:3333

WORKDIR /app
RUN npm install -g npm

COPY . /app
RUN npm install
RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]