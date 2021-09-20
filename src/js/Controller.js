import { Model } from './Model';
import { View } from './View';

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.testView(this.testViewHandler.bind(this));
    }
    testViewHandler() {
        this.view.testView();
    }
}

const app = new Controller(new Model(), new View())

export { app };