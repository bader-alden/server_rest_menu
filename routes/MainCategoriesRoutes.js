const express = require("express");
const {
  getMainCategories,
  createMainCategories,
  updateMainCategories,
  deleteMainCategories,
  getOneMainCategories,
  login,
} = require("../services/MainCategoriesService");

const router = express.Router();

router.route("/").get(getMainCategories).post(createMainCategories);
router
  .route("/:id")
  .put(updateMainCategories)
  .delete(deleteMainCategories)
  .get(getOneMainCategories);
router.route("/login").post(login);

module.exports = router;
