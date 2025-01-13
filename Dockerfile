# Use Node.js base image
FROM node:22

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory
COPY . .

# Expose port
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
