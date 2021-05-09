const Joi = require('joi');

// POST
const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua'] },
    })
    .required(),
  phone: Joi.string().pattern(new RegExp('^[0-9]{10,13}$')).required(), // eslint-disable-line
});

// PUT
const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua'] },
    })
    .optional(),
  phone: Joi.string().pattern(new RegExp('^[0-9]{10,13}$')).optional(), // eslint-disable-line
}).min(1); // Должно прийти минимум одно поле

// PATCH
const schemaUpdateContactName = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});

// Function Validate
const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};

module.exports.validateCreateContact = (req, _, next) => {
  return validate(schemaCreateContact, req.body, next);
};

module.exports.validateUpdateContact = (req, _, next) => {
  return validate(schemaUpdateContact, req.body, next);
};

module.exports.validateUpdateContactName = (req, _, next) => {
  return validate(schemaUpdateContactName, req.body, next);
};
