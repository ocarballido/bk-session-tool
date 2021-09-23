const faker = require('faker');

module.exports = Array.from(Array(1000)).map(() => ({
    id: faker.datatype.uuid(),
    name: faker.address.city()
}));