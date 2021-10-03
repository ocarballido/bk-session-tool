const { internet } = require('faker');
const faker = require('faker');

module.exports = Array.from(Array(1000)).map(() => ({
    id: faker.datatype.number(),
    externalSecurityId: faker.datatype.number(),
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    description: faker.name.title(),
    email: faker.internet.email(),
    socialLinks: {
        linkedin: internet.url(),
        facebook: internet.url()
    }
}));