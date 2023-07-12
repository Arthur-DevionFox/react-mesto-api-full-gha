const Card = require('../models/card');
const handleError = require('../middlewares/handleError');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const BadForbidden = require('../errors/BadForbidden');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => new NotFoundError('Что-то пошло не так'));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card, id: req.params.cardId }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Введенные данные не верны'));
      }
      return next(handleError);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      const { owner } = card;
      const user = req.user._id;
      if (!card) {
        return next(new NotFoundError('Такой карточки не существует'));
      }
      if (owner.toString() !== user.toString()) {
        return next(new BadForbidden('У вас нет прав на выполнение данного действия'));
      }
      return card.deleteOne().then(() => res.status(200).send({ message: 'Карточка успешно удалена' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('Введенные данные не верны'));
      }
      return next();
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Такой карточки не существует'));
      }
      return res.status(200).send({ message: 'Лайк поставлен' });
    })
    .catch(() => next(new ValidationError('Произошла ошибка')));
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Такой карточки не существует'));
      }
      return res.status(200).send({ message: 'Лайк удален' });
    })
    .catch(() => next(new ValidationError('произошла ошибка')));
};
