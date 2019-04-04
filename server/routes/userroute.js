const users = require('../controllers/userscontroller');

module.exports = app => {
    app.post('/api/users/add', users.post);
}