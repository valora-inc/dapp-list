import Joi from 'joi'

const colorCodePattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

export const schema = Joi.object({
  categories: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        backgroundColor: Joi.string().pattern(colorCodePattern).required(),
        fontColor: Joi.string().pattern(colorCodePattern).required(),
      }),
    )
    .min(1)
    .unique((category0, category1) => {
      const uniqueProperties = ['id', 'name', 'backgroundColor', 'fontColor']
      return uniqueProperties
        .map((property) => category0[property] === category1[property])
        .some((value) => value)
    })
    .required(),
  applications: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        categoryId: Joi.string().required(),
        description: Joi.string().required(),
        logoUrl: Joi.string().uri().required(),
        url: Joi.string().replace('{{address}}', '').uri().required(),
      }),
    )
    .min(1)
    .unique((application0, application1) => {
      const uniqueProperties = ['id', 'name', 'description']
      return uniqueProperties
        .map((property) => application0[property] === application1[property])
        .some((value) => value)
    })
    .required(),
})
