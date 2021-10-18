   
const HOST = 'http://localhost:3001';
const SCHEDULED_SESSIONS_SERVER = `${HOST}/scheduledSessions`;
const SESSIONS_SERVER = `${HOST}/sessions`;
const USERS_SERVER = `${HOST}/users`;
// const SERVER_SHEDULED_SESSIONS = `${SCHEDULED_SESSIONS_SERVER}`;
// const SERVER_SESSIONS = `${SERVER}/sessions`;
// const SERVER_USERS = `${SERVER}/users`;

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

const fetchDb = (endpoint, method, data) => {
    
    const options = { method };

    if (data) {
        if (method === METHODS.GET) {
            const params = new URLSearchParams(data);
            endpoint += `?${params.toString()}`;
        } else {
            options.headers = {
                'Content-Type': 'application/json'
            };
            options.body = JSON.stringify(data);
        }        
    }

    return new Promise((resolve, reject) => {
        fetch(endpoint, options)
            .then(response => {
                if (response.ok) {
                    if (method === METHODS.GET) {
                        response
                            .json()
                            .then(json => resolve(json));
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

    // Load scheduled sessions
    loadScheduledSessions(startDate, endDate, userId, eventId) {
        const END_POINT = `${SCHEDULED_SESSIONS_SERVER}${userId !== null ? '/' + userId : ''}${eventId !== null ? '/' + eventId : ''}${startDate !== null ? '/' + startDate : ''}${endDate !== null ? '/' + endDate : ''}`;
        console.log(END_POINT);
        return fetchDb(
            END_POINT,
            METHODS.GET
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
            METHODS.GET
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

    // Load filtered scheduled sessions
    filterScheduledSessions(startDate, endDate, userId, eventId) {
        const END_POINT = `${SCHEDULED_SESSIONS_SERVER}${userId !== null ? '/' + userId : ''}${eventId !== null ? '/' + eventId : ''}${startDate !== null ? '/' + startDate : ''}${endDate !== null ? '/' + endDate : ''}`;
        console.log(END_POINT);
        // return fetchDb(
        //     SCHEDULED_SESSIONS_SERVER,
        //     METHODS.GET
        // );
    }
}

// https://sessions-lab.bkool.com/sessions/scheduledSessions?limit=5&userId=b949a83a-6de6-4787-808e-12c8951afb41&profileId=1be4fd71-ef3d-4556-bd87-ea3fc2c9e273&eventId=GIV2021&startDate=2016-05-18T16%3A00%3A00.000Z&endDate=2016-05-18T16%3A00%3A00.000Z&featuredUserId=b949a83a-6de6-4787-808e-12c8951afb41

const apiServices = new ApiServices();

export { apiServices };