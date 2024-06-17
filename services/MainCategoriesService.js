const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const MainCategoriesModel = require("../models/MainCategoriesModel");
const bcrypt = require("bcryptjs");
const moment = require("moment");

exports.login = asyncHandler(async (req, res) => {
  const maincategories = await MainCategoriesModel.findOne({
    name: req.body.name,
  });
  if (
    !maincategories ||
    !(await bcrypt.compare(req.body.password, maincategories.password))
  ) {
    res.status(404).json({ msg: "incorecct name or password" });
  }
  res.status(200).json({ data: maincategories });
});

exports.getMainCategories = asyncHandler(async (req, res) => {
  const MainCategories = await MainCategoriesModel.find({});
  res
    .status(200)
    .json({ results: MainCategories.length, data: MainCategories });
  res.send();
});

exports.getOneMainCategories = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const MainCategories = await MainCategoriesModel.findById(id);
  if (!MainCategories) {
    res.status(404).json({ msg: `no MainCategory for this id ${id}` });
  }
  res.status(200).json({ data: MainCategories });
});

exports.getOneCategoryForUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const MainCategories = await MainCategoriesModel.findById(id);
  const date = moment(MainCategories["endDate"], "MM/DD/YYYY").toDate();
  const today = moment();
  const pastDate = moment(date, "MM/DD/YYYY");
  if (!MainCategories) {
    res.status(404).json({ msg: `No MainCategory for this id: ${id}` });
  } else {
    if (pastDate.isBefore(today)) {
      res
        .status(404)
        .json({ msg: `The subscription period has expired: ${date}` });
    } else {
      res.status(200).json({
        maincategory: MainCategories["maincategory"],
        subcategory: MainCategories["subcategory"],
        name: MainCategories["name"],
        profileimg: MainCategories["profileimg"],
        mainColor: MainCategories["mainColor"],
      });
    }
  }

  // res.status(200).json({maincategory: MainCategories['maincategory'] , subcategory: MainCategories['subcategory'] ,name:MainCategories['name'] , profileimg:MainCategories['profileimg'] , mainColor:MainCategories['mainColor']});
});

exports.createMainCategories = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const subDomain = req.body.subDomain;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const password = req.body.password;
  const profileimg = req.body.profileimg;
  const mainColor = req.body.mainColor;
  const maincategory = req.body.maincategory;
  const subcategory = req.body.subcategory;
  const MainCategories = await MainCategoriesModel.create({
    name,
    phone,

    profileimg,
    subDomain,
    mainColor,
    startDate,
    endDate,
    password,
    maincategory,
    subcategory,
  });
  res.status(201).json({ data: MainCategories });
});
// , slug:slugify(name)
exports.updateMainCategories = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { phone } = req.body;
  const { subDomain } = req.body;
  const { startDate } = req.body;
  const { endDate } = req.body;
  const { password } = req.body;
  const { maincategory } = req.body;
  const { subcategory } = req.body;
  const { profileimg } = req.body;
  const MainCategory = await MainCategoriesModel.findOneAndUpdate(
    { _id: id },
    {
      name,
      slug: slugify(name),
      phone,
      subDomain,
      startDate,
      endDate,
      password,
      maincategory,
      subcategory,
      profileimg,
    },
    { new: true }
  );
  if (!MainCategory) {
    res.status(404).json({ msg: `no MainCategory for this id ${id}` });
  }
  res.status(200).json({ data: MainCategory });
});

exports.deleteMainCategories = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const MainCategory = await MainCategoriesModel.findByIdAndDelete(id);
  if (!MainCategory) {
    res.status(404).json({ msg: `no MainCategory for this id ${id}` });
  }
  res.status(204).send();
});
