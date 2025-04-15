import express, { Request, Response } from "express";
import axios from "axios";

interface IOrders {
  id: number;
  item: string;
  userId: number;
}
const app = express();
const PORT = 3002;

app.get("/orders/:id", async (req: any, res: any) => {
  const orders: IOrders[] = [
    { id: 101, item: "Laptop", userId: 1 },
    { id: 102, item: "Book", userId: 2 },
  ];

  const order = orders.find((order) => order.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ message: "Order not found" });

  try {
    const userResponse = await axios.get(
      `http://localhost:3001/users/${order.userId}`
    );
    res.json({
      order,
      user: userResponse.data,
    });
  } catch (err) {
    res.status(500).json({ message: "User service unavailable" });
  }
});

app.listen(PORT, () => {
  console.log(`Order Service running on http://localhost:${PORT}`);
});
