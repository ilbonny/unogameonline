const enumGame = require('../models/enum');

create = ()=>{
    let cards = [];

    let cardcolors = Object.keys(enumGame.CardColor);
    let cardvalues = Object.keys(enumGame.CardValue);

    cardcolors.forEach(color => {
         cardvalues.forEach(val =>{
             if(val !== "Cover") {
                 let card = {
                     color : color,
                     value : val,
                     score : enumGame.CardValue[val]
                 }
                 cards.push(card)
             }            
         })
    });

    return cards.sort((a,b)=>{
        if(a.Color < b.Color) return 1;
        if(b.Color < a.Color) return -1;
        return 0;
    }) 
}

shuffle = (array) =>{
    array.sort(() => Math.random() - 0.5);
}

module.exports = {create,shuffle}