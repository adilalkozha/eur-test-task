const User = require("../models/User");
const File = require("../models/File");
const path = require('path')
const _ = require("lodash");
module.exports.uploadImage = async (req, res) => {
  try {
    console.log(req)
    if (!req.files) {
      throw new Error("Empty!");
    }
    const user = await User.findByPk(req.user.email);

    if (!user) throw new Error("User not found");
    console.log(req.files)
    
    _.forEach(_.keysIn(req.files.folds), async (key) => {
      let photo = req.files.folds[key];
      console.log('key: ', key)
      console.log('photo: ', photo)
      console.log('photo: ', __dirname)
      photo.mv(path.join(__dirname+ '/../assets', 'files/')+ photo.name);
      let file = await File.create({
        name: photo.name,
        mimetype: photo.mimetype,
        size: photo.size,
      });

      if (file) {
        delete user.dataValues.password;
        file.dataValues.author = user;
      }
    });
  } catch (err) {
    return res.json({
      errors: { body: ["Could not upload file", err.message] },
    });
  }
};
