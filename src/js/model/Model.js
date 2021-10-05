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
                                if (session.id === singleScheduledSession.profileId) {
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

    deleteScheduledSession(id, sessionDate) {
        // Get session item
        const sessionItem = this._scheduledSessions.find( session => session.id === id );

        // Remove sessionName property. We dont need it to update db
        delete sessionItem.sessionName;

        // Get if this sessions have 1 or more rounds
        const isSingleRound = sessionItem.roundsDefinition.length === 1;

        // If have just 1 session round we'll 'DELETE'
        if (isSingleRound) {
            return apiServices
                .deleteScheduledSession(id)
                .then((scheduledSessions) => {
                    this._scheduledSessions = this._scheduledSessions.filter( session => session.id !== id );
                    console.log(scheduledSessions);
                    return true;
                });
        } else { // If have more than 1 session round we'll 'PUT'
            // Filtering roundsDefinition to remove deleted round
            sessionItem.roundsDefinition = sessionItem.roundsDefinition.filter( round => round.startDate !== sessionDate )
            return apiServices
                .updateScheduledSession(id, sessionItem)
                .then((scheduledSessions) => {
                    console.log(scheduledSessions);
                    this._scheduledSessions = this._scheduledSessions.filter( session => session.id !== id );
                });
        }
    }

    // Get editable session data to fill the form
    editScheduledSessionFormData(id) {
        // Get session item
        return this._scheduledSessions.find( session => session.id === id );
    }

    // Edit session
    editScheduledSession(id, sessionDate, updatedGlobalData, updatedRound) {
        // Get session item
        const sessionItem = this._scheduledSessions.find( session => session.id === id );

        // Remove sessionName property. We dont need it to update db
        delete sessionItem.sessionName;

        // Get index of edited round
        const edittedRoundIndex = sessionItem.roundsDefinition.findIndex( round => round.startDate === sessionDate );
        sessionItem.roundsDefinition.splice(edittedRoundIndex, 1, updatedRound);

        // Update session item
        const sessionItemUpdates = {
            ...sessionItem,
            ...updatedGlobalData,
            roundsDefinition: sessionItem.roundsDefinition
        }

        console.log(sessionItem, sessionItemUpdates, sessionDate, updatedGlobalData, updatedRound, edittedRoundIndex);

        // return apiServices
        //     .updateScheduledSession(id, sessionItem)
        //     .then((scheduledSessions) => {
        //         console.log(scheduledSessions);
        //         this._scheduledSessions = this._scheduledSessions.filter( session => session.id !== id );
        //     });
    }
};

export { Model };