FROM node:alpine3.11 as build

ARG API_URL="apiUrl: 'http://localhost:5001/'"

WORKDIR /usr/src/server
COPY . .
RUN npm install && \
    sed -i -e "/apiUrl:/c\\${API_URL}" \
      ./src/environments/environment.ts && \
    npm run build --prod  && \
    cd dist && \
    mv $(ls -d */|head -n 1) /app


FROM nginx:1.21-alpine
EXPOSE 4200
COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app /usr/share/nginx/html/app
