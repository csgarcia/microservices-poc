# Asynchronous Messaging with RabbitMQ

This project demonstrates asynchronous communication between microservices using RabbitMQ as the message broker. The `orders-service` publishes messages to RabbitMQ whenever a new order is created.

## Project Structure

```
asynchronous-messaging/
├── docker-compose.yml
├── orders-service/
│   ├── Dockerfile
│   ├── index.ts
│   ├── package.json
│   ├── tsconfig.json
├── orders-consumer-service/
│   ├── Dockerfile
│   ├── index.ts
│   ├── package.json
│   ├── tsconfig.json
```

## Prerequisites

- [Docker](https://www.docker.com/) installed on your machine.
- [Node.js](https://nodejs.org/) (optional, for local development).

## Installation and Usage

### Using Docker

1. Navigate to the `asynchronous-messaging` folder:
   ```bash
   cd /Users/carlosgarcia/Documents/projects/architectural-patterns/microservices-poc/asynchronous-messaging
   ```

2. Start the services using Docker Compose:
   ```bash
   docker-compose up --build
   ```

3. Verify that the services are running:
   - `orders-service`: [http://localhost:3002](http://localhost:3002)
   - RabbitMQ Management Dashboard: [http://localhost:15672](http://localhost:15672)

4. Access the RabbitMQ dashboard:
   - **URL**: [http://localhost:15672](http://localhost:15672)
   - **Username**: `guest`
   - **Password**: `guest`

### Testing the Endpoint

To test the `orders-service`, you can use the following `curl` command to create a new order:

```bash
curl -X POST http://localhost:3002/orders \
  -H "Content-Type: application/json" \
  -d '{"id": "123", "item": "Book", "qty": 2}'
```

This will:
1. Publish an `order.created` message to RabbitMQ.
2. Log the message in the RabbitMQ queue.

### RabbitMQ Queue

The `orders-service` publishes messages to the `order.created` queue. You can monitor the queue in the RabbitMQ Management Dashboard under the "Queues" tab.

---

## Project Details

### Services

1. **Orders Service (`orders-service`)**
   - Exposes an API to create orders.
   - Publishes `order.created` messages to RabbitMQ.

2. **RabbitMQ**
   - Acts as the message broker for asynchronous communication.
   - Accessible via the RabbitMQ Management Dashboard.

---

## Notes

- The `orders-service` uses a retry mechanism to connect to RabbitMQ in case of connection failures.
- Avoid creating a new RabbitMQ connection for each message to prevent performance issues.

---

## License

This project is licensed under the ISC License.