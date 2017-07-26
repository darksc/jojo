const router = require('koa-router')()

const fragments = require('../controller/fragments')
const auto = require('../controller/auto')
const translate = require('../controller/translate')
const nearby = require('../controller/nearby')

router.get('/', async (ctx, next) => {
  await ctx.render('index')
})

// 动态分段服务
router.get('/fragments', fragments)

// 模糊查询 路线编码
router.get('/auto', auto)

// 桩号转换
router.get('/translate', translate)

// 周边搜索
router.get('/nearby', nearby)

module.exports = router
