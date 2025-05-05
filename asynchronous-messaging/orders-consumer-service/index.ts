import express from "express";
import amqp from "amqplib";

const app = express();
const RABBITMQ_URL = "amqp://rabbitmq";
// const RABBITMQ_URL = "amqp://rabbitmq:5672";
// const RABBITMQ_URL = "amqp://localhost:5672";

async function connectWithRetry(
  retries = 5,
  delay = 3000
): Promise<amqp.ChannelModel> {
  while (retries > 0) {
    try {
      const connection = await amqp.connect(RABBITMQ_URL);
      console.log("Connected to RabbitMQ");
      return connection;
    } catch (err) {
      console.error(`RabbitMQ connection failed. Retries left: ${retries - 1}`);
      retries--;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw new Error("Unable to connect to RabbitMQ after multiple attempts");
}

// (Consumer)
async function consumeOrders() {
  // const connection = await amqp.connect(RABBITMQ_URL);
  const connection = await connectWithRetry();
  const channel = await connection.createChannel();
  const queue = "order.created";

  await channel.assertQueue(queue);
  console.log("Waiting for messages in queue:", queue);

  channel.consume(queue, (msg) => {
    if (msg) {
      const order = JSON.parse(msg.content.toString());
      console.log("Order received:", order);
      channel.ack(msg);
    }
  });
}

consumeOrders().catch((err) => console.error("Error consuming messages:", err));

app.listen(3001, () => {
  console.log("Order consumer service running on port 3001");
});
