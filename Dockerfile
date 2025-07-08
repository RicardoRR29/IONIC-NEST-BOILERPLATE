FROM node:20
WORKDIR /app
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install
COPY backend .
CMD ["npm","run","start:prod"]
