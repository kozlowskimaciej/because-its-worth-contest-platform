FROM node:14-alpine

WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENV PORT=2137
ENV HOST=0.0.0.0
EXPOSE 2137
CMD ["npm", "start"]