import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization) {
    try {
      token = req.headers.authorization;

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decodedToken.userId).select("-password");

      next();
    } catch (error) {
      res
        .status(401)
        .json({ status: "error", message: "Not authorized, token failed" });
    }
  }
  if (!token) {
    res
      .status(401)
      .json({ status: "error", message: "Not authorized, no token" });
  }
};
