FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package.json
RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/server ./server
COPY --from=build /app/src/data ./src/data
COPY package.json package.json

ENV PORT=80
ENV CONTENT_DATA_DIR=/app/data
ENV NODE_ENV=production

VOLUME ["/app/data"]
EXPOSE 80

CMD ["npm", "start"]
