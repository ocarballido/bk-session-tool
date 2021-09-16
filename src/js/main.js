// Load Bootstrap JS
import bootstrap from 'bootstrap'

// Load Styles
import '../scss/main.scss';

// App code
// https://backend.pagesgitlab.bkooltech.com/bkool-session-api/
// https://sessions-lab.bkool.com/sessions/scheduledSessions?limit=5&userId=b949a83a-6de6-4787-808e-12c8951afb41&profileId=1be4fd71-ef3d-4556-bd87-ea3fc2c9e273&eventId=GIV2021&startDate=2016-05-18T16%3A00%3A00.000Z&endDate=2016-05-18T16%3A00%3A00.000Z&featuredUserId=b949a83a-6de6-4787-808e-12c8951afb41

// const limit = 10;
// const profileId = '';
// const eventId = '';
// const startDate = '';
// const endDate = '';
// const featuredUserId = '';
// const userId = '';
// const APIUrl = `https://sessions-lab.bkool.com/sessions/scheduledSessions?limit=${limit}&userId=${userId}&profileId=${profileId}&eventId=${eventId}&startDate=${startDate}&endDate=${endDate}&featuredUserId=${featuredUserId}`;

// const loadSessions = async () => {
//     try {
//         const result = await fetch(APIUrl);
//         const sessions = await result.json();
//         console.log(sessions);
//         // return sessions;
//     } catch (error) {
//         console.log(error);
//     }
// };
// loadSessions();

// console.log(`Hello ${process.env.HELLO}`);

const host = 'http://localhost:3000';

const loadClientes = () => new Promise((resolve, reject) => {
    fetch(`${host}/clientes`)
        .then(response => {
            if (response.ok) {
                response.json()
                    .then(clientes => resolve(clientes));
            } else {
                reject();
            }
        })
        .catch(() => reject());
});

loadClientes()
    .then(clientes => console.log(clientes))
    .catch((error) => console.log(error));