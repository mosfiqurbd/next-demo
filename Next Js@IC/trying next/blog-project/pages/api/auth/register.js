import dbConnect from "../../../utils/db";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { name, email, password, phone } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "Missing required fields" });

  const exists = await User.findOne({ email });
  if (exists)
    return res.status(400).json({ error: "Email already registered" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, phone });
  return res.status(201).json({
    message: "User created",
    user: { id: user._id, name: user.name, email: user.email },
  });
}
