const games = require('../controllers/gamecontroller');

module.exports = app => {
    app.get('/api/game/drawdeck:gameId', games.get);
    app.post('/api/game/playerturn', games.post);
}