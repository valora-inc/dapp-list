import Joi from 'joi'

export default Joi.object({
  categories: Joi.array().items(
    Joi.object({
      id: Joi.string(),
      name: Joi.string(),
      backgroundColor: Joi.string(),
      fontColor: Joi.string(),
    }),
  ),
  applications: Joi.array().items(
    Joi.object({
      id: Joi.string(),
      name: Joi.string(),
      categoryId: Joi.string(),
      description: Joi.string(),
      logoUrl: Joi.string(),
      url: Joi.string(),
    }),
  ),
})
