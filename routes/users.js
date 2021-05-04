const {Router} = require('express')

const router = new Router()
const UserController = require('../controllers/UserController')
const PostController = require('../controllers/PostController')
const Auth = require('../middleware/auth')

router.post('/register', UserController.register )
router.post('/auth', UserController.login )
router.get('/me', Auth.user, UserController.me )
router.get('/users/:id/posts', PostController.getAllByUser)
router.get('/users', Auth.admin, UserController.all)

module.exports = router