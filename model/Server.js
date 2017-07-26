/**
 * author     dark
 * date       17/6/12
 */
const Sequelize = require('sequelize')
const sequelize = require('../db/connect')

const Server = sequelize.define('server', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  detail: {
    type: Sequelize.STRING
  },
  ip: {
    type: Sequelize.STRING
  },
  user: {
    type: Sequelize.STRING
  },
  pass: {
    type: Sequelize.STRING
  }
}, {
  tableName: 'server'
})

Server.sync()

module.exports = Server
