/**
 * author     dark
 * date       17/6/12
 */
const Sequelize = require('sequelize')
const sequelize = require('../db/connect')

const Port = sequelize.define('ports', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  port: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  info: {
    type: Sequelize.STRING
  },
  serverId: {
    type: Sequelize.STRING
  }
}, {
  tableName: 'ports'
})

Port.sync()

module.exports = Port
