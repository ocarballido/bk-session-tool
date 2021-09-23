const faker = require('faker');
const sessions = require('./sessions');
const users = require('./users');

module.exports = (
    startDate,
    endDate,
    limit
) => {
    return Array.from(Array(limit)).map(() => {
        const session = sessions[Math.floor(Math.random() * sessions.length)];
        return {
            id: session.id,
            userId: faker.datatype.number(),
            profileId: faker.datatype.uuid(),
            sessionId: faker.datatype.number(),
            eventId: faker.datatype.uuid(),
            maxUsers: faker.datatype.number(200),
            rules: 'COMPETITIVE',
            isRealWeather: faker.datatype.boolean(),
            launchOptions: {
                maxInstances: faker.datatype.number(2, 5),
                maxSeconds: faker.datatype.number(250, 500)
            },
            warmupSeconds: faker.datatype.number(100, 700),
            mainPartMinSeconds: faker.datatype.number(100, 700),
            roundsDefinition: Array.from(Array(Math.floor(Math.random() * 10) + 1)).map(() => {
                const user = users[Math.floor(Math.random() * users.length)];
                const date = new Date(startDate);
                const end = new Date(date.setDate(date.getDate() + 2)).toString();
                return {
                    startDate: faker.date.between(startDate, end),
                    featuredUserIds: user.id
                };
            })
        }
    });
};