/**
 * author     dark
 * date       17/6/12
 */
const Sequelize = require('sequelize')
const sequelize = require('../db/connect')

const User = sequelize.define('t_user', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING
  }
}, {
  tableName: 't_user'
})

User.sync()

module.exports = User
