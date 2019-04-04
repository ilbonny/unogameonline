
const enumCard = require('./enum');

const Card = {
  Color: enumCard.CardColor.Blue,
  CardValue: enumCard.CardValue.Zero,
  Score: 0,
  PlayerDiscard: 0
};

module.exports = { Card }
