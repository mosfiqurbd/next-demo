import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [c, setC] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch(`/api/posts/${id}`)
      .then((r) => r.json())
      .then((d) => setPost(d.post));
    fetch(`/api/comments/${id}`)
      .then((r) => r.json())
      .then((d) => setComments(d.comments || []));
  }, [id]);

  async function addComment() {
    await fetch(`/api/comments/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: c }),
    });
    setC("");
    const res = await fetch(`/api/comments/${id}`);
    const d = await res.json();
    setComments(d.comments || []);
  }

  if (!post) return <div>Loading...</div>;
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-600">
        By {post.author?.name} • {new Date(post.createdAt).toLocaleString()}
      </p>
      <div className="prose max-w-none">{post.content}</div>

      <div className="mt-6">
        <h3 className="font-semibold">Comments</h3>
        <div className="space-y-3">
          {comments.map((cm) => (
            <div key={cm._id} className="p-3 bg-white rounded shadow-sm">
              <div className="text-sm text-gray-600">
                {cm.author?.name} • {new Date(cm.createdAt).toLocaleString()}
              </div>
              <div>{cm.content}</div>
            </div>
          ))}
        </div>

        <div className="mt-3">
          <textarea
            value={c}
            onChange={(e) => setC(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Write a comment..."
          />
          <button
            onClick={addComment}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
}
