const express = require("express");
const userControler = require("../controler/userControler");
const userRouter = express.Router();

userRouter.get("/random", userControler.getRandomUserControler);
userRouter.get("/all", userControler.getAllUserControler);
userRouter.post("/save", userControler.postUserControler);
userRouter.patch("/update/:id", userControler.updateUsersControler);
userRouter.patch("/bulk-update", userControler.bulkUpdateUsersControler);
userRouter.delete("/delete/:id", userControler.deleteUsers);

module.exports = userRouter;
