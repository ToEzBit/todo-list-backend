require("dotenv").config();
require("./config/passport");
const express = require("express");
const morgan = require("morgan");
const errorMiddleware = require("./middlewares/error");
const notfoundMiddleware = require("./middlewares/notfound");
const userRoute = require("./routes/userRoute");
const todoRoute = require("./routes/todoRoute");
const authenticateMiddleware = require("./middlewares/authenticate");
const passportJwt = require("./middlewares/passportJwt");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//REST API: handle resource Todo
//CREATE,UPDATE,DELETE,GET ALL,GET BY ID

app.use("/todos", passportJwt, todoRoute);

//REST API: handle resource Users
//CREATE,UPDATE

app.use("/users", userRoute);

app.all("*", notfoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`sever is running on port ${port}`));
