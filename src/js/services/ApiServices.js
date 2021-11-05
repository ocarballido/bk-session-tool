import Keycloak from 'keycloak-js';
import { keycloak } from '../helpers/const';

// let keycloak = new Keycloak({
//     url: 'https://auth-staging.bkool.com/auth',
//     realm: 'bkool',
//     clientId: 'bkool-web'
// });

// keycloak.init({
//     onLoad: 'login-required',
//     checkLoginIframe: false
// }).then(function(authenticated) {
//     if(authenticated == false) { keycloak.login() } 
//     else {
//         sessionStorage.setItem('accessToken', keycloak.token);
//     }
// });

const SCHEDULED_SESSIONS_SERVER_RPUNDS = `https://sessions-staging.bkool.com/sessions/scheduledSessions/availableRounds`;
const SCHEDULED_SESSIONS_SERVER = `https://sessions-staging.bkool.com/sessions/scheduledSessions`;
const SESSIONS_SERVER = `https://api-staging.bkool.com/api/v1.0/profiles`;
const EVENTS_SERVER = `https://events-staging.bkool.com/events`;
const USERS_SERVER = `https://users-staging.bkool.com/users`;
// let ACCESS_TOKEN = sessionStorage.getItem('accessToken');
let ACCESS_TOKEN = '';

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

const fetchDb = (endpoint, method, data) => {
    
    const options = { method, redirect: 'follow' };

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${keycloak.token}`);
    // myHeaders.append("Cookie", "JSESSIONID=9kXZFLASkjNzDXINzV2rg4DH3I7-0AD2HBpX64rk");

    if (data) {
        if (method === METHODS.GET) {
            const params = new URLSearchParams(data);
            endpoint += `?${params.toString()}`;
            console.log(endpoint)
        } else {
            myHeaders.append('Content-Type', 'application/json');
            options.body = JSON.stringify(data);
        }
    }

    options.headers = myHeaders;

    return new Promise((resolve, reject) => {
        fetch(endpoint, options)
            .then(response => {
                if (response.ok) {
                    if (method === METHODS.GET) {
                        if (response.status === 204) {
                            console.log('204');
                            resolve([]);
                        } else {
                            response
                                .json()
                                .then(json => resolve(json))
                                .catch(error => reject(error));
                        }
                    } else {
                        response
                            .text()
                            .then(text => resolve(text));
                    }
                } else {
                    reject('Server error');
                }
            })
            .catch(error => reject(error));

    });
};

class ApiServices {
    // Check for token
    checkForToken() {
        // let keycloak = new Keycloak({
        //     url: 'https://auth-staging.bkool.com/auth',
        //     realm: 'bkool',
        //     clientId: 'bkool-web'
        // });

        return new Promise((resolve, reject) => {
            keycloak.init({
                onLoad: 'login-required',
                checkLoginIframe: false
            }).then(function(authenticated) {
                if(authenticated == false) { keycloak.login() } 
                else {
                    resolve(keycloak.token);
                    // sessionStorage.setItem('loggedUserId', keycloak.subject);
                    // console.log(keycloak.subject)
                    // console.log(keycloak.token.getSubject());
                }
            });
        });
    }

    // Load featured users
    loadFeaturedUsers() {
        return fetchDb(
            USERS_SERVER,
            METHODS.GET
        );
    }

    // Load events
    loadEvents() {
        return fetchDb(
            EVENTS_SERVER,
            METHODS.GET
        );
    }

    // Load scheduled sessions
    loadScheduledSessions(filterObject) {
        return fetchDb(
            SCHEDULED_SESSIONS_SERVER_RPUNDS,
            // END_POINT,
            METHODS.GET,
            filterObject
        );
    }

    // Load sessions
    loadSessions() {
        return fetchDb(
            SESSIONS_SERVER,
            METHODS.GET
        );
    }

    // Load sigle session
    loadSingleSession(id) {
        return fetchDb(
            `${SESSIONS_SERVER}/${id}`,
            METHODS.GET
        );
    }

    // Delete session
    deleteScheduledSession(id) {
        return fetchDb(
            `${SCHEDULED_SESSIONS_SERVER}/${id}`,
            METHODS.DELETE
        );
    }

    // Update scheduled sessions rounds definition
    updateScheduledSession(id, data) {
        return fetchDb(
            `${SCHEDULED_SESSIONS_SERVER}/${id}`,
            METHODS.PUT,
            { ...data }
        );
    }

    // Add new scheduled session
    addScheduledSession(data) {
        return fetchDb(
            `${SCHEDULED_SESSIONS_SERVER}`,
            METHODS.POST,
            { ...data }
        );
    }
}

// https://sessions-lab.bkool.com/sessions/scheduledSessions?limit=5&userId=b949a83a-6de6-4787-808e-12c8951afb41&profileId=1be4fd71-ef3d-4556-bd87-ea3fc2c9e273&eventId=GIV2021&startDate=2016-05-18T16%3A00%3A00.000Z&endDate=2016-05-18T16%3A00%3A00.000Z&featuredUserId=b949a83a-6de6-4787-808e-12c8951afb41

const apiServices = new ApiServices();

export { apiServices };