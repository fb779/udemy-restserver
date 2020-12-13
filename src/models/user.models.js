const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

const {rolesValid, rolesValues} = require('./../config/config.js');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {type: String, required: [true, 'El Apellido es necesario']},
    email: {type: String, unique: true, required: [true, 'El correo es necesario'], lowercase: true},
    password: {type: String, required: [true, 'La contraseña es necesario']},
    img: {type: String, required: false, default: ''},
    role: {type: String, default: rolesValues.user, enum: rolesValid, uppercase: true},
    google: {type: Boolean, default: false},
    state: {type: Boolean, default: true},
  },
  {timestamps: true, collection: 'users'}
);

UserSchema.plugin(uniqueValidator, {message: '{PATH} is not unique'});

/**
 * Hook to before to save user to encrypt password
 */
UserSchema.pre('save', function (next) {
  const user = this;

  if (user.isNew && user.isModified('password')) {
    user.password = this.encryptPasswordSync(user.password);
  }

  return next();
});

/**
 * Hook to before to update user to encrypt password
 */
UserSchema.pre('findOneAndUpdate', function (next) {
  const user = this.getUpdate();
  const thi$ = this.schema;

  if (user.password) {
    user.password = thi$.methods.encryptPasswordSync(user.password);
  }

  return next();
});

/**
 * sync method to encript password
 */
UserSchema.methods.encryptPasswordSync = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

// UserSchema.methods.encryptPassword = async (password) => {
//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(password, salt);
//   return hash;
// };

/**
 * method to verify password
 **/
UserSchema.methods.verifyPasswordSync = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// UserSchema.methods.verifyPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

/**
 * method of remove password to response
 */
UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('User', UserSchema);
