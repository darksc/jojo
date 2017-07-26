const Sequelize = require('sequelize')
const uuidV4 = require('uuid/v4')
const ApiError = require('../../middlewares/ApiError')
const ErrorNames = require('../../middlewares/ErrorNames')

const Port = require('../../model/Port')

const findAll = async (ctx, next) => {
  try {
    await Port.findAll().then(data => {
      ctx.body = data
    })
  } catch (error) {
    console.log(error)
    throw new ApiError()
  }
}

const searchById = async (ctx, next) => {
  try {
    await Port.findOne({
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
    await Port.findOne({
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
