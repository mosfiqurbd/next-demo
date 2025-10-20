// import cookie from "cookie";
// export default function handler(req, res) {
//   res.setHeader(
//     "Set-Cookie",
//     cookie.serialize("token", "", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       expires: new Date(0),
//       sameSite: "lax",
//       path: "/",
//     })
//   );
//   res.json({ message: "Logged out" });
// }
export default function Dashboard() {
  const handleLogout = async () => {
    const response = await fetch("/api/logout", {
      method: "POST",
    });

    if (response.ok) {
      // Redirect to login page
      window.location.href = "/login";
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
