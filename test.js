const assert = require('assert');
const { data } = require('./data.js');
const { AnimalFilter } = require('./app');

describe('AnimalFilter', () => {
    describe('#filterAnimals', () => {
        it('should filter animals based on the pattern ry', () => {
            const filteredData = AnimalFilter.filterAnimals(data, 'ry');

            assert.strictEqual(filteredData.length, 2);

            const [firstFiltered, secondFiltered] = filteredData;

            assert.strictEqual(firstFiltered.people.length, 1);
            assert.strictEqual(secondFiltered.people.length, 1);

            const firstPerson = firstFiltered.people[0];
            const secondPerson = secondFiltered.people[0];

            assert.strictEqual(firstPerson.animals.length, 1);
            assert.strictEqual(secondPerson.animals.length, 1);

            assert.strictEqual(firstPerson.animals[0].name, 'John Dory');
            assert.strictEqual(secondPerson.animals[0].name, 'Oryx');
        });

        it('should handle empty filter result', () => {
            const filteredData = AnimalFilter.filterAnimals(data, 'nonexistent');
            assert.strictEqual(filteredData.length, 0);
        });
    });

    describe('#countPeopleAndAnimals', () => {
        it('should count people and animals', () => {
            const countedData = AnimalFilter.countPeopleAndAnimals(data);
            assert.strictEqual(countedData.length, data.length);

            const [firstCounted, secondCounted, thirdCounted, fourthCounted, fifthCounted] = countedData;

            assert.strictEqual(firstCounted.people.length, 5);
            assert.strictEqual(secondCounted.people.length, 8);
            assert.strictEqual(thirdCounted.people.length, 7);
            assert.strictEqual(fourthCounted.people.length, 7);
            assert.strictEqual(fifthCounted.people.length, 5);

            const [firstPerson, secondPerson, thirdPerson, fourthPerson, fifthPerson] = firstCounted.people;

            assert.strictEqual(firstPerson.name, 'Winifred Graham [6]');
            assert.strictEqual(secondPerson.name, 'Blanche Viciani [8]');
            assert.strictEqual(thirdPerson.name, 'Philip Murray [7]');
            assert.strictEqual(fourthPerson.name, 'Bobby Ristori [9]');
            assert.strictEqual(fifthPerson.name, 'Louise Pinzauti [5]');
        });
    });
});
