FROM node:22-slim

WORKDIR /app

# Install dependencies first
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Install nodemon globally (optional)
RUN npm install -g nodemon

CMD ["npm", "run", "dev"]
