const uuidV4 = require('uuid/v4')
const ApiError = require('../../middlewares/ApiError')
const ErrorNames = require('../../middlewares/ErrorNames')

const Server = require('../../model/Server')

const insert = async (ctx, next) => {
  try {
    await Server
      .build({
        id: uuidV4(),
        name: ctx.request.body['name'],
        detail: ctx.request.body['detail'],
        ip: ctx.request.body['ip'],
        outIp: ctx.request.body['outIp'],
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

const update = async (ctx, next) => {
  try {
    await Server
      .update(
        {
          detail: ctx.request.body['detail'],
          ip: ctx.request.body['ip'],
          outIp: ctx.request.body['outIp'],
          user: ctx.request.body['user'],
          pass: ctx.request.body['pass']
        },
        {
          where: {
            id: ctx.request.body['id']
          }
        }
      )
      .then(data => {
        ctx.body = true
      })
  } catch (error) {
    console.log(error)
    throw new ApiError()
  }
}

module.exports = {
  insert,
  update
}
