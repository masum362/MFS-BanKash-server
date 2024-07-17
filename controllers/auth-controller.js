import userModel from "../model/userModel.js";
import { compareHash, hashPin } from "../utils/utilities.js";
import jwt from "jsonwebtoken";

const homePage = (req, res) => {
  console.log("home page called");
  res.send("welcome to home page");
};

const registerUser = async (req, res) => {
  try {
    const user = req.body;
    console.log(user);
    if (!user.name || !user.pin || !user.email || !user.mobile) {
      return res
        .status(404)
        .json({ message: "Please enter all required fields" });
    }
    const isAlreadyRegistered = await userModel.findOne({
      $or: [{ email: user.email }, { mobile: user.mobile }],
    });

    if (isAlreadyRegistered) {
      return res.status(404).json({ message: "Invalid registration" });
    }

    const hashedPin = await hashPin(user.pin);
    user.pin = hashedPin;
    console.log({ hashedPin });
    const newUser = await userModel(user);
    console.log({ newUser });
    newUser.save();

    return res
      .status(200)
      .json({ message: "user saved successfully", user: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
};

const loginUser = async (req, res) => {
  console.log("entered login");
  try {
    const user = req.body;
    console.log(user);

    const isUser = await userModel.findOne({
      $or: [{ email: user.details }, { mobile: user.details }],
    });

    console.log(isUser);

    if (!isUser) {
      return res.status(404).json({ message: "Invalid user" });
    }

    const isMatch = await compareHash(user.pin, isUser.pin);

    if (!isMatch) {
      return res.status(404).json({ message: "Invalid user" });
    }

    isUser.pin = undefined;
    const token = jwt.sign({ _id: isUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    console.log(isUser);
    return res.status(200).json({
      user: isUser,
      token: token,
      message: "User logged in successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
};

const getUser = (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUser = await userModel.find({});
    return res.status(200).json({ users: allUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
};

const getSpecificUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findOne({ _id: id });
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
};

const approveUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findOne({ _id: id });
    if (user.status === "active") {
      return res.status(403).json({ message: "user status already activated" });
    } else {
      const updatedUser = await userModel.updateOne(
        { _id: id },
        { status: "active", balance: user.balance + 20 }
      );
      return res
        .status(200)
        .json({ user: updatedUser, message: "user updated successfully" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
};

export {
  homePage,
  registerUser,
  loginUser,
  getUser,
  getSpecificUser,
  getAllUser,
  approveUser,
};
