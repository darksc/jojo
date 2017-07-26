const dev_env = require('./dev.env')
const prod_env = require('./prod.env')

module.exports = {
  dev: dev_env,
  prod: prod_env
}[process.env.NODE_ENV || 'prod']
