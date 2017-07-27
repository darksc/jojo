const ApiError = require('../../middlewares/ApiError')
const ErrorNames = require('../../middlewares/ErrorNames')

const Server = require('../../model/Server')

const findAll = async (ctx, next) => {
  try {
    await Server.findAll().then(data => {
      ctx.body = data
    })
  } catch (error) {
    console.log(error)
    throw new ApiError()
  }
}

const searchById = async (ctx, next) => {
  try {
    await Server.findOne({
      where: {
        id: ctx.query['id']
      }
    }).then(data => {
      ctx.body = data
    })
  } catch (error) {
    console.log(error)
    throw new ApiError()
  }
}

const checkName = async (ctx, next) => {
  try {
    await Server.findOne({
      where: {
        name: ctx.query['name']
      }
    }).then(data => {
      if (data === null) {
        ctx.body = true
      } else {
        ctx.body = false
      }

    })
  } catch (error) {
    console.log(error)
    throw new ApiError()
  }
}
module.exports = {
  findAll,
  searchById,
  checkName
}
