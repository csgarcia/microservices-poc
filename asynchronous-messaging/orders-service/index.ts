import express from "express";
import amqp from "amqplib";

const app = express();
app.use(express.json());

const RABBITMQ_URL = "amqp://rabbitmq";
// const RABBITMQ_URL = "amqp://rabbitmq:5672";
// const RABBITMQ_URL = "amqp://localhost:5672";

// (Publisher)
let channel: amqp.Channel;

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

export async function initPublisher() {
  // const connection = await amqp.connect(RABBITMQ_URL);
  // channel = await connection.createChannel();
  const connection = await connectWithRetry();
  channel = await connection.createChannel();
  await channel.assertQueue("order.created");
}

export async function publishOrder(order: any) {
  if (!channel) throw new Error("Channel is not initialized");
  channel.sendToQueue("order.created", Buffer.from(JSON.stringify(order)));
}

// BAD practice: creating a new connection for each message
// this can cause performance issues, resource exhaustion and Memory bloat and CPU spikes
// async function publishOrder(order: any) {
//   const connection = await amqp.connect(RABBITMQ_URL);
//   const channel = await connection.createChannel();
//   const queue = "order.created";

//   await channel.assertQueue(queue);
//   channel.sendToQueue(queue, Buffer.from(JSON.stringify(order)));

//   console.log("Order published:", order);
//   await channel.close();
//   await connection.close();
// }

app.post("/orders", async (req, res) => {
  const order = req.body;
  publishOrder(order);
  res.status(201).send({ message: "Order created", order });
});

initPublisher().then(() => {
  app.listen(3002, () => console.log("Orders Service running on 3002"));
});
