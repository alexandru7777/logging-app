FROM node:latest

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's code
COPY . .

# Your application's default port
EXPOSE 5000

# Command to run your application
CMD ["node", "app.js"]