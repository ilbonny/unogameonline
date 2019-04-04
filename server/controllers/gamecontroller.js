
exports.get = (req, res) =>{
    var gameId = req.params.gameId;
    res.status(200).send({send : 'Hello'});
}