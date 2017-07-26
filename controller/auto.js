const GL_LX = require('../model/GL_LX')

module.exports = async (ctx, next) => {
  const lxbm = ctx.query.lxbm

  await GL_LX.findAll({
    where: {
      lxbm: {
        $like: `%${lxbm}%`
      },
      sxxfx: '1'
    },
    attributes: [['lxbm', 'code'], ['lxmc', 'name'], 'qdzh', 'zdzh']
  }).then(data => {
    ctx.body = data
  })
}
