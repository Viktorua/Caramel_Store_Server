const Router = require("express");
const router = new Router();
const clothesRouter = require("./clothesRouter");
const userRouter = require("./userRouter");
const basketRouter = require("./basketRoutes");

router.use("/user", userRouter);
router.use("/clothes", clothesRouter);
router.use("/basket", basketRouter);

module.exports = router;
