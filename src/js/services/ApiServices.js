const SCHEDULED_SESSIONS_SERVER_RPUNDS = `https://sessions-staging.bkool.com/sessions/scheduledSessions/availableRounds`;
const SCHEDULED_SESSIONS_SERVER = `https://sessions-staging.bkool.com/sessions/scheduledSessions`;
const SESSIONS_SERVER = `https://api-staging.bkool.com/api/v1.0/profiles`;
const EVENTS_SERVER = `https://events-staging.bkool.com/events`;
const USERS_SERVER = `https://users-staging.bkool.com/users`;
const ACCESS_TOKEN = sessionStorage.getItem('accessToken');

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

const fetchDb = (endpoint, method, data) => {
    
    const options = { method, redirect: 'follow' };

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
    // myHeaders.append("Cookie", "JSESSIONID=9kXZFLASkjNzDXINzV2rg4DH3I7-0AD2HBpX64rk");

    if (data) {
        if (method === METHODS.GET) {
            const params = new URLSearchParams(data);
            endpoint += `?${params.toString()}`;
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