const nodemailer = require("nodemailer");
require("dotenv").config();
const db = require("../models/index");
const userService = require("../services/userService");

const createUser = async (req, res) => {
  try {
    const email = req.body?.email;
    if (!email) {
      return res.status(400).json({
        status: res.statusCode,
        message: "All fields are required",
      });
    }

    const existingUser = await userService.checkEmail({ email: email });
    if (existingUser) {
      return res.status(200).json({
        status: res.statusCode,
        message: "email existed",
        data: { email: existingUser.email },
      });
    } else {
      const user = await userService.createUser({ email: email });

      return res.status(200).json({
        status: res.statusCode,
        message: "create user success",
        data: { email: user.email },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: res.statusCode,
      message: "server error",
    });
  }
};

const sendOTP = async (req, res) => {
  try {
    if (userService.checkEmail({ email: req.body.email })) {
      try {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // Use `true` for port 465, `false` for all other ports
          auth: {
            user: process.env.GOOGLE_APP_EMAIL,
            pass: process.env.GOOGLE_APP_PASSWORD,
          },
        });

        const OTP = Math.floor(100000 + Math.random() * 900000);
        await transporter.sendMail({
          from: `Weather forecast <${process.env.GOOGLE_APP_EMAIL}>`, // sender address
          to: `${req.body.email}`, // list of receivers
          subject: "Weather forecast: Email confirmation", // Subject line
          text: "Hello world?", // plain text body
          html: `
                <div>Hello ${req.body.email},</div>
                <div>This is your OTP to confirm your subscription: ${OTP}</div>
                `, // html body
        });
        await userService.updateCode({ code: OTP, email: req.body.email });
        res.status(200).json({
          status: res.statusCode,
          message: "success",
          data: { email: req.body.email },
        });
      } catch (err) {
        return res.status(500).json({
          status: res.statusCode,
          message: "server error",
        });
      }
    } else {
      return res.status(404).json({
        status: res.statusCode,
        message: "Email not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: res.statusCode,
      message: "server error",
    });
  }
};

const checkOTP = async (req, res) => {
  try {
    const email = req.body?.email;
    const code = req.body?.code;
    if (!email || !code) {
      return res.status(400).json({
        status: res.statusCode,
        message: "Missing required fields",
      });
    }

    const user = await userService.checkCode({ email: email, code: code });
    if (!user) {
      return res.status(404).json({
        status: res.statusCode,
        message: "User not found",
        data: "",
      });
    }

    res.status(200).json({
      status: res.statusCode,
      message: "success",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      status: res.statusCode,
      message: "server error",
    });
  }
};

const updateCity = async (req, res) => {
  try {
    const email = req.body?.email;
    const city = req.body?.city;
    if (!email || !city) {
      return res.status(400).json({
        status: res.statusCode,
        message: "Missing required fields",
      });
    }

    const user = await userService.updateCity({ email, city });
    if (!user) {
      return res.status(404).json({
        status: res.statusCode,
        message: "User not found",
        data: "",
      });
    }

    res.status(200).json({
      status: res.statusCode,
      message: "success",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      status: res.statusCode,
      message: "server error",
    });
  }
};

const findUserByEmail = async (req, res) => {
  try {
    const email = req.query?.email;
    if (!email) {
      return res.status(400).json({
        status: res.statusCode,
        message: "All fields are required",
      });
    }

    const existingUser = await userService.checkEmail({ email: email });
    if (existingUser) {
      return res.status(200).json({
        status: res.statusCode,
        message: "User found",
        data: { email: existingUser.email },
      });
    } else {
      return res.status(404).json({
        status: res.statusCode,
        message: "User not found",
        data: "",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: res.statusCode,
      message: "server error",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const email = req.body?.email;
    if (!email) {
      return res.status(404).json({
        status: res.statusCode,
        message: "User not found",
        data: "",
      });
    }

    await userService.deleteUser({ email: email });

    res.status(200).json({
      status: res.statusCode,
      message: "success",
    });
  } catch (err) {
    return res.status(500).json({
      status: res.statusCode,
      message: "server error",
    });
  }
};

module.exports = {
  sendOTP,
  createUser,
  checkOTP,
  updateCity,
  deleteUser,
  findUserByEmail,
};
