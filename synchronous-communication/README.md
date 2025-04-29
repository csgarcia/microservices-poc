# Microservices Proof of Concept (PoC)

This project demonstrates a microservices architecture using Docker and Node.js. It consists of two services: `user-service` and `orders-service`. These services communicate with each other to simulate a real-world microservices setup.

## Project Structure

```
.
├── .gitignore
├── docker-compose.yml
├── api-gateway/
│   ├── Dockerfile
│   ├── index.ts
│   ├── package.json
│   ├── tsconfig.json
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

3. **API Gateway (`api-gateway`)**
   - Acts as a single entry point for clients to interact with the microservices.
   - Routes requests to the appropriate service (e.g., `user-service` or `orders-service`).
   - Runs on port `3000`.

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
   - API Gateway: [http://localhost:3000](http://localhost:3000)
   - User Service: [http://localhost:3001](http://localhost:3001)
   - Orders Service: [http://localhost:3002](http://localhost:3002)

### Local Development

1. Install dependencies for each service:
   ```bash
   cd user-service
   npm install
   cd ../orders-service
   npm install
   cd ../api-gateway
   npm install
   ```

2. Start the services locally:
   ```bash
   cd user-service
   npm run dev
   cd ../orders-service
   npm run dev
   cd ../api-gateway
   npm run dev
   ```

3. Access the services:
   - API Gateway: [http://localhost:3000](http://localhost:3000)
   - User Service: [http://localhost:3001](http://localhost:3001)
   - Orders Service: [http://localhost:3002](http://localhost:3002)

## API Endpoints

### API Gateway

- **GET** `/api/users/:id`
  - Fetches user details by ID from the `user-service`.
  - Example: `GET http://localhost:3000/api/users/1`

- **GET** `/api/orders/:id`
  - Fetches order details by ID from the `orders-service`.
  - Example: `GET http://localhost:3000/api/orders/101`

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

## Pros and Cons of Synchronous Communication in Microservices

### Pros
1. **Simplicity**: Easy to implement and understand, especially for small systems.
2. **Real-Time Communication**: Immediate responses make it suitable for request-response scenarios.
3. **Debugging**: Easier to trace and debug since the flow is linear and predictable.
4. **Standard Protocols**: Uses widely adopted protocols like HTTP/HTTPS, making it compatible with most tools and libraries.

### Cons
1. **Tight Coupling**: Services are dependent on each other's availability and endpoints.
2. **Latency**: The caller must wait for the response, which can increase overall response time.
3. **Scalability Issues**: High traffic can overwhelm services, leading to bottlenecks.
4. **Fault Tolerance**: If one service is down, the entire request chain may fail.
5. **Complex Error Handling**: Requires handling timeouts, retries, and cascading failures.

## [Feature] Adding RabbitMQ
RabbitMQ is a message broker that enables microservices to communicate asynchronously using queues and messages instead of direct HTTP calls.

## License

This project is licensed under the ISC License.