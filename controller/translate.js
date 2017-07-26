const Sequelize = require('sequelize')
// 抽稀算法
const simplify = require('simplify-geometry')

const ApiError = require('../middlewares/ApiError')
const ErrorNames = require('../middlewares/ErrorNames')

const redis = require('../db/redis')
const GL_LX = require('../model/GL_LX')

// 数据处理算法
const Geom = require('../utils/geom')

module.exports = async (ctx, next) => {
  const lxbm = ctx.query.lxbm,
    sxxfx = ctx.query.sxxfx,
    zh = ctx.query.zh,
    geom = new Geom()

  if (!lxbm) {
    throw new ApiError()
  }
  await redis.getAsync(`map-service-${sxxfx}-${lxbm}`)
    .then( async (res) => {
      if (res == null) {
        // 数据库查询
        await GL_LX.findOne({
          where: {
            lxbm: lxbm,
            sxxfx: sxxfx
          },
          attributes: [[Sequelize.fn('ST_AsText', Sequelize.col('geom')), 'geom'], 'sxxfx', 'lxmc', 'lxbm', 'tjlc']
        }).then(data => {
          let road = data
          // wkt 转换 数组
          const new_data = [simplify(geom.wkt2array(road.geom)[0], 0.00001)]

          let coord = []
          for (let i = 0; i < new_data.length; i++) {
            coord.push(geom.fragments(new_data[i], zh, sxxfx))
          }
          delete road.dataValues.geom
          const feature = {
            attributes: road,
            geometry: coord[0]
          }
          ctx.body = feature
          redis.set(`map-service-${sxxfx}-${lxbm}`, JSON.stringify(new_data), Redis.print)
          redis.set(`map-service-info-${sxxfx}-${lxbm}`, JSON.stringify(road), Redis.print)
        })
      } else {
        await redis.getAsync(`map-service-info-${sxxfx}-${lxbm}`)
          .then((res2) => {
            // 从缓存获取
            let coord = []
            const new_data = JSON.parse(res)
            for (let i = 0; i < new_data.length; i++) {
              coord.push(geom.m2coord(new_data[i], zh, sxxfx))
            }
            res2 = JSON.parse(res2)
            const feature = {
              attributes: res2,
              geometry: coord[0]
            }
            ctx.body = feature
          })
      }
    })
}
