import pkg from "jsonwebtoken";
const { verify } = pkg;

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default auth;
