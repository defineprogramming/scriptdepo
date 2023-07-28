import { connectToDatabase } from "../../utils/db";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).send("Unauthorized");
    return;
  }

  const { db } = await connectToDatabase();

  if (req.method === "GET") {
    const users = await db.collection("users").find().toArray();
    res.status(200).json(users);
  } else if (req.method === "POST") {
    const { name, email, password } = req.body;
    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      res.status(400).send("User already exists");
      return;
    }

    const user = await db.collection("users").insertOne({ name, email, password });
    res.status(201).json(user.ops[0]);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};