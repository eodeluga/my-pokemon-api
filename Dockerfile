FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Copy build to image
COPY . .

# Install dependencies
RUN npm i

EXPOSE 5432

#CMD [ "npm", "start" ]