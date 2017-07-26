const Sequelize = require('sequelize')
const uuidV4 = require('uuid/v4')
const ApiError = require('../../middlewares/ApiError')
const ErrorNames = require('../../middlewares/ErrorNames')

const Port = require('../../model/Port')


module.exports = async (ctx, next) => {
  try {
    await Port
      .build({
        id: uuidV4(),
        name: ctx.request.body['name'],
        port: ctx.request.body['port'],
        type: ctx.request.body['type'],
        info: ctx.request.body['info'],
        serverId: ctx.request.body['serverId']
      })
      .save()
      .then(port => {
        ctx.body = true
      })
  } catch (error) {
    console.log(error)
    throw new ApiError()
  }

}
