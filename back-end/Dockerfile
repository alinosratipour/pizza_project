# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy TypeScript configuration file
COPY tsconfig.json .

# Copy the rest of the application code to the working directory
COPY . .

# Build TypeScript code without type checking
RUN npm install -g typescript && tsc --skipLibCheck

# Expose port 3000 to allow external access to the frontend
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
