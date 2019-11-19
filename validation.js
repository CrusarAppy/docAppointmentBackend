const Joi = require("@hapi/joi");

//register validation

const registerValidation = data => {
  const schema = Joi.object({
    Fullname: Joi.string()
      .min(6)
      .required(),

    Username: Joi.string()
      .min(4)
      .required()
      .alphanum(),

    Email: Joi.string()
      .min(6)
      .required()
      .email(),
    Password: Joi.string()
      .min(6)
      .required(),

    Type: Joi.string().min(4),

    Address: Joi.string().required(),
    PhoneNumber: Joi.number().required()
  });
  return schema.validate(data);
};
const loginValidation = data => {
  const schema = Joi.object({
    Email: Joi.string()
      .min(6)
      .required()
      .email(),
    Password: Joi.string()
      .min(6)
      .required()
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;

module.exports.loginValidation = loginValidation;
