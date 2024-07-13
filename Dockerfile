# Dockerfile References: https://docs.docker.com/engine/reference/builder/

# Start from node:22-alpine base image
FROM node:22-alpine

# The latest alpine images don't have some tools like (`git` and `bash`).
# Adding git, bash and openssh to the image
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

# Set the Current Working Directory inside the container
WORKDIR /crud-bank-graphql-relay

# Copy package*.json
COPY package*.json ./

# Download all dependancies
RUN npm install

# Copy the source from the current directory to the WORKDIR
COPY . .

# Expose port 4000 to the outside world
EXPOSE 4000

# Run the executable
CMD [ "npm", "start" ]