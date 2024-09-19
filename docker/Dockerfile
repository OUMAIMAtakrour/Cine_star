# Use an official Node runtime as the parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Debug: List contents of the app directory and src subdirectory
RUN echo "Contents of /usr/src/app:" && \
    ls -la /usr/src/app && \
    echo "Contents of /usr/src/app/src:" && \
    ls -la /usr/src/app/src

# Keep the container running for debugging
CMD ["node", "src/app.js"]