
import { validate } from 'schema-utils';
import { apiServices } from '../services/ApiServices';

class Model {
    constructor() {
        this._scheduledSessions = [];
        // this._sessions = [];
        // this._users = [];
        this._filterObject = {};
    }

    _insertScheduledSession(session) {
        this._scheduledSessions.push(session);
        return session;
    }

    async loadScheduledSessions() {
        // return new Promise((resolve, reject) => {
        //     const scheduledSessions = await apiServices.loadScheduledSessions();
        //     const sessions = await apiServices.loadSessions();
        // });
        const sessions = await apiServices.loadSessions();
        // const scheduledSessions = await apiServices.loadScheduledSessions();
        return new Promise((resolve, reject) => {
            apiServices
                .loadScheduledSessions()
                .then((scheduledSessions) => {
                    scheduledSessions.forEach(singleScheduledSession => {
                        // let startDate = singleScheduledSession.sessionRounds[0].startDate.split("T")[0];
                        const singleSession = {
                            sessionID: singleScheduledSession.id,
                            sessionRounds: [],
                            sessionName
                        };
                        
                        const sessionName = sessions.map(session => {
                            if (session.id === singleScheduledSession.id) {
                                singleSession.sessionName = session.name;
                            }
                        });

                        singleSession.sessionRounds = Object.entries(singleScheduledSession.roundsDefinition.reduce((obj, item) => {
                            let startDate = this.dateTimeFormater(item.startDate).formattedDate;
                            let time = this.dateTimeFormater(item.startDate).formattedDate;
                            obj[this.dateTimeFormater(item.startDate).formattedDate] = obj[this.dateTimeFormater(item.startDate).formattedDate] || [];
                            obj[this.dateTimeFormater(item.startDate).formattedDate].push(this.dateTimeFormater(item.startDate).formattedTime);
                            return obj;
                        }, {})).map((item) => ({
                            startDate: item[0],
                            times: item[1]
                        }));

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

    getScheduledSessions() {
        console.log(this._scheduledSessions);
        return this._scheduledSessions;
    }

    loadData() {
        return Promise.all([
            this.loadScheduledSessions()
        ]);
    }

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