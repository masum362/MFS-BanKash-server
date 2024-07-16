import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

const auth = async (req, res, next) => {
  const token = req.headers.authorization.split[1];
  try {
    if (!token) {
      return res.status(404).json({ message: "Invalid user" });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, decoded) => {
      if (error) return res.status(404).json({ message: "Invalid user" });
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


export {auth};