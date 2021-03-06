const Joi = require('joi')

const schemaUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(10).required(),
})

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj)
  if (error) {
    return next({
      status: 400,
      message: 'Ошибка от Joi или другой валидационной библиотеки',
      data: 'Bad request',
    })
  }
  next()
}

module.exports.schemaUser = (req, res, next) => {
  return validate(schemaUser, req.body, next)
}
