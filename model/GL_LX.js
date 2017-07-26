/**
 * author     dark
 * date       17/6/12
 */
const Sequelize = require('sequelize')
const sequelize = require('../db/connect')

const GL_LX = sequelize.define('gl_lx', {
  gid: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  sxxfx: {
    type: Sequelize.STRING
  },
  geom: {
    type: Sequelize.GEOMETRY
  }
}, {
  tableName: 'gl_lx'
})

GL_LX.sync()

module.exports = GL_LX
