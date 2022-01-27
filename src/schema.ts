import Joi from 'joi'

const colorCodePattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

export default Joi.object({
  categories: Joi.array()
    .items(
      Joi.object({
        id: Joi.string(),
        name: Joi.string(),
        backgroundColor: Joi.string().pattern(colorCodePattern),
        fontColor: Joi.string().pattern(colorCodePattern),
      }),
    )
    .unique((category0, category1) => {
      const uniqueProperties = ['id', 'name', 'backgroundColor', 'fontColor']
      return uniqueProperties
        .map((property) => category0[property] === category1[property])
        .some((value) => value)
    }),
  applications: Joi.array()
    .items(
      Joi.object({
        id: Joi.string(),
        name: Joi.string(),
        categoryId: Joi.string(),
        description: Joi.string(),
        logoUrl: Joi.string().uri(),
        url: Joi.string().uri(),
      }),
    )
    .unique((application0, application1) => {
      const uniqueProperties = ['id', 'name', 'description']
      return uniqueProperties
        .map((property) => application0[property] === application1[property])
        .some((value) => value)
    }),
})
