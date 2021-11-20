const express = require("express");
const sequelize = require("./dbConnection");
const app = express();
const morgan = require("morgan");
const { notFound } = require("./middleware/errorHandle");
const User = require("./models/User");
const userRoute = require("./routes/users");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger_output.json");
const cors = require('cors')
const PORT = 3000;
const sync = async () => await sequelize.sync({ force: true });
sync();
app.use(cors())

app.use(express.json());
app.use(morgan("tiny"));
app.get("/", (req, res) => {
  res.json({ status: "Api start" });
});
app.use(userRoute);

app.listen(PORT, () => {
  console.log("Server is running on the port:", PORT);
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(notFound);
