const router = require('koa-router')()
const User = require('../model/user')

router.prefix('/users')

router.get('/', async (ctx, next) => {
  await User.findAll().then(users => {
    ctx.body = users
  })
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
