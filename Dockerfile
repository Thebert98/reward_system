# Use the official Node.js image as a base image
FROM node:lts

# Set environment variables
ENV REDIS_HOST=redis
ENV REDIS_PORT=6379

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY ./ ./

# Expose the port your app runs on
EXPOSE 3100

# Define environment variables if needed
ENV NODE_ENV=production

# Command to run the application
CMD ["npm", "start"]
