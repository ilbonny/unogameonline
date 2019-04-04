const games = require('../controllers/gamecontroller');

module.exports = app => {
    app.get('/api/game/drawdeck:gameId', games.get);
}