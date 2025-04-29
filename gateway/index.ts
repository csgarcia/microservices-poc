import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const ORDERS_SERVICE_URL = "http://orders-service:3002";
const USERS_SERVICE_URL = "http://users-service:3001";

app.get("/orders/:id", async (req, res) => {
  try {
    // Step 1: Get order info
    const orderRes = await axios.get(
      `${ORDERS_SERVICE_URL}/orders/${req.params.id}`
    );
    const order = orderRes.data;

    res.json({
      order,
    });
  } catch (err) {
    console.error("API Gateway error:", err);
    res.status(500).json({ message: "Something went wrong in the gateway." });
  }
});

app.listen(3000, () => {
  console.log("🚪 API Gateway running on port 3000");
});
