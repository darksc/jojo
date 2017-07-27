const uuidV4 = require('uuid/v4')
const ApiError = require('../../middlewares/ApiError')
const ErrorNames = require('../../middlewares/ErrorNames')

const Server = require('../../model/Server')


module.exports = async (ctx, next) => {
  try {
    await Server
      .build({
        id: uuidV4(),
        name: ctx.request.body['name'],
        detail: ctx.request.body['detail'],
        ip: ctx.request.body['ip'],
        user: ctx.request.body['user'],
        pass: ctx.request.body['pass']
      })
      .save()
      .then(server => {
        ctx.body = true
      })
  } catch (error) {
    console.log(error)
    throw new ApiError()
  }

}
