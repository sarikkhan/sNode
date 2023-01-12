const express = require("express");
const router = express.Router();
const controller = require("../controllers/controllerhandler");
// const { check, validationResult } = require("express-validator");
const { userValidationRules, validate } = require("../config/validator");
router.get("/", controller.home);
router.get("/login", userValidationRules(), validate, controller.login);
router.post("/signup", userValidationRules(), validate, controller.register);

module.exports = router;
