// import { useState } from "react";
// import { useRouter } from "next/router";

// export default function NewPost() {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const router = useRouter();

//   async function save() {
//     const res = await fetch("/api/posts", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title, content }),
//     });
//     if (res.ok) {
//       const data = await res.json();
//       router.push(`/posts/${data.post._id}`);
//     } else {
//       alert("Error creating post");
//     }
//   }

//   return (
//     <div className="max-w-2xl">
//       <h2 className="text-xl font-semibold mb-3">Create Post</h2>
//       <input
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Title"
//         className="w-full p-2 mb-2 border rounded"
//       />
//       <textarea
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         rows={10}
//         placeholder="Content"
//         className="w-full p-2 border rounded"
//       />
//       <div className="mt-3">
//         <button
//           onClick={save}
//           className="px-4 py-2 bg-green-600 text-white rounded"
//         >
//           Publish
//         </button>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function NewPost() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          // Not logged in, redirect to login
          router.push("/login");
        }
      } catch (err) {
        router.push("/login");
      }
    }
    checkAuth();
  }, [router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          author: user?.id, // Add author ID
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create post");
      }

      // Success - redirect to home
      alert("Post created successfully!");
      router.push("/");
    } catch (err) {
      setError(err.message);
      alert(err.message); // Show error in alert
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div style={{ padding: "20px" }}>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto", padding: "20px" }}>
      <h1>Create Post</h1>

      {error && (
        <div
          style={{
            color: "red",
            marginBottom: "20px",
            padding: "10px",
            border: "1px solid red",
            borderRadius: "5px",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            placeholder="My post"
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Content:
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="10"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            placeholder="how are you every one"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px 30px",
            backgroundColor: loading ? "#ccc" : "#10b981",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Publishing..." : "Publish"}
        </button>
      </form>
    </div>
  );
}
