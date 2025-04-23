# Use an official Node.js image
FROM node:18-alpine

# Create and set working directory
WORKDIR /app

# Install http-server globally
RUN npm install -g http-server

# Copy your static files into the container
COPY . .

# Expose port for http-server (we'll use 8501 inside the container)
EXPOSE 8080

# Run http-server on port 8501
CMD ["http-server", "-p", "8080"]
