import dbConnect from "../../../utils/db";
import User from "../../../models/User";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async function handler(req, res) {
  await dbConnect();
  const cookies = req.headers.cookie
    ? cookie.parse(req.headers.cookie || "")
    : {};
  const token = cookies.token;
  if (!token) return res.status(200).json({ user: null });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    return res.json({ user });
  } catch (err) {
    return res.status(401).json({ user: null });
  }
}
