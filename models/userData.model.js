const mongoose = require("mongoose");

const userDataSchema = mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  photo: { type: String, required: true },
  userID: { type: String, required: true },
});

const UserDataModel = mongoose.model("userData", userDataSchema);

module.exports = {
  UserDataModel,
};
