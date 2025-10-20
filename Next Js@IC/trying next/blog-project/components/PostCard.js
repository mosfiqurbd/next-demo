import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h3 className="text-xl font-semibold">
        <Link href={`/posts/${post._id}`}>{post.title}</Link>
      </h3>
      <p className="text-sm text-gray-600">
        By {post.author?.name} • {new Date(post.createdAt).toLocaleString()}
      </p>
      <p className="mt-2 text-gray-700">
        {post.excerpt || post.content.slice(0, 160) + "..."}
      </p>
    </div>
  );
}
