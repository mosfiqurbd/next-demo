import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [q, setQ] = useState("");

  async function load(q = "") {
    const url = `/api/posts${q ? "?search=" + encodeURIComponent(q) : ""}`;
    const res = await fetch(url);
    const data = await res.json();
    setPosts(data.posts || []);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by title..."
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={() => load(q)}
          className="px-4 py-2 bg-slate-700 text-white rounded"
        >
          Search
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((p) => (
          <PostCard key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
