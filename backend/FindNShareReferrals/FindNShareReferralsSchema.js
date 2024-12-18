let Mongoose = require('mongoose');

let FindNShareReferralsSchema = new Mongoose.Schema({
  id: String,
  LeadName: { type: String, required: true},
  Age: { type: Number, required: false},
  Gender: { type: String, required: true},
  City: { type: String, required: false },
  District: { type: String, required: false},
  ContactNumber: { type: String, required: true},
  WORKerAssigned: { type: String, required: true },
  Country: { type: String, required: false },
  Chapter: { type: String, required: false},
  CreatedOn: { type: Date, default: Date },
  LastModified: { type: Date, default: Date }
});

module.exports = Mongoose.model(
  'FindNShareReferralsSchema',
  FindNShareReferralsSchema
);
