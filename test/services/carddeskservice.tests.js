const expect = require('chai').expect;
const carddeskservice = require('../../server/services/carddeskservice')

describe('CardDeskService', function () {

    describe('#create()', function () {
        it('should return one desk card of 60 cards ', function () {
            let result = carddeskservice.create();
            expect(result.length).to.equal(60);
        });
    });

    describe('#shuffle()', function () {
        it('should return shuffle cards array', function () {
            let array = [
                {
                    score : 1,
                    value : 'One',
                    color : 'red'
                },
                {
                    score : 2,
                    value : 'Two',
                    color : 'yellow'
                },
                {
                    score : 3,
                    value : 'Three',
                    color : 'blue'
                }]
            let result = carddeskservice.shuffle(array);
            expect(result).to.not.equal(array);
        });
    });
});