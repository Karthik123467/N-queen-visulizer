# Use an official Nginx image as a base
FROM nginx:latest

# Copy your HTML, CSS, and JS files into the Nginx server
COPY index.html /usr/share/nginx/html/index.html
COPY styling.css /usr/share/nginx/html/styling.css
COPY tracking.js /usr/share/nginx/html/tracking.js

# Expose port 80 to be able to access the application
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
