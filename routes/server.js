const router = require('koa-router')()

const save = require('../controller/server/save')
const search = require('../controller/server/search')
const remove = require('../controller/server/remove')

router.prefix('/server')

router.post('/save', save.insert)

router.post('/update', save.update)

router.get('/search', search.findAll)

router.get('/searchById', search.searchById)

router.get('/checkName', search.checkName)

router.get('/remove', remove)

module.exports = router
