import * as Templates from './templates';
import { dateTimeFormater, todayDateTime } from '../helpers/date-formatter';

class View {
    constructor() {
        // Header buttons
        this.headerActions = document.getElementById('headerActions');
        this.btnSidebar = document.getElementById('btnSidebar');
        this.btnSidebarSpans = this.btnSidebar.getElementsByTagName('span');
        this.btnNewSession = document.getElementById('btnNewSession');

        // Spinner
        this.spinner = document.getElementById('spinner');

        // Sidebar
        this.sidebar = document.getElementById('filterSidebar');
        this.dateStart = document.getElementById('filterSessionDateStart');
        this.dateEnd = document.getElementById('filterSessionDateEnd');

        // List
        this.scheduledSessionsList = document.getElementById('scheduledSessionsList');
        this.sessionsTableBody = document.getElementById('sessionsTableBody');
        this.scheduledSessionLi = document.getElementById('scheduledSessionLi').content;
        this.scheduledSessionTableRow = document.getElementById('scheduledSessionTableRow');

        // Action buttons
        this.btnDeleteSession = document.getElementById('btnDeleteSession');
        this.btnEditSession = document.querySelector('.btnEditSession');

        // Modal delete
        this.modelDelete = document.getElementById('deleteModal');

        // Modal Edit / Add
        this.modelEditAdd = document.getElementById('editAddSessionModal');
        this.editAddModalTitle = document.getElementById('editAddSessionLabel');
        this.editAddForm = document.getElementById('editAddForm');
        this.sessionName = document.getElementById('sessionName');
        this.addEditUserID = document.getElementById('addEditUserID');
        this.addEditProfileID = document.getElementById('addEditProfileID');
        this.addEditSessionID = document.getElementById('addEditSessionID');
        this.addEditEventID = document.getElementById('addEditEventID');
        this.addEditSessionDateStart = document.getElementById('addEditSessionDateStart');
        this.addEditProUsers = document.getElementById('addEditProUsers');
        this.addEditMaxUsers = document.getElementById('addEditMaxUsers');
        this.addEditrealWeather = document.getElementById('addEditrealWeather');
        this.addEditWarmUpTime = document.getElementById('addEditWarmUpTime');
        this.addEditMainPartMinSecconds = document.getElementById('addEditMainPartMinSecconds');
        this.buttonAddNew = document.getElementById('buttonAddNew');
        this.buttonUpdate = document.getElementById('buttonUpdate');
    }

    // First scheduled sessions render
    renderScheduledSessions(scheduledSessions) {
        // console.log(dateTimeFormater());
        scheduledSessions.forEach((session, index) => {
            // Getting session values
            const { sessionName, id, roundsDefinition, userId, profileId, sessionId, eventId, maxUsers, rules, isRealWeather, warmupSeconds, mainPartMinSeconds } = session;

            const sessionRows = roundsDefinition.map((round, index) => {
                // Adding sessions table row
                const singleRow = Templates.scheduledSessionTableRowTemplate;

                // Find-Replace elements in template
                const findReplace = {
                    '{{id}}': id,
                    '{{sessionDate}}': dateTimeFormater(round.startDate).formattedDate,
                    '{{sessionTime}}': dateTimeFormater(round.startDate).formattedTime,
                    '{{sessionUTCDate}}': round.startDate,
                    '{{featuredUserIds}}': round.featuredUserIds.join('-')
                };

                // Return replaced singleRow template
                return singleRow.replace(new RegExp("(" + Object.keys(findReplace).map(function(i){return i.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")}).join("|") + ")", "g"), function(s){ return findReplace[s]});
            });

            // Adding sessions li
            // Find-Replace elements in template
            const findReplace = {
                '{{id}}': id,
                '{{sessionName}}': sessionName,
                '{{sessionShow}}': `${index === 0 ? "show" : ""}`,
                '{{sessionFirst}}': `${index > 0 ? "collapsed" : ""}`,
                '{{sessionTableRow}}': `${ sessionRows.join('') }`,
                '{{userId}}': userId,
                '{{profileId}}': profileId,
                '{{sessionId}}': sessionId,
                '{{eventId}}': eventId,
                '{{maxUsers}}': maxUsers,
                '{{rules}}': rules,
                '{{isRealWeather}}': isRealWeather,
                '{{warmupSeconds}}': warmupSeconds,
                '{{mainPartMinSeconds}}': mainPartMinSeconds
            };

            // Replaced singleRow template
            const singleLi = Templates.scheduledSessionLi.replace(new RegExp("(" + Object.keys(findReplace).map(function(i){return i.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")}).join("|") + ")", "g"), function(s){ return findReplace[s]});

            // Inserted to html
            this.scheduledSessionsList.insertAdjacentHTML('beforeend', singleLi);
        });
    }

    // Delete scheduled session
    deleteScheduledSessionAction(handler) {
        this.scheduledSessionsList.addEventListener('click', (event) => {
            const element = event.target;
            const elementClasses = element.classList;
            const isDeleteSessionButton = elementClasses.contains('btnDeleteSession');
            
            if (isDeleteSessionButton) {
                // Know if the session have more than one round
                const isSingleRound = element.closest('table').getElementsByClassName("btnDeleteSession").length === 1;
                const id = event.target.closest('tr').dataset.id;
                const sessionDate = event.target.closest('tr').dataset.date;
                confirmationModal(id, sessionDate, isSingleRound);
            }
        });

        // Call confirmation delete modal
        const confirmationModal = (id, sessionDate, isSingleRound) => {
            if (isSingleRound) {
                this.modelDelete.querySelector('.modal-body').innerHTML = 'Vas a ELIMINAR una sesión programada. ¿Estás seguro?';
            } else {
                this.modelDelete.querySelector('.modal-body').innerHTML = 'Vas a ELIMINAR una ronda en una sesión programada ¿Estás seguro?';
            }
            this.btnDeleteSession.addEventListener('click', () => {
                handler(id, sessionDate, isSingleRound);
            });
        }
    }

    // Edit modal action
    editScheduledSessionModalAction(handler) {
        this.scheduledSessionsList.addEventListener('click', (event) => {
            const element = event.target;
            const elementClasses = element.classList;
            const isEditSessionButton = elementClasses.contains('btnEditSession');

            // If the button pressed if edit, get session ID and startDtae
            if (isEditSessionButton) {
                const id = event.target.closest('tr').dataset.id;
                const sessionDate = event.target.closest('tr').dataset.date;
                handler(id, sessionDate);
            }
        });
    }

    // Add new session
    // addScheduledSessionModalAction(handler) {
    //     this.btnNewSession.addEventListener('click', (event) => {
            
    //     });
    // }

    // Render edit form
    renderForm(sessionData, sessionDate, type) {
        if (type === 'edit') {
            // Form fields values
            const { sessionName, maxUsers, isRealWeather, warmupSeconds, mainPartMinSeconds, id } = sessionData;
            let proUsers = sessionData.roundsDefinition.filter( round => round.startDate === sessionDate )[0].featuredUserIds;

            // Hiding some form fields
            this.addEditUserID.closest('.form-group').classList.add('d-none');
            this.addEditProfileID.closest('.form-group').classList.add('d-none');
            this.addEditSessionID.closest('.form-group').classList.add('d-none');
            this.addEditEventID.closest('.form-group').classList.add('d-none');
            this.buttonAddNew.classList.add('d-none');
            this.buttonUpdate.classList.remove('d-none');

            // Showing some form fields
            this.sessionName.closest('.form-group').classList.remove('d-none');

            // Setting form fields value
            this.editAddForm.dataset.id = id;
            this.editAddForm.dataset.date = sessionDate;
            this.editAddModalTitle.innerHTML = "Editar sesión";
            this.sessionName.value = sessionName;
            this.sessionName.disabled = true;
            const date = sessionDate.split('T')[0];
            const time = dateTimeFormater(sessionDate).date.toLocaleString().slice(11, -3);
            this.addEditSessionDateStart.value = `${date}T${time}`;
            this.addEditSessionDateStart.setAttribute('min', todayDateTime());
            this.addEditMaxUsers.value = maxUsers;
            this.addEditrealWeather.value = isRealWeather ? 'yes' : 'no';
            this.addEditWarmUpTime.value = warmupSeconds;
            this.addEditMainPartMinSecconds.value = mainPartMinSeconds;
            const featuredUsersCollection = this.addEditProUsers.querySelector('.users');
            // Styling featured users toggle buttons
            document.querySelectorAll(".btn-proUser").forEach(function(element) {
                element.classList.remove("active");
            });
            proUsers.forEach( (user, index) => {
                featuredUsersCollection.querySelector(`[data-user-id="${user}"]`).classList.add('active');
            } );
            
            console.log(date, time);
        } else if (type === 'add') {
            // Hiding some form fields
            this.sessionName.closest('.form-group').classList.add('d-none');

            // Showing form fields
            this.addEditUserID.closest('.form-group').classList.remove('d-none');
            this.addEditProfileID.closest('.form-group').classList.remove('d-none');
            this.addEditSessionID.closest('.form-group').classList.remove('d-none');
            this.addEditEventID.closest('.form-group').classList.remove('d-none');
            this.buttonAddNew.classList.remove('d-none');
            this.buttonUpdate.classList.add('d-none');

            // Setting form fields value
            this.editAddForm.dataset.id = '';
            this.editAddForm.dataset.date = '';
            this.editAddModalTitle.innerHTML = "Añadir nueva sesión programada";
            this.sessionName.value = '';
            this.sessionName.disabled = true;
            this.addEditSessionDateStart.value = todayDateTime();
            this.addEditSessionDateStart.setAttribute('min', todayDateTime());
            this.addEditMaxUsers.value = 10;
            this.addEditrealWeather.value = 'yes';
            this.addEditWarmUpTime.value = 600;
            this.addEditMainPartMinSecconds.value = 300;
            
            // Styling featured users toggle buttons
            document.querySelectorAll(".btn-proUser").forEach(function(element) {
                element.classList.remove("active");
            });
        }
    }

    // Edit scheduled session Action
    editScheduledSessionAction(handler) {
        // Getting ids of pro users
        const proUsersNode = document.querySelectorAll('.btn-proUser');
        let proUsersArr = [];
        this.addEditProUsers.querySelector('.users').addEventListener('click', (event) => {
            const element = event.target;
            proUsersArr = [];
            [...proUsersNode].forEach(button => {
                const userId = button.getAttribute('data-user-id');
                if (button.classList.contains('active')) {
                    proUsersArr.push(userId);
                    console.log('tiene');
                } else {
                    proUsersArr = proUsersArr.filter( user => user !== userId);
                    console.log('no tiene');
                }
            });
        });
        
        // Submmiting data
        this.buttonUpdate.addEventListener('click', (event) => {
            event.preventDefault();
            const id = this.editAddForm.getAttribute('data-id');
            const sessionDate = this.editAddForm.getAttribute('data-date');
            const updatedGlobalData = {
                maxUsers: parseInt(this.addEditMaxUsers.value),
                isRealWeather: this.addEditrealWeather.value === 'yes' ? true : false,
                warmupSeconds: parseInt(this.addEditWarmUpTime.value),
                mainPartMinSeconds: parseInt(this.addEditMainPartMinSecconds.value)
            }
            const updatedRound = {
                startDate: dateTimeFormater(this.addEditSessionDateStart.value).date.toISOString(),
                featuredUserIds: proUsersArr,
            };
            handler(id, sessionDate, updatedGlobalData, updatedRound);
        });
    }

    // Add scheduled session Action
    addScheduledSessionAction(handler) {
        // Getting ids of pro users
        // const proUsersNode = document.querySelectorAll('.btn-proUser');
        // let proUsersArr = [];
        // this.addEditProUsers.querySelector('.users').addEventListener('click', (event) => {
        //     const element = event.target;
        //     proUsersArr = [];
        //     [...proUsersNode].forEach(button => {
        //         const userId = button.getAttribute('data-user-id');
        //         if (button.classList.contains('active')) {
        //             proUsersArr.push(userId);
        //             console.log('tiene');
        //         } else {
        //             proUsersArr = proUsersArr.filter( user => user !== userId);
        //             console.log('no tiene');
        //         }
        //     });
        // });
        
        // Submmiting data
        this.buttonAddNew.addEventListener('click', (event) => {
            event.preventDefault();
            const updatedGlobalData = {
                maxUsers: parseInt(this.addEditMaxUsers.value),
                isRealWeather: this.addEditrealWeather.value === 'yes' ? true : false,
                warmupSeconds: parseInt(this.addEditWarmUpTime.value),
                mainPartMinSeconds: parseInt(this.addEditMainPartMinSecconds.value)
            };
            const updatedRound = {
                startDate: dateTimeFormater(this.addEditSessionDateStart.value).date.toISOString(),
                featuredUserIds: proUsersArr,
            };
            handler('Oscar');
        });
    }

    // Render items after delete session
    renderDeletedSession(id) {
        const sessionToDelete = document.querySelector(`.list-group-item[data-id="${id}"]`);
        sessionToDelete.remove();
    }

    // Render items after delete round
    renderDeletedRound(id, sessionDate) {
        const roundToDelete = document.querySelector(`.list-group-item[data-id="${id}"] .collapse-body table tbody tr[data-date="${sessionDate}"]`);
        roundToDelete.remove();
    }

    // Render items after updated session
    renderUpdatedSession(id, sessionDate, updatedRound) {
        const roundToUpdate = document.querySelector(`.list-group-item[data-id="${id}"] .collapse-body table tbody tr[data-date="${sessionDate}"]`);
        roundToUpdate.dataset.date = updatedRound.startDate;
        const dateTd = roundToUpdate.querySelector('.sessionBegins');
        const timeTd = roundToUpdate.querySelector('.sessionTimes .badge');
        dateTd.innerHTML = dateTimeFormater(updatedRound.startDate).formattedDate;
        timeTd.innerHTML = dateTimeFormater(updatedRound.startDate).formattedTime;
    }

    // First UI app render action
    firstUiAppRender() {
        document.addEventListener('DOMContentLoaded', event => {
            const currentDate = new Date();
            const currentDateToLocaleDateString = currentDate.toISOString().substr(0, 10);;
            this.dateStart.value = currentDateToLocaleDateString;
        });
    }

    // Sidebar toggle actions
    bindSideBarEvents() {
        this.headerActions.addEventListener('click', event => {
            const element = event.target;
            const elementId = element.id;
            const isBtnSidebar = elementId === 'btnSidebar';
            const isBtnNewSession = elementId === 'btnNewSession';
            // If element is the "sidebar toggle" button
            if (isBtnSidebar) {
                this.sidebar.classList.toggle('expand');
                element.classList.toggle('btn-white');
                element.classList.toggle('btn-outline-white');
                for(let i = 0; i < 2; i ++) {
                    this.btnSidebarSpans[i].classList.toggle('d-none');
                }
            }

            // If element is the "Add new session" button
            if (isBtnNewSession) {
                console.log(isBtnNewSession);
                this.renderForm(null, null, 'add')
            }
        });
    }

    // Spinner toggle action
    toggleSpinner() {
        this.spinner.classList.toggle('d-none');
    }

    // Render alert messages
    renderAlertMessages(alertMassage, alertType) {
        // Find-Replace elements in alert
        const findReplace = {
            '{{alertType}}': alertType,
            '{{alertMassage}}': alertMassage
        };
        
        // Replaced elements
        const alertDiv = Templates.alertTemplate.replace(new RegExp("(" + Object.keys(findReplace).map(function(i){return i.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")}).join("|") + ")", "g"), function(s){ return findReplace[s]});

        // Insert to html
        this.scheduledSessionsList.insertAdjacentHTML('beforebegin', alertDiv);

        // Set time out to remove alert message
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 5000);
    }
};

export { View };