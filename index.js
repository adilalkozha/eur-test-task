const express = require("express");
const sequelize = require("./dbConnection");
const app = express();
const morgan = require("morgan");
const { notFound } = require("./middleware/errorHandle");
const User = require("./models/User");
const userRoute = require("./routes/users");
const sync = async () => await sequelize.sync({ force: true });
sync();

app.use(express.json());
app.use(morgan('tiny'))
app.get("/", (req, res) => {
  res.json({ status: "Api start" });
});
app.use('/api',userRoute)
app.use(notFound)




const PORT = 8000;

app.listen(PORT, () => {
  console.log("Server is running on the port:", PORT);
});
