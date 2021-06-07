const mongoose = require('mongoose');
const { Schema } = mongoose;
const gravatar = require('gravatar');
const { Gender } = require('../../helpers/constants');
const bcrypt = require('bcryptjs');
const SALT_FACTOR = 6;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 2,
      default: 'Guest',
    },
    gender: {
      type: String,
      enum: {
        values: [Gender.MALE, Gender.FEMALE, Gender.NONE],
        message: 'But it not allowed',
      },
      default: Gender.NONE,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/gi;
        return re.test(String(value).toLowerCase());
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
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
    avatar: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: 250 }, true); // s - size, false - http, true - https
      },
    },
    userIdImg: {
      type: String,
      default: null,
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

    // User encryption
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Password validation check
userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(String(password), this.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;
