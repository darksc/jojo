const Sequelize = require('sequelize')
const uuidV4 = require('uuid/v4')
const ApiError = require('../../middlewares/ApiError')
const ErrorNames = require('../../middlewares/ErrorNames')

const Port = require('../../model/Port')


module.exports = async (ctx, next) => {
  try {
    await Port
      .destroy({
        where: {
          id: ctx.query['id']
        }
      })
      .then(port => {
        ctx.body = port > 0 ? true : false
      })
  } catch (error) {
    console.log(error)
    throw new ApiError()
  }

}
