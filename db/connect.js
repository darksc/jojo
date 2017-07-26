/**
 * author     dark
 * date       17/6/12
 */
const Sequelize = require('sequelize')

const sequelize = new Sequelize('super', 'postgres', 'hdsx68714962', {
  host: '192.168.0.226',
  dialect: 'postgres',
  define: {
    timestamps: false
  },

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

module.exports = sequelize

