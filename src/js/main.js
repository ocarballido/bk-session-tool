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

// var myHeaders = new Headers();
// myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZaFljdmZoN05MVlpvVTNZdlZsOGJ4V0tDQkFJU1dzMDEwSEJPWjZZVG1rIn0.eyJleHAiOjE2MzI0ODgxMDksImlhdCI6MTYzMjQwMTcwOSwianRpIjoiMTk1ZmNjY2QtNjRjZC00OGU3LWI3MGItMGU4YmVjNWY4OWFhIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLXN0YWdpbmcuYmtvb2wuY29tL2F1dGgvcmVhbG1zL2Jrb29sIiwiYXVkIjpbInJlYWxtLW1hbmFnZW1lbnQiLCJhY2NvdW50Il0sInN1YiI6ImU4MjQyM2M0LTVhM2YtNDc3OC04YjJiLTNlZGIyNDAwMTcwNCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImJrb29sLXdlYiIsInNlc3Npb25fc3RhdGUiOiIxNmVmNWVmYS02YjVhLTRmMDYtYjA4MC1hZDI4NTA5ZDEwZjYiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIlJPTEVfVVNFUiIsIlJPTEVfQURNSU4iXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwidmlldy1yZWFsbSIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwicmVhbG0tYWRtaW4iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiIiwic2lkIjoiMTZlZjVlZmEtNmI1YS00ZjA2LWIwODAtYWQyODUwOWQxMGY2IiwibmFtZSI6IlVzdWFyaW8gQWRtaW5XZWJVc2VyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYmtvb2x3ZWIiLCJnaXZlbl9uYW1lIjoiVXN1YXJpbyIsImxvY2FsZSI6ImVzIiwiZmFtaWx5X25hbWUiOiJBZG1pbldlYlVzZXIiLCJlbWFpbCI6ImJrb29sd2ViQGJrb29sLmNvbSJ9.MOBuxkLdnKQM75kaFGAisy451dVIfU16SDTwepU80xIC2hIdltncdp82N0vmMvGtY0JELQBI1dH7ijtUH3h_pdXZfwBPcYZNqA4dxUzouFLxtlXYhPendF9BKogyQSBYW1G89n-WLp1g1FjsnS5dolFumMdIz5PnSbVWbtth3lDFu0rxk8joBnbYIuH5JkJn6VxkuQ0rOTrLK7JC5vttuaVpnBXrLwOu7joPrXn6Cm5JKtM3RJ4EXipuwi_tO-psc9k7rmyatHFQgjzFVC2Ir6jGEsT5TbF7jr16X_O3Hf9MfwjQfTmRskxN2jN-mMKcM36S04OX-FdQ8fTyLmh-8Q");
// myHeaders.append("Cookie", "JSESSIONID=9kXZFLASkjNzDXINzV2rg4DH3I7-0AD2HBpX64rk");

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   redirect: 'follow'
// };

// fetch("https://sessions-staging.bkool.com/sessions/scheduledSessions?offset=0&limit=5", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));



// Get token
// RESULT=`curl -s --data "grant_type=password&client_id=bkool-web&username=bkoolweb&password=bk00lweb" https://auth-staging.bkool.com/auth/realms/bkool/protocol/openid-connect/token`
// TOKEN=`echo $RESULT | sed 's/.*access_token":"//g' | sed 's/".*//g'`
// echo $TOKEN