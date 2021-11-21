const User = require("../models/User");
const File = require("../models/File");
const path = require("path");
const _ = require("lodash");
module.exports.uploadImage = async (req, res) => {
  try {
    if (!req.files) {
      throw new Error("Empty!");
    }
    const user = await User.findByPk(req.user.email);

    if (!user) throw new Error("User not found");
    delete user.dataValues.password;

    _.forEach(_.keysIn(req.files.folds), async (key) => {
      let photo = req.files.folds[key];
      photo.mv(path.join(__dirname + "/../assets", "files/") + photo.name);
      let file = await File.create({
        name: photo.name,
        mimetype: photo.mimetype,
        size: photo.size,
        UserEmail: user.dataValues.email,
      });
      if (file) {
      } else {
        throw new Error("File is not write in database");
      }
    });
    return res.status(201).json({ message: "OK" });
  } catch (err) {
    const status = res.statusCode ? res.statusCode : 500;
    return await res.status(status).json({
      errors: { body: ["Could not upload file", err.message] },
    });
  }
};

module.exports.showAll = async (req, res) => {
  const files = await File.findAll();
  return res.status(200).json({ files });
};

module.exports.getByName = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.email, {
      include: File,
    });
    if (!user) throw new Error("User not found");

    return res.status(200).json({ files: user.Files });
  } catch (err) {
    return res.status(404).json({
      errors: { body: [err.message] },
    });
  }
};
