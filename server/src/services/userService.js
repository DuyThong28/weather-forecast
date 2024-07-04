const model = require("../models");
const { Op } = require("sequelize");

class userService {
  static async createUser({ email }) {
    return model.User.create({
      email: email,
    });
  }

  static async checkEmail({ email }) {
    const checkEmail = await model.User.findOne({
      where: { email: email },
    });
    if (checkEmail) {
      return checkEmail.dataValues;
    }
    return null;
  }

  static async updateCode({ email, code }) {
    return await model.User.update({ code: code }, { where: { email: email } });
  }

  static async checkCode({ email, code }) {
    const checkCode = await model.User.findOne({
      where: { email: email, code: code },
    });
    if (checkCode) {
      return true;
    }
    return false;
  }

  static async updateCity({ email, city }) {
    return await model.User.update({ city: city }, { where: { email: email } });
  }

  static async deleteUser({ email }) {
    await model.User.destroy({
      where: {
        email: email,
      },
    });
  }

  static async getAllUsers(){
    return await model.User.findAll();
  }
}

module.exports = userService;
