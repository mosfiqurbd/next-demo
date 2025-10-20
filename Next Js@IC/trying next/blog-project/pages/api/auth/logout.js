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
import cookie from "cookie";

export default function handler(req, res) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
      sameSite: "lax",
      path: "/",
    })
  );
  res.status(200).json({ message: "Logged out" });
}
