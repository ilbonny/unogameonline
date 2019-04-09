const CardColor = {
  Red: 0,
  Blue: 1,
  Yellow: 2,
  Green: 3
};

const CardValue = Object.freeze({
  "Zero": 0,
  "One": 1,
  "Two": 2,
  "Three": 3,
  "Four": 4,
  "Five": 5,
  "Six": 6,
  "Seven": 7,
  "Eight": 8,
  "Nine": 9,
  "Reverse": 21,
  "Skip": 22,
  "DrawTwo": 25,
  "Wild": 40,
  "DrawFour": 50,
  "Cover": 51
});

module.exports = { CardColor, CardValue }