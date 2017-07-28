const ApiError = require('../../middlewares/ApiError')
const ErrorNames = require('../../middlewares/ErrorNames')

const Server = require('../../model/Server')
const Port = require('../../model/Port')


module.exports = async (ctx, next) => {
  try {
    await Server
      .destroy({
        where: {
          id: ctx.query['id']
        }
      })
      .then(async server => {
        await Port
          .destroy({
            where: {
              serverId: ctx.query['id']
            }
          })
          .then(server => {
            ctx.body = true
          })
      })
  } catch (error) {
    console.log(error)
    throw new ApiError()
  }

}
