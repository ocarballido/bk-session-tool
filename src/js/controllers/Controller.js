import { Model } from '../model/Model';
import { View } from '../views/View';

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // First test
        // this.view.testView(this.testViewHandler.bind(this));

        // Binding view first UI render action
        this.view.firstUiAppRender();

        // Binding view toggle saidebar action
        this.view.bindSideBarEvents();

        // Binding delete session action
        this.view.deleteScheduledSessionAction(this.deleteScheduledSessionHandler.bind(this));

        // Load data action
        this.model.getScheduledSessions()
            .then((scheduledSessions) => {
                console.log(scheduledSessions);
                this.view.renderScheduledSessions(scheduledSessions);
                this.view.toggleSpinner();
            });
    }

    deleteScheduledSessionHandler(sessionID, sessionDate, isSingleRound) {
        this.view.toggleSpinner();
        this.model.deleteScheduledSession(sessionID, sessionDate)
            .then(() => {
                if (isSingleRound) {
                    this.view.renderDeletedSession(sessionID);
                    this.view.renderAlertMessages('La sesión se ha eliminado con éxito', 'success');
                } else {
                    this.view.renderDeletedRound(sessionID, sessionDate);
                    this.view.renderAlertMessages('La ronda de la sesión se ha eliminado con éxito', 'success');
                }
            })
            .catch(() => {
                this.view.renderAlertMessages('Ha ocurrido un error', 'danger');
            })
            .finally(() => this.view.toggleSpinner());
    }
    // deleteScheduledSessionHandler(sessionID, sessionDate, isSingleRound) {
    //     if (isSingleRound) {
    //         this.model.deleteScheduledSession(sessionID, sessionDate)
    //             .then(() => this.view.renderDeletedSession(sessionID))
    //             .catch(() => {
    //                 this.view.renderAlertMessages('Ha ocurrido un error', 'danger');
    //             });
    //     } else {
    //         this.model.deleteScheduledSession(sessionID, sessionDate)
    //             .then(() => this.view.renderDeletedRound(sessionID, sessionDate))
    //             .catch(() => {
    //                 this.view.renderAlertMessages('Ha ocurrido un error', 'danger');
    //             });
    //     }
    // }
}

const app = new Controller(new Model(), new View())

export { app };