import dbConnect from "../../../utils/db";
import Comment from "../../../models/Comment";
import Post from "../../../models/Post";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import User from "../../../models/User";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;
  const { postId } = req.query;

  if (method === "GET") {
    const comments = await Comment.find({ post: postId, suspended: false })
      .populate("author", "name")
      .sort({ createdAt: -1 })
      .lean();
    return res.json({ comments });
  }

  if (method === "POST") {
    const cookies = req.headers.cookie
      ? cookie.parse(req.headers.cookie || "")
      : {};
    const token = cookies.token;
    if (!token) return res.status(401).json({ error: "Not authenticated" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ error: "User not found" });

    const { content } = req.body;
    if (!content) return res.status(400).json({ error: "Missing content" });
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const comment = await Comment.create({
      post: postId,
      author: user._id,
      content,
    });
    return res.status(201).json({ comment });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
