import userModel from "../model/userModel.js";
import { hashPin } from "../utils/utilities.js";

const homePage = (req, res) => {
  console.log("home page called");
  res.send("welcome to home page");
};

const registerUser = async (req, res) => {
  try {
    const { user } = req.body;

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
    const newUser = await userModel(user);
    newUser.save();

    return res
      .status(200)
      .json({ message: "user saved successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ message:'something went wrong', error: error.message });
  }
};

export { homePage , registerUser };
