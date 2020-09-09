# TODO: Make this file multi-stage
# TODO: Find a way to use Alpine instead of Ubuntu
FROM ubuntu:18.04

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Update packages
RUN apt -y update

# Install general packages
RUN apt -y install curl wget

# Install NodeJs
RUN curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt -y install nodejs

# Install ffmpeg
RUN apt -y install ffmpeg

# Install espeak-ng
RUN apt -y install espeak-ng

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app/

# Build from src
RUN npm run build

CMD ["npm", "run", "start"]