import { apiServices } from '../services/ApiServices';

class Model {
    constructor() {
        this._scheduledSessions = [];
    }

    // Return promise with data
    getScheduledSessions() {
        return new Promise((resolve, reject) => {
            if ( this._scheduledSessions.length ) {
                resolve(this._scheduledSessions);
            } else {
                Promise.all([
                    apiServices.loadSessions(),
                    apiServices.loadScheduledSessions()
                ])
                    .then(([sessions, scheduledSessions]) => {
                        // Filling our data model object
                        this._scheduledSessions = scheduledSessions.map(singleScheduledSession => {
                            // Creating single session object
                            const singleSession = {
                                ...singleScheduledSession,
                                sessionName
                            };
                            
                            // Traversing session API array to extract session name based on id
                            const sessionName = sessions.map(session => {
                                if (session.id === singleScheduledSession.id) {
                                    singleSession.sessionName = session.name;
                                }
                            });
    
                            // Creating more readeble rounds array
                            // singleSession.roundsDefinition = Object.entries(singleScheduledSession.roundsDefinition.reduce((obj, item) => {
                            //     let startDate = this.dateTimeFormater(item.startDate).formattedDate;
                            //     let time = this.dateTimeFormater(item.startDate).formattedTime;
                            //     obj[startDate] = obj[startDate] || [];
                            //     obj[startDate].push([time, item.featuredUserIds]);
                            //     return obj;
                            // }, {})).map((item) => ({
                            //     startDate: item[0],
                            //     times: item[1]
                            // }));
                            return singleSession;
                        });
                        resolve(this._scheduledSessions);                   
                    })
                    .catch((error) => {
                        reject(error);
                        console.log(error);
                    });
            }

        });
    }

    deleteScheduledSession(sessionID, sessionDate) {
        // Get session item
        const sessionItem = this._scheduledSessions.find( session => session.id === sessionID );

        // Get if this sessions have 1 or more rounds
        const isSingleRound = sessionItem.roundsDefinition.length === 1;

        // If have just 1 session round we'll 'DELETE'
        if (isSingleRound) {
            return apiServices
                .deleteScheduledSession(sessionID)
                .then((scheduledSessions) => {
                    this._scheduledSessions = this._scheduledSessions.filter( session => session.sessionID !== sessionID );
                    console.log(scheduledSessions);
                    return true;
                });
        } else { // If have more than 1 session round we'll 'PUT'
            // const data = sessionItem;
            return apiServices
                .updateScheduledSession(sessionID, sessionItem)
                .then((scheduledSessions) => {
                    console.log(scheduledSessions);
                    this._scheduledSessions = this._scheduledSessions.filter( session => session.sessionID !== sessionID );
                });
        }
    }
};

export { Model };