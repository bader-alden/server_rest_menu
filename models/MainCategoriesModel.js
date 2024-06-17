const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const MainCategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "name is required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "emaisubDomainl is required"],
    },
    subDomain: {
      type: String,
      required: [true, "emaisubDomainl is required"],
      unique: true,
      lowercase: true,
    },
    endDate: {
      type: String,
      required: [true, "emaisubDomainl is required"],
    },
    profileimg: {
      type: String,
      required: [true, "emaisubDomainl is required"],
    },
    mainColor: {
      type: String,
      required: [true, "emaisubDomainl is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLingth: [6, "Too short password"],
      maxLingth: [12, "Too long password"],
    },
    maincategory: {
      type: [String],
      required: true,
    },
    subcategory: [
      {
        maincategory: String,
        name: String,
        price: String,
        img: String,
        des: String,
      },
    ],
  },

  // },
  { timestamps: true }
);

MainCategoriesSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const MainCategoriesModel = mongoose.model(
  "MainCategories",
  MainCategoriesSchema
);

module.exports = MainCategoriesModel;
