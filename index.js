const express = require("express");
const sequelize = require("./dbConnection");
const app = express();
const morgan = require("morgan");
const { notFound } = require("./middleware/errorHandle");
const User = require("./models/User");
const File = require("./models/File")
const userRoute = require("./routes/users");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger_output.json");
const fileUpload = require("express-fileupload");
const fileRoute = require("./routes/files");
const cors = require("cors");
const PORT = 3000;
const sync = async () => await sequelize.sync({ force: true });
sync();
app.use(cors());
User.hasMany(File,{
  as: 'files',
  onDelete: 'CASCADE'
})
File.belongsTo(User,{
  as: "author"
})
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(express.json());
app.use(morgan("tiny"));
app.get("/", (req, res) => {
  res.json({ status: "Api start" });
});
app.use(userRoute);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(fileRoute);

app.use(notFound);
app.listen(PORT, () => {
  console.log("Server is running on the port:", PORT);
});
