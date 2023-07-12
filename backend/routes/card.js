const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/card');
const { validateCardID, validateCard } = require('../utils/joiValidate');

router.get('/', getCards);
router.post('/', validateCard, createCard);
router.delete('/:cardId', validateCardID, deleteCard);
router.put('/:cardId/likes', validateCardID, likeCard);
router.delete('/:cardId/likes', validateCardID, dislikeCard);

module.exports = router;
