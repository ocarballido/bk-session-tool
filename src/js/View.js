

class View {
    constructor() {
        // Header buttons
        this.headerActions = document.getElementById('headerActions');
        this.btnSidebar = document.getElementById('btnSidebar');
        this.btnSidebarSpans = this.btnSidebar.getElementsByTagName('span');
        this.btnNewSession = document.getElementById('btnNewSession');

        // Sidebar
        this.sidebar = document.getElementById('filterSidebar');
    }

    // First test
    testView() {
        console.log('Oscar', this.btnSidebarSpans[0]);
    }

    // Sidebar actions
    toggleSidebar() {
        this.headerActions.addEventListener('click', event => {
            const element = event.target;
            const elementId = element.id;
            const isBtnSidebar = elementId === 'btnSidebar';
            if (isBtnSidebar) {
                this.sidebar.classList.toggle('expand');
                for(let i = 0; i < 2; i ++) {
                    this.btnSidebarSpans[i].classList.toggle('d-none');
                }
            }
        });
    }
};

export { View };