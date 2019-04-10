
const gameservice = require('../services/gameservice');

exports.get = (req, res) =>{
    var gameId = req.params.gameId;
    res.status(200).send({send : 'Hello'});
}

exports.post = (req,res)=>{
    gameservice.playerTurnExecute(req.body)
    res.status(200).send({send : 'Hello'});
}