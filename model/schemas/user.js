const mongoose = require('mongoose');
const { Schema, SchemaTypes } = mongoose;
const { Gender } = require('../../helpers/constants');
const bcrypt = require('bcryptjs');
const SALT_FACTOR = 6;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 2,
    },
    gender: {
      type: String,
      enum: {
        values: [Gender.MALE, Gender.FEMALE, Gender.NONE],
        message: 'But it not allowed',
      },
      default: Gender.NONE,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate(value) {
        const re = /\s+@\s+\.s+/gi;
        return re.test(String(value).toLowerCase());
      },
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    owner: {
      type: SchemaTypes.ObjectId, // id from mongoose
      ref: 'user', // ref link to user collection
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

// Hook
userSchema.pre('save', async function (next) {
  // if the password has been changed
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.method.validPassword = async function (password) {
  return await bcrypt.compare(String(password), this.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;
