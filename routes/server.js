const router = require('koa-router')()

const save = require('../controller/server/save')
const search = require('../controller/server/search')

router.prefix('/server')

router.post('/save', save)
router.get('/search', search.findAll)
router.get('/checkName', search.checkName)

module.exports = router
