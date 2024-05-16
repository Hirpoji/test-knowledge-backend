import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {

  try {
    const { userName, password, email, avatar } = req.body;

    const salt = await bcrypt.genSalt(10);

    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new User({
      userName,
      passwordHash,
      email,
      avatar,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        id: user._id,
      },
      "hipsterJo",
      {
        expiresIn: "30d",
      }
    );

    const { ...userData } = user._doc;

    res.status(200).json({ ...userData, token });
  } catch (err) {
    res.status(500).json("Не удалось создать пользователя");
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json("Неверный логин или пароль");
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPassword) {
      return res.status(404).json("Неверный логин или пароль");
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      "hipsterJo",
      {
        expiresIn: "30d",
      }
    );

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json("Не удалось авторизоваться");
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json({ user });
  } catch {
    res.status(400).json({ message: "Нет доступа" });
  }
};
