const express = require("express");
const userRouter = require("./router/userHandler");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("request success fully");

  res.end();
});

app.use("/user", userRouter);
app.listen(4000, () => console.log("server running on port 4000"));
