/**
 * author     dark
 * date       17/6/12
 */
const Sequelize = require('sequelize')
const sequelize = require('../db/connect')

module.exports = class Nearby {

  constructor(layer_name){
    const nearby = sequelize.define(layer_name, {
      gid: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      lxbm: {
        type: Sequelize.STRING
      },
      geom: {
        type: Sequelize.STRING
      }
    }, {
      tableName: layer_name
    })

    nearby.sync()

    return nearby
  }
}
