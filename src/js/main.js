// Load Bootstrap JS
import bootstrap from 'bootstrap'

// Load Styles
import '../scss/main.scss';

import { app } from './controllers/Controller';

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

// const host = 'http://localhost:3001';

// const loadSessions = () => new Promise((resolve, reject) => {
//     fetch(`${host}/scheduledSessions`)
//         .then(response => {
//             if (response.ok) {
//                 response.json()
//                     .then(scheduledSessions => resolve(scheduledSessions));
//             } else {
//                 reject();
//             }
//         })
//         .catch(() => reject());
// });

// loadSessions()
//     .then(scheduledSessions => console.log(scheduledSessions))
//     .catch((error) => console.log(error));

const dataModelExample = [
    {
        sessionName: "Nombre de sesión",
        sessionID: 546546546565,
        sessionRounds: [
            {
                startDate: "7/5/2022",
                times: [
                    "09:00",
                    "11:00",
                    "13:00"
                ]
            },
            {
                startDate: "8/5/2022",
                times: [
                    "09:00",
                    "11:00"
                ]
            },
            {
                startDate: "9/5/2022",
                times: [
                    "09:00",
                    "11:00",
                    "13:00",
                    "15:00",
                    "18:00",
                    "19:00",
                    "20:00",
                    "22:00"
                ]
            },
        ]
    }
];

