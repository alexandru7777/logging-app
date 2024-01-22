FROM node:latest as build

WORKDIR /app

# Copy specific packages

COPY package*.json ./

# Add node_modules afterwards

RUN npm install

COPY . .

# Build Application 

RUN npm run build

# Create server application

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Expose ports

EXPOSE 80
EXPOSE 3000
# Start nginx

CMD [ "nginx", "-g", "daemon off;" ]





