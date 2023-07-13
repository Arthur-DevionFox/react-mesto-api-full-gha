const router = require('express').Router();
const {
  getUsers, getUser, updateUser, updateAvatar, getMe,
} = require('../controllers/user');
const { validateUser, validateUserAvatar, validateUserID } = require('../utils/joiValidate');

router.get('/', getUsers);
router.get('/me', validateUser, getMe);
router.patch('/me', validateUser, updateUser);
router.patch('/me/avatar', validateUserAvatar, updateAvatar);
router.get('/:userId', validateUserID, getUser);

module.exports = router;
