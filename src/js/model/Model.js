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

                        this._scheduledSessions = scheduledSessions.map(singleScheduledSession => {
                            const singleSession = {
                                sessionID: singleScheduledSession.id,
                                sessionRounds: singleScheduledSession.roundsDefinition,
                                sessionName
                            };
                            
                            // Traversing session API array
                            const sessionName = sessions.map(session => {
                                if (session.id === singleScheduledSession.id) {
                                    singleSession.sessionName = session.name;
                                }
                            });
    
                            // Creating more readeble rounds array
                            // singleSession.sessionRounds = Object.entries(singleScheduledSession.roundsDefinition.reduce((obj, item) => {
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
        const sessionItem = this._scheduledSessions.find( session => session.sessionID === sessionID );

        // Get if this sessions have 1 or more rounds
        const isSingleRound = sessionItem.sessionRounds.length > 1;

        // If have more than 1 session round we'll 'PUT'
        // if (isSingleRound) {
        //     //
        // } else if () { // If have more than 1 session round we'll 'DELETE'

        // }

        console.log(sessionID, sessionDate, sessionItem, isSingleRound);

        // const deletedSession= this._scheduledSessions.map( ssession =>  );

        // return new Promise((resolve, reject) => {
        //     const products = this._products.filter(product => product.buyer === id);
        //     const deletes = products.map(product => this.deleteProduct(product.id));

        //     const deletedSession= this._scheduledSessions.map( ssession =>  );
        //     Promise.all(deletes)
        //         .then(() => {
        //             apiServices
        //                 .deleteGuest(id)
        //                 .then(() => {
        //                     this._guests = this._guests.filter(guest => guest.id !== id);
        //                     delete this._guestsObject[id];
        //                     resolve(true);
        //                 })
        //                 .catch(error => console.log(error));
        //         })
        //         .catch(error => reject(error));
        // });
    }

    // API date and time formatter
    dateTimeFormater(APIDate) {
        const timeOptions = {
            hour: 'numeric', minute: 'numeric',
            hour12: true
        };
        const date = new Date(APIDate);
        const webLanguage = navigator.language;
        const formattedDate = new Intl.DateTimeFormat(webLanguage).format(date);
        const formattedTime = new Intl.DateTimeFormat(webLanguage, timeOptions).format(date);
        const formattedDateTime = `${formattedTime}`;
        return {
            date,
            formattedDate,
            webLanguage,
            formattedTime,
            formattedDateTime
        };
    }
};

export { Model };