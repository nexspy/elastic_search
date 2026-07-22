FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy the rest of your application code (like server.js)
COPY . .

# Expose the port your Express app listens on
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]