import Joi from 'joi'

const colorCodePattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

export default Joi.object({
  categories: Joi.array().items(
    Joi.object({
      id: Joi.string(),
      name: Joi.string(),
      backgroundColor: Joi.string().pattern(colorCodePattern),
      fontColor: Joi.string().pattern(colorCodePattern),
    }),
  ),
  applications: Joi.array().items(
    Joi.object({
      id: Joi.string(),
      name: Joi.string(),
      categoryId: Joi.string(),
      description: Joi.string(),
      logoUrl: Joi.string().uri(),
      url: Joi.string().uri(),
    }),
  ),
})
