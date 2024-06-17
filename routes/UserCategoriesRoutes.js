const express = require("express");
const { getOneCategoryForUser } = require("../services/MainCategoriesService");

const router = express.Router();

router.route("/:id").get(getOneCategoryForUser);
module.exports = router;
