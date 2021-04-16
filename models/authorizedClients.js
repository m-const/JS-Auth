
const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  rolename: {
    type: String,
    required: true,
  },
  parentrole: {
    type: String
  },
  description: {
    type: String,
    required: true,
  },
  system: {
    type: Boolean,
    required: true,
    default: false
  }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const Role = mongoose.model('Role',RoleSchema);

module.exports = Role;