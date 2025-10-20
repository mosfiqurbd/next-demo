import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        setUser(null);
      }
    }
    getUser();
  }, []);

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">MyBlog</Link>
        <div className="flex items-center gap-3">
          <Link href="/">Home</Link>
          <Link href="/posts/new">New Post</Link>
          {user ? (
            <>
              <Link href="/dashboard">{user.name}</Link>
              <button
                onClick={async () => {
                  await fetch("/api/auth/logout");
                  window.location.reload();
                }}
                className="px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
