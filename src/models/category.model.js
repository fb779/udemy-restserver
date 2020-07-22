const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    name: { type: String, required: [true, 'The name is required'], unique: true, uppercase: true },
    description: { type: String, required: true },
    state: { type: Boolean, default: true },
  },
  { timestamps: true, collection: 'category' }
);

CategorySchema.plugin(uniqueValidator, { message: '{PATH} is not unique' });

/**
 * method of remove password to response
 */
// CategorySchema.methods.toJSON = function () {
//   const userObject = this.toObject();
//   return userObject;
// };

module.exports = mongoose.model('Category', CategorySchema);
