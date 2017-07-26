const router = require('koa-router')()

router.prefix('/port')

router.post('/save', save)

router.get('/search', search.findAll)

router.get('/searchById', search.searchById)

router.get('/checkName', search.checkName)

router.get('/remove', remove)

module.exports = router
