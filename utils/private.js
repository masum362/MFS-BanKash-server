import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

const auth = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1] || "";
  try {
    if (!token) {
      return res.status(403).json({ message: "Invalid user" });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, decoded) => {
      if (error) return res.status(403).json({ message: "Invalid user" });
      const userId = decoded._id;
      const user = await userModel.findOne({ _id: userId });

      req.userId = userId;
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Invalid user" });
  }
};

const verifyAdmin = (req, res, next) => {
  try {
    const user = req.user;

    if (user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ message: "Invalid user" });
    }
  } catch (error) {}
};
const verifyAgent = (req, res, next) => {
  try {
    const user = req.user;

    if (user.role === "agent") {
      next();
    } else {
      return res.status(403).json({ message: "Invalid user" });
    }
  } catch (error) {}
};

export { auth,verifyAdmin,verifyAgent };
