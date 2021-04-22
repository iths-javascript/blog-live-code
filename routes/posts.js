const {Router} = require('express')

const router = new Router()
const PostController = require('../controllers/PostController')
const Auth = require('../middleware/auth')

router.post('/', Auth.user, PostController.create )
router.get('/', Auth.user, PostController.getAll )
router.get('/:id', PostController.getOne )
// router.patch('/:id', PostController.udpate )
// router.delete('/:id', PostController.delete )

module.exports = router