const {Router} = require('express')

const router = new Router()
const UserController = require('../controllers/UserController')

router.post('/register', UserController.register )
router.post('/auth', UserController.login )


module.exports = router