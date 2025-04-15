import express, { Request, Response } from "express";

interface IUsers {
  id: number;
  name: string;
}

const app = express();
const PORT = 3001;

app.get("/users/:id", async(req: Request, res: Response) => {
  const users: IUsers[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];
  const user = users.find((user) => user.id === parseInt(req.params.id));
  user ? res.json(user) : res.status(404).json({ message: "User not found" });
});

app.listen(PORT, () => {
  console.log(`User Service is running on http://localhost:${PORT}`);
});
