const router = require('koa-router')()

const save = require('../controller/server/save')
const search = require('../controller/server/search')
const remove = require('../controller/server/remove')

router.prefix('/server')

router.post('/save', save)
router.get('/search', search.findAll)
router.get('/checkName', search.checkName)
router.get('/remove', remove)

module.exports = router
