let Mongoose = require('mongoose');

let UserSchema = new Mongoose.Schema({
  id: String,
  Username: { type: String, required: true},
  Password: { type: String, required: true},
  Email: { type: String, required: true },
  Role: { type: String, required: true, default: 1},// 0-SuperAdmin,  1-Admin, 2-WORKer
  CreatedOn: { type: Date, default: Date },
  LastModified: { type: Date, default: Date }
});

module.exports = Mongoose.model(
  'UserSchema',
  UserSchema
);
