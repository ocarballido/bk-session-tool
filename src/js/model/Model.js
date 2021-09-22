import { apiServices } from '../services/ApiServices';

class Model {
    constructor() {
        this._scheduledSessions = [];
        // this._sessions = [];
        // this._users = [];
        this._filterObject = {};
    }

    // Insert scheduled session to data model
    _insertScheduledSession(session) {
        this._scheduledSessions.push(session);
        return session;
    }

    // Loadding scheduled sessions
    async loadScheduledSessions() {
        // Waiting regular sessions API load data to resolve
        const sessions = await apiServices.loadSessions();

        // Returning 
        return new Promise((resolve, reject) => {
            apiServices
                .loadScheduledSessions()
                .then((scheduledSessions) => {
                    scheduledSessions.forEach(singleScheduledSession => {
                        // Creating dta model object
                        const singleSession = {
                            sessionID: singleScheduledSession.id,
                            sessionRounds: [],
                            sessionName
                        };
                        
                        // Traversing session API array
                        const sessionName = sessions.map(session => {
                            if (session.id === singleScheduledSession.id) {
                                singleSession.sessionName = session.name;
                            }
                        });

                        // Creating more readeble rounds array
                        singleSession.sessionRounds = Object.entries(singleScheduledSession.roundsDefinition.reduce((obj, item) => {
                            let startDate = this.dateTimeFormater(item.startDate).formattedDate;
                            let time = this.dateTimeFormater(item.startDate).formattedDate;
                            obj[startDate] = obj[startDate] || [];
                            obj[startDate].push(time);
                            return obj;
                        }, {})).map((item) => ({
                            startDate: item[0],
                            times: item[1]
                        }));

                        // Inseting data
                        this._insertScheduledSession(singleSession)
                    });
                    resolve();
                })
                .catch(error => {
                    reject(error);
                    console.log(error);
                });
        });
    }

    // Get scheduled sessions data
    getScheduledSessions() {
        console.log(this._scheduledSessions);
        return this._scheduledSessions;
    }

    // Return promise with data
    loadData() {
        return Promise.all([
            this.loadScheduledSessions()
        ]);
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