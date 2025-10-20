// import dbConnect from "../../../utils/db";
// import Post from "../../../models/Post";

// export default async function handler(req, res) {
//   await dbConnect();

//   if (req.method === "GET") {
//     try {
//       const posts = await Post.find({})
//         .sort({ createdAt: -1 })
//         .populate("author", "name email");

//       return res.status(200).json({ posts });
//     } catch (error) {
//       return res.status(500).json({ error: "Failed to fetch posts" });
//     }
//   }

//   if (req.method === "POST") {
//     try {
//       const { title, content, author } = req.body;

//       if (!title || !content) {
//         return res.status(400).json({ error: "Missing required fields" });
//       }

//       const post = await Post.create({ title, content, author });
//       return res.status(201).json({ post });
//     } catch (error) {
//       return res.status(500).json({ error: "Failed to create post" });
//     }
//   }

//   return res.status(405).json({ error: "Method not allowed" });
// }
import dbConnect from "../../../utils/db";
import Post from "../../../models/Post";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async function handler(req, res) {
  await dbConnect();

  // GET - সব posts
  if (req.method === "GET") {
    try {
      const posts = await Post.find({})
        .sort({ createdAt: -1 })
        .populate("author", "name email");

      return res.status(200).json({ posts });
    } catch (error) {
      console.error("GET posts error:", error);
      return res.status(500).json({ error: "Failed to fetch posts" });
    }
  }

  // POST - নতুন post create
  if (req.method === "POST") {
    try {
      // Check authentication
      const cookies = cookie.parse(req.headers.cookie || "");
      const token = cookies.token;

      if (!token) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const { title, content } = req.body;

      if (!title || !content) {
        return res
          .status(400)
          .json({ error: "Title and content are required" });
      }

      // Create post with authenticated user as author
      const post = await Post.create({
        title,
        content,
        author: decoded.id, // Use logged in user's ID
      });

      return res.status(201).json({
        message: "Post created successfully",
        post,
      });
    } catch (error) {
      console.error("POST error:", error);
      return res
        .status(500)
        .json({ error: error.message || "Failed to create post" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
