# Microservices Proof of Concept (PoC)

This project demonstrates a microservices architecture using Docker and Node.js. It consists of two services: `user-service` and `orders-service`. These services communicate with each other to simulate a real-world microservices setup.

## Project Structure

```
.
├── .gitignore
├── docker-compose.yml
├── orders-service/
│   ├── Dockerfile
│   ├── index.ts
│   ├── nodemon.json
│   ├── package.json
│   ├── tsconfig.json
├── user-service/
│   ├── Dockerfile
│   ├── index.ts
│   ├── nodemon.json
│   ├── package.json
│   ├── tsconfig.json
```

### Services

1. **User Service (`user-service`)**
   - Exposes an API to fetch user details by ID.
   - Runs on port `3001`.

2. **Orders Service (`orders-service`)**
   - Exposes an API to fetch order details by ID.
   - Fetches user details from the `user-service` for each order.
   - Runs on port `3002`.

## Prerequisites

- [Docker](https://www.docker.com/) installed on your machine.
- [Node.js](https://nodejs.org/) (optional, for local development).

## Running the Project

### Using Docker Compose

1. Build and start the services using Docker Compose:
   ```bash
   docker-compose up --build
   ```

2. Access the services:
   - User Service: [http://localhost:3001](http://localhost:3001)
   - Orders Service: [http://localhost:3002](http://localhost:3002)

### Local Development

1. Install dependencies for each service:
   ```bash
   cd user-service
   npm install
   cd ../orders-service
   npm install
   ```

2. Start the services locally:
   ```bash
   cd user-service
   npm run dev
   cd ../orders-service
   npm run dev
   ```

3. Access the services:
   - User Service: [http://localhost:3001](http://localhost:3001)
   - Orders Service: [http://localhost:3002](http://localhost:3002)

## API Endpoints

### User Service

- **GET** `/users/:id`
  - Fetches user details by ID.
  - Example: `GET http://localhost:3001/users/1`

### Orders Service

- **GET** `/orders/:id`
  - Fetches order details by ID and includes user details.
  - Example: `GET http://localhost:3002/orders/101`

## Docker Configuration

- The `docker-compose.yml` file defines the services and their configurations.
- Each service has its own `Dockerfile` for building the container images.
- Volumes are used to mount the source code for live updates during development.

## Notes

- The services communicate using the service names (`users-service` and `orders-service`) defined in the `docker-compose.yml` file.
- Nodemon is used for hot-reloading during development.

## Future Improvements

- Add a database for persistent storage.
- Implement proper error handling and logging.
- Add unit and integration tests.
- Use an API gateway for routing and load balancing.

## License

This project is licensed under the ISC License.