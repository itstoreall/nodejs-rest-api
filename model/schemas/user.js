const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Gender } = require('../../helpers/constants');

const contactSchema = new Schema(
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
      default: 'none',
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
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
    // owner: {
    //   type: SchemaTypes.ObjectId,
    //   ref: 'user',
    // },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

contactSchema.virtual('shortContact').get(function () {
  return `This is contact ${this.name} - ${this.phone}`;
});

contactSchema.path('name').validate(value => {
  const re = /[A-Z]\w+/;
  return re.test(String(value));
});

const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;
