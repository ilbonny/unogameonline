const enumGame = require('../models/enum');

create = ()=>{
    let cards = [];

    enumGame.CardColor.forEach(color => {
        enumGame.CardValue.forEach(val =>{
            if(val !== enumGame.CardValue.Cover) {
                let card = {
                    color : color,
                    value : val,
                    score : val
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

module.exports = {create}