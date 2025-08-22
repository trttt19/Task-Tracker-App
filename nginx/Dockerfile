# Use the official Nginx base image
FROM nginx:latest

# Copy the Nginx configuration file
COPY ./nginx.conf /etc/nginx/nginx.conf

# Copy the built frontend files from the frontend service's build step
COPY --from=task-tracker-app-frontend /app/dist /usr/share/nginx/html

# Expose the Nginx port
EXPOSE 80