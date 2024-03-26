# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy TypeScript configuration file
COPY tsconfig.json .

# Copy the rest of the application code to the working directory
COPY . .

# Build TypeScript code without type checking
#RUN npm install -g typescript && tsc --skipLibCheck
RUN npm install -g typescript && tsc --skipLibCheck --noEmit

# Expose port 3000 to allow external access to the frontend
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]
