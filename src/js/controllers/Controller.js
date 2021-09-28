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

    deleteScheduledSessionHandler(sessionID, sessionDate) {
        this.model.deleteScheduledSession(sessionID, sessionDate)
            .then(() => this.view.renderDeleteItem(sessionID, sessionDate))
            .catch(() => {
                this.view.renderAlertMessages('Ha ocurrido un error', 'danger');
            });
    }
}

const app = new Controller(new Model(), new View())

export { app };