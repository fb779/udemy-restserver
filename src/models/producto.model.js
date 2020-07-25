const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: [true, 'El nombre es necesario'], uppercase: true, unique: true },
  price: { type: Number, required: [true, 'El precio únitario es necesario'] },
  description: { type: String, required: false },
  state: { type: Boolean, default: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

ProductSchema.plugin(uniqueValidator, { message: `{PATH} is not unique` });

module.exports = mongoose.model('Producto', ProductSchema);
