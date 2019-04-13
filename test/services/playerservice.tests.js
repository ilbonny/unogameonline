const expect = require('chai').expect;
const playerservice = require('../../server/services/playerservice')

describe('PlayerService', function () {
    describe('#create()', function () {
        it('should return one players ', function () {
            let users = [
                {
                    userName : 'ilbonny',
                    isAutomatic : false
                }
                ];

            let players = playerservice.create(users);
            expect(players.length).to.equal(1);
            expect(players[0].position).to.equal(1);
            expect(players[0].user.userName).to.equal('ilbonny');
            expect(players[0].user.isAutomatic).to.equal(false);
        });
    });    
});