const Sequelize = require('sequelize')
const Nearby = require('../model/Nearby')

module.exports = async (ctx, next) => {
  const layer = ctx.query.layer,
    longitude = ctx.query.longitude,
    latitude = ctx.query.latitude,
    distance = ctx.query.distance,
    nearby = new Nearby(layer)

  await nearby.findAll({
    where: Sequelize.fn(
      'ST_DWithin',
      Sequelize.fn('ST_Transform', Sequelize.fn('ST_GeomFromText', 'POINT(' + longitude + ' ' + latitude + ')', 4326), 26986),
      Sequelize.fn('ST_Transform', Sequelize.col('geom'), 26986),
      distance)
  }).then(data => {
    ctx.body = data
  })
}
