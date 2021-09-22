import { Model } from '../model/Model';
import { View } from '../views/View';

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // First test
        // this.view.testView(this.testViewHandler.bind(this));

        // Binding view toggle saidebar action
        this.view.toggleSidebar(this.toggleSidebarHandler.bind(this));

        // Binding view first UI render action
        this.view.firstUiAppRender(this.firstUiAppRenderAction.bind(this));

        // Load data action
        this.model.loadData()
            .then(() => {
                this.model.getScheduledSessions();
            });
    }

    // First UI render controller
    firstUiAppRenderAction() {
        this.view.firstUiAppRender();
    }
    
    // Toggle sidebar controller
    toggleSidebarHandler() {
        this.view.toggleSidebar();
    }
}

const app = new Controller(new Model(), new View())

export { app };