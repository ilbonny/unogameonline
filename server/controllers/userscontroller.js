
const usersService = require('../services/usersservice');

exports.post = (req, res) => {
    var user = req.body;
    usersService.addUser(user);
    res.status(200).send(user);
}