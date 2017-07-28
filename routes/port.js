const router = require('koa-router')()

const save = require('../controller/port/save')
const search = require('../controller/port/search')
const remove = require('../controller/port/remove')

router.prefix('/port')

router.post('/save', save.insert)

router.post('/update', save.update)

router.get('/search', search.findAll)

router.get('/searchById', search.searchById)

router.get('/checkName', search.checkName)

router.get('/remove', remove)

module.exports = router
