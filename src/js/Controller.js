import { Model } from './Model';
import { View } from './View';

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // First test
        // this.view.testView(this.testViewHandler.bind(this));

        // Toggle saidebar action
        this.view.toggleSidebar(this.toggleSidebarHandler.bind(this));

        // Binding view first app render
        this.view.firstSessionLoadAction(this.firstSessionLoadHandler.bind(this));
    }

    // First test view
    // testViewHandler() {
    //     this.view.testView();
    // }
    
    toggleSidebarHandler() {
        this.view.toggleSidebar();
    }

    // First app render
    firstSessionLoadHandler() {
        this.view.firstSessionLoadAction();
    }
}

const app = new Controller(new Model(), new View())

export { app };