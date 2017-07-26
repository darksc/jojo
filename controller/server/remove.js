const Sequelize = require('sequelize')
const uuidV4 = require('uuid/v4')
const ApiError = require('../../middlewares/ApiError')
const ErrorNames = require('../../middlewares/ErrorNames')

const Server = require('../../model/Server')


module.exports = async (ctx, next) => {
  try {
    console.log(ctx.query['id'])
    await Server
      .destroy({
        where: {
          id: ctx.query['id']
        }
      })
      .then(server => {
        ctx.body = server > 0 ? true : false
      })
  } catch (error) {
    console.log(error)
    throw new ApiError()
  }

}
