import * as Templates from './templates';
import { dateTimeFormater, todayDateTime } from '../helpers/date-formatter';
import { filterdValues } from '../helpers/filter-object';
import { getDuplicates, markDuplicated } from '../helpers/check-duplicates-dates';
import { paginationLimmit } from '../helpers/offsetLimit';
import { Modal } from 'bootstrap';
import { dNone, isInvalid, isValid, keycloak } from '../helpers/const';

class View {
    constructor() {
        // Global variables
        this.userId = '133479-yaMeLoDan';

        // Card container
        this.cardContainer = document.querySelector('.card');

        // Header buttons
        this.headerActions = document.getElementById('headerActions');
        this.btnSidebar = document.getElementById('btnSidebar');
        this.btnSidebarSpans = this.btnSidebar.getElementsByTagName('span');
        this.btnNewSession = document.getElementById('btnNewSession');

        // Spinner
        this.spinner = document.getElementById('spinner');

        // Sidebar
        this.sidebar = document.getElementById('filterSidebar');
        this.sessionFilters = document.getElementById('sessionFilters');
        this.startDate = document.getElementById('filterSessionDateStart');
        this.endDate = document.getElementById('filterSessionDateEnd');
        this.filterSessionEvent = document.getElementById('filterSessionEvent');
        this.filterSessionUser = document.getElementById('filterSessionUser');
        this.filterButtons = document.getElementById('filterButtons');
        this.submitFilterButton = document.getElementById('submitFilterButton');
        this.clearFilterButton = document.getElementById('clearFilterButton');

        // List
        this.scheduledSessionsList = document.getElementById('scheduledSessionsList');
        this.sessionsTableBody = document.getElementById('sessionsTableBody');
        this.scheduledSessionLi = document.getElementById('scheduledSessionLi').content;
        this.scheduledSessionTableRow = document.getElementById('scheduledSessionTableRow');

        // Action buttons
        this.btnDeleteSession = document.getElementById('btnDeleteSession');
        this.btnEditSession = document.querySelector('.btnEditSession');

        // Modal delete
        this.modalDelete = document.getElementById('deleteModal');

        // Modal Edit / Add
        this.myModal = new Modal(document.getElementById('editAddSessionModal'), {})
        this.modalEditAdd = document.getElementById('editAddSessionModal');
        this.allRequired = document.getElementById('allRequired');
        this.editAddModalTitle = document.getElementById('editAddSessionLabel');
        this.editAddForm = document.getElementById('editAddForm');
        this.profileId = document.getElementById('profileId');
        this.addEditUserID = document.getElementById('addEditUserID');
        this.addEditProfileID = document.getElementById('addEditProfileID');
        // this.addEditSessionID = document.getElementById('addEditSessionID');
        this.addEditEventID = document.getElementById('addEditEventID');
        this.editSessionDateStart = document.getElementById('editSessionDateStart');
        this.addEditMaxUsers = document.getElementById('addEditMaxUsers');
        this.addEditrealWeather = document.getElementById('addEditrealWeather');
        this.addEditWarmUpTime = document.getElementById('addEditWarmUpTime');
        this.addEditMainPartMinSecconds = document.getElementById('addEditMainPartMinSecconds');
        this.buttonAddNew = document.getElementById('buttonAddNew');
        this.buttonUpdate = document.getElementById('buttonUpdate');
        this.addRound = document.getElementById('addRound');
        this.buttonAddRound = document.getElementById('buttonAddRound');
        this.rounds = document.getElementById('rounds');
        this.checkProfileId = document.getElementById('checkProfileId');
        this.profileIdChecked = document.getElementById('profileIdChecked');
        this.sessionProfileName = document.getElementById('sessionProfileName');

        // Pagination
        this.sessionsPagination = document.getElementById('sessionsPagination');
        this.btnPrev = document.getElementById('btnPrev');
        this.btnNext = document.getElementById('btnNext'); 
        this.offsetLimit = {
            offset: 0,
            limit: paginationLimmit
        };

        // Alert
        this.alert = document.querySelector('#sessionsContent .alert-info');
    }

    // First scheduled sessions render
    renderScheduledSessions(scheduledSessions) {
        // Clear ul 
        this.scheduledSessionsList.innerHTML = '';

        // Populate ul
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
                '{{sessionName}}': sessionName ? `: ${sessionName}` : '',
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

        // Disable pagination buttons if no results
        // and if the number of items renderd are less than paginationLimmit
        if (!scheduledSessions.length) {
            this.btnPrev.classList.add('disabled');
            this.btnNext.classList.add('disabled');
        } else if (scheduledSessions.length < paginationLimmit) {
            this.btnNext.classList.add('disabled');
        } else {
            this.btnNext.classList.remove('disabled');
        }

        // Remove possible alert
        const alertInfo = document.querySelector('#sessionsContent .alert-info');
        alertInfo && alertInfo.remove();
    }

    // Filter action
    filterScheduledSessionsAction(handler) {
        // Form filter object on form change
        this.sessionFilters.addEventListener('change', (event) => {
            // Disabled or not "limpiar filtros" button depending on fields change
            if (this.endDate.value !== '' || this.filterSessionEvent.value !== 'all' || this.filterSessionUser.value !== 'all') {
                this.clearFilterButton.classList.remove('disabled');
            } else {
                this.clearFilterButton.classList.add('disabled');
            }
        });

        // Clean filters or submit form
        this.filterButtons.addEventListener('click', (event) => {
            const element = event.target;
            const elementId = element.id;
            const isSidebarExpended = this.sidebar.classList.contains('expand');

            if (elementId === 'clearFilterButton') {
                // If element is the "Filtrar" or "Limpiar filtros" button
                if (isSidebarExpended) {
                    this.sidebar.classList.toggle('expand');
                    this.btnSidebar.classList.toggle('btn-white');
                    this.btnSidebar.classList.toggle('btn-outline-white');
                    for(let i = 0; i < 2; i ++) {
                        this.btnSidebarSpans[i].classList.toggle(dNone);
                    }
                }

                // Reset form fields
                this.endDate.value = '';
                this.filterSessionEvent.value = 'all';
                this.filterSessionUser.value = 'all';
                this.startDate.value = todayDateTime();
                
                this.clearFilterButton.classList.add('disabled');

                // Create filter object
                const filterObject = filterdValues(
                    this.startDate.value,
                    this.endDate.value,
                    this.filterSessionEvent.value,
                    this.filterSessionUser.value,
                    0,
                    paginationLimmit
                )

                // Pagination btnPrev button disabled
                this.btnPrev.classList.add('disabled');
                
                handler(filterObject);
            } else if (elementId === 'submitFilterButton') {
                // If element is the "Filtrar" or "Limpiar filtros" button
                if (isSidebarExpended) {
                    this.sidebar.classList.toggle('expand');
                    this.btnSidebar.classList.toggle('btn-white');
                    this.btnSidebar.classList.toggle('btn-outline-white');
                    for(let i = 0; i < 2; i ++) {
                        this.btnSidebarSpans[i].classList.toggle(dNone);
                    }
                }

                // Create filter object
                const filterObject = filterdValues(
                    this.startDate.value,
                    this.endDate.value,
                    this.filterSessionEvent.value,
                    this.filterSessionUser.value,
                    0,
                    paginationLimmit
                )

                // Pagination btnPrev button disabled
                this.btnPrev.classList.add('disabled');
                
                handler(filterObject);
            }
        });
    }

    //  Pagination
    paginationAction(handler) {
        // const offsetLimit 
        let filterObject = {};
        this.sessionsPagination.addEventListener('click', (event) => {
            event.preventDefault();
            const element = event.target;
            const elementId = element.id;

            if (elementId === 'btnPrev') {
                this.offsetLimit.offset = this.offsetLimit.offset > 0 ? this.offsetLimit.offset -= paginationLimmit : 0;
                // this.offsetLimit.limit -= 1;
                if (this.offsetLimit.offset === 0) {
                    this.btnPrev.classList.add('disabled');
                }
                filterObject = {
                    ...filterObject,
                    ...filterdValues(
                        this.startDate.value,
                        this.endDate.value,
                        this.filterSessionEvent.value,
                        this.filterSessionUser.value
                    ),
                    ...this.offsetLimit
                }

                handler(filterObject);
            } else if (elementId === 'btnNext') {
                // this.offsetLimit.limit += 1;
                this.offsetLimit.offset += paginationLimmit;
                if (this.offsetLimit.offset > 0) {
                    this.btnPrev.classList.remove('disabled');
                }
                filterObject = {
                    ...filterObject,
                    ...filterdValues(
                        this.startDate.value,
                        this.endDate.value,
                        this.filterSessionEvent.value,
                        this.filterSessionUser.value
                    ),
                    ...this.offsetLimit
                }

                handler(filterObject);
            }
        });
    }

    // Delete scheduled session
    deleteScheduledSessionAction(handler) {
        let id;
        let sessionDate;
        let isSingleRound;
        
        this.scheduledSessionsList.addEventListener('click', (event) => {
            const element = event.target;
            const elementClasses = element.classList;
            const isDeleteSessionButton = elementClasses.contains('btnDeleteSession');
            
            if (isDeleteSessionButton) {
                // Know if the session have more than one round
                isSingleRound = element.closest('table').getElementsByClassName("btnDeleteSession").length === 1;
                id = event.target.closest('tr').dataset.id;
                sessionDate = event.target.closest('tr').dataset.date;

                if (isSingleRound) {
                    this.modalDelete.querySelector('.modal-body').innerHTML = 'Vas a ELIMINAR una sesión programada. ¿Estás seguro?';
                } else {
                    this.modalDelete.querySelector('.modal-body').innerHTML = 'Vas a ELIMINAR una ronda en una sesión programada ¿Estás seguro?';
                }
                
            }
        });

        this.btnDeleteSession.addEventListener('click', () => {
            // Create filter object
            const filterObject = filterdValues(
                this.startDate.value,
                this.endDate.value,
                this.filterSessionEvent.value,
                this.filterSessionUser.value,
                0,
                paginationLimmit
            );
            handler(id, sessionDate, isSingleRound, filterObject);
        });
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

    // Render edit form
    renderForm(sessionData, sessionDate, type) {
        if (type === 'edit') {
            // console.log(dateTimeFormater(sessionDate).date);
            // console.log(dateTimeFormater(sessionDate).fromUTCToLocal);
            // Form fields values
            const { profileId, maxUsers, isRealWeather, warmupSeconds, mainPartMinSeconds, id, eventId } = sessionData;
            let proUsers = sessionData.roundsDefinition.filter( round => round.startDate === sessionDate )[0].featuredUserIds;

            // Hiding some form fields
            this.addEditUserID.closest('.form-group').classList.add(dNone);
            this.addEditUserID.disabled = false;
            this.addEditProfileID.closest('.form-group').classList.add(dNone);
            // this.addEditSessionID.closest('.form-group').classList.add(dNone);
            // this.addEditEventID.closest('.form-group').classList.add(dNone);
            this.buttonAddNew.classList.add(dNone);
            this.addRound.classList.add(dNone);

            // Showing some form fields
            this.profileId.closest('.form-group').classList.remove(dNone);
            this.buttonUpdate.classList.remove(dNone);
            this.addEditWarmUpTime.closest('.form-group').classList.remove(dNone);

            // Setting form fields value
            this.editAddForm.dataset.id = id;
            this.editAddForm.dataset.date = sessionDate;
            this.editAddModalTitle.innerHTML = "Editar sesión";
            this.profileId.value = profileId;
            this.profileId.disabled = true;
            const date = sessionDate.split('T')[0];
            const time = dateTimeFormater(sessionDate).date.toLocaleString().slice(11, -3);
            // document.getElementById('addSessionDateStart-0').setAttribute('value', `${date}T${time}`);
            document.getElementById('addSessionDateStart-0').value = dateTimeFormater(sessionDate).fromUTCToLocal;
            document.getElementById('addSessionDateStart-0').setAttribute('min', todayDateTime());
            this.addEditMaxUsers.value = maxUsers;
            this.addEditrealWeather.value = isRealWeather ? 'yes' : 'no';
            this.addEditWarmUpTime.value = warmupSeconds;
            this.addEditMainPartMinSecconds.value = mainPartMinSeconds;
            this.addEditEventID.value = eventId;
            const featuredUsersCollection = document.querySelector('.singleRound .addEditProUsers .users');

            // Styling featured users toggle buttons
            document.querySelectorAll(".singleRound .addEditProUsers .users .btn-proUser").forEach(function(element) {
                element.classList.remove("active");
            });
            proUsers.forEach( (user, index) => {
                featuredUsersCollection.querySelector(`[data-user-id="${user}"]`).classList.add('active');
            } );
        } else if (type === 'add') {
            // Hiding form fields
            this.profileId.closest('.form-group').classList.add(dNone);
            this.buttonUpdate.classList.add(dNone);
            this.addRound.classList.remove(dNone);
            this.addEditWarmUpTime.closest('.form-group').classList.add(dNone);

            // Showing some form fields
            this.addEditUserID.closest('.form-group').classList.remove(dNone);
            this.addEditProfileID.closest('.form-group').classList.remove(dNone);
            // this.addEditSessionID.closest('.form-group').classList.remove(dNone);
            this.addEditEventID.closest('.form-group').classList.remove(dNone);
            this.buttonAddNew.classList.remove(dNone);

            // Setting form fields value
            this.editAddForm.dataset.id = '';
            this.editAddForm.dataset.date = '';
            this.editAddModalTitle.innerHTML = "Añadir nueva sesión programada";
            this.profileId.value = '';
            this.profileId.disabled = true;
            document.getElementById('addSessionDateStart-0').value = dateTimeFormater(todayDateTime()).fromUTCToLocal;
            document.getElementById('addSessionDateStart-0').setAttribute('min', todayDateTime());
            this.addEditUserID.value = this.userId;
            // this.addEditUserID.disabled = true;
            this.addEditProfileID.value = '';
            // this.addEditSessionID.value = '';
            // this.addEditEventID.value = 'all';
            // this.addEditMaxUsers.value = 10;
            this.addEditrealWeather.value = 'yes';
            // this.addEditWarmUpTime.value = 600;
            this.addEditMainPartMinSecconds.value = 300;
            
            // Styling featured users toggle buttons
            document.querySelectorAll(".btn-proUser").forEach(function(element) {
                element.classList.remove("active");
            });

            // Showing add new session modal
            this.myModal.show();
        }
    }

    // Edit scheduled session Action
    editScheduledSessionAction(handler) {
        // Getting ids of pro users
        let proUsersArrEdited = [];

        // Remove extra rounds and classes when modal exit
        this.modalEditAdd.addEventListener('hidden.bs.modal', () => {
            proUsersArrEdited = [];
        });

        this.modalEditAdd.addEventListener('shown.bs.modal', () => {
            const proUsersNode = document.querySelectorAll('.singleRound[data-round="0"] .users .btn-proUser');
            [...proUsersNode].forEach(button => {
                const userId = button.getAttribute('data-user-id');
                if (button.classList.contains('active')) {
                    proUsersArrEdited.push(userId);
                } else {
                    proUsersArrEdited = proUsersArrEdited.filter( user => user !== userId);
                }
            });
        });

        this.editAddForm.addEventListener('click', (event) => {
            const element = event.target;
            const isBtnProUser = element.classList.contains('btn-proUser');

            if (isBtnProUser) {
                const isActive = element.classList.contains('active');
                const userId = element.getAttribute('data-user-id');
                if (isActive) {
                    proUsersArrEdited.push(userId);
                } else {
                    proUsersArrEdited = proUsersArrEdited.filter( user => user !== userId);
                }
            }
        });
        
        // Submmiting data
        this.buttonUpdate.addEventListener('click', (event) => {
            event.preventDefault();
            const id = this.editAddForm.getAttribute('data-id');
            const sessionDate = this.editAddForm.getAttribute('data-date');
            const updatedGlobalData = {
                maxUsers: parseInt(this.addEditMaxUsers.value),
                isRealWeather: this.addEditrealWeather.value === 'yes' ? true : false,
                eventId: this.addEditEventID.value,
                warmupSeconds: parseInt(this.addEditWarmUpTime.value),
                mainPartMinSeconds: parseInt(this.addEditMainPartMinSecconds.value)
            }
            const updatedRound = {
                startDate: dateTimeFormater(document.getElementById('addSessionDateStart-0').value).date.toISOString().split('.')[0]+"Z",
                featuredUserIds: proUsersArrEdited,
            };
            handler(id, sessionDate, updatedGlobalData, updatedRound);
        });
    }

    // Check profileId action
    checkProfileIdAction(handler) {
        this.addEditProfileID.addEventListener('input', event => {
            this.checkProfileId.classList.remove(dNone);
            this.profileIdChecked.classList.add(dNone);
            this.addEditProfileID.classList.remove(isValid);
            this.addEditProfileID.classList.remove('profileChecked');
        });
        this.editAddForm.addEventListener('click', (event) => {
            const element = event.target;
            const elementId = element.id;

            if (elementId === 'checkProfileId') {
                if (this.addEditProfileID.value !== '') {
                    handler(this.addEditProfileID.value);
                }
            }
        });
    }

    // Render profileId checked
    renderCheckProfileIdAction(isChecked, profileName) {
        // this.checkProfileId.classList.toggle(dNone, isChecked);
        if (isChecked) {
            this.profileIdChecked.classList.remove(dNone);
            this.addEditProfileID.classList.remove(isInvalid);
            this.addEditProfileID.classList.add(isValid);
            this.sessionProfileName.innerHTML = profileName;
            this.addEditProfileID.classList.add('profileChecked');
            this.checkProfileId.classList.add(dNone);
        } else if (isChecked === undefined) {
            this.profileIdChecked.classList.add(dNone);
            this.addEditProfileID.classList.add(isInvalid);
            this.checkProfileId.classList.remove(dNone);
        }
    }

    // Add scheduled session Action
    addScheduledSessionAction(handler) {
        let proUsersArr = [[]];
        let numberOfRounds = 0;
        let allDatetimeInput = document.querySelectorAll('#rounds input[type=datetime-local]');

        this.editAddForm.addEventListener('click', (event) => {
            const element = event.target;
            const isBtnProUser = element.classList.contains('btn-proUser');
            const isRemoveRoundButton = element.classList.contains('btn-danger');
            const isButtonAddRound = element.id;

            // Check if button clicked was btn pro users
            if (isBtnProUser) {
                const isAdd = element.closest('.singleRound').classList.contains('add');
                const isActive = element.classList.contains('active');
                const userId = element.getAttribute('data-user-id');
                const roundNumber = element.closest('.singleRound').getAttribute('data-round');
                if (isActive) {
                    proUsersArr[roundNumber].push(userId);
                } else {
                    proUsersArr[roundNumber] = proUsersArr[roundNumber].filter( user => user !== userId);
                }
            } else if (isButtonAddRound === 'buttonAddRound') { // Check if element is add round button
                // Add 1 to numerOfRound
                numberOfRounds ++;

                // Get round number and add array item to proUsersArr
                proUsersArr.push([]);

                // Get first element round and remove active class from btn pro user 
                const roundElement = document.querySelector(`.singleRound.add[data-round="0"]`);

                // Clone element round
                const clonedRoundElement = roundElement.cloneNode(true);
                clonedRoundElement.querySelectorAll(".btn-proUser").forEach(function(element) {
                    element.classList.remove("active");
                });

                // Change data-round value
                clonedRoundElement.dataset.round = numberOfRounds;

                // Change id value
                clonedRoundElement.querySelector('.floating-label input[type=datetime-local]').id = `addSessionDateStart-${numberOfRounds}`;

                // Change name attr
                clonedRoundElement.querySelector('.floating-label input[type=datetime-local]').name = `addSessionDateStart-${numberOfRounds}`;

                // Change input value
                clonedRoundElement.querySelector('.floating-label input[type=datetime-local]').value = todayDateTime();

                // Change input min attr
                clonedRoundElement.querySelector('.floating-label input[type=datetime-local]').setAttribute('min', todayDateTime());

                // Change label for attr
                clonedRoundElement.querySelector('.floating-label label').setAttribute('for', `addSessionDateStart-${numberOfRounds}`);

                // Create remove button
                const roundRemoveButton = document.createElement('button');
                roundRemoveButton.classList.add('btn', 'btn-sm', 'btn-danger', 'mb-1', 'text-white');
                roundRemoveButton.innerHTML = 'Eliminar ronda';
                clonedRoundElement.querySelector('.addEditProUsers .users').appendChild(roundRemoveButton);

                // Add round to DOM
                this.rounds.appendChild(clonedRoundElement);

                // Check for duplicated dates
                //- Update datetime inputs
                allDatetimeInput = document.querySelectorAll('#rounds input[type=datetime-local]');

                // Check for duplicates dates when changing dates inputs
                allDatetimeInput.forEach((input, inputIndex, arr) => {
                    input.addEventListener('change', (event) => {
                        markDuplicated(getDuplicates(allDatetimeInput), arr);
                    })
                });
                
                // Check for duplicates dates
                markDuplicated(getDuplicates(allDatetimeInput), allDatetimeInput);
                
            } else if (isRemoveRoundButton) { // Check if element is remove round button
                event.preventDefault();
                const roundToRemove = element.closest('.singleRound');
                roundToRemove.remove();
                proUsersArr.splice(numberOfRounds, 1);
                numberOfRounds --;

                // Check for duplicates dates
                allDatetimeInput = document.querySelectorAll('#rounds input[type=datetime-local]');
                markDuplicated(getDuplicates(allDatetimeInput), allDatetimeInput);
            }
        });

        // Remove extra rounds and classes when modal exit
        this.modalEditAdd.addEventListener('hidden.bs.modal', (event) => {
            document.querySelectorAll(".singleRound.add").forEach(function(round) {
                const roundNumber = round.getAttribute('data-round');
                if (roundNumber !== "0") {
                    round.remove();
                }
            });
            proUsersArr = [[]];
            numberOfRounds = 0;

            // Remove validation class from inputs
            const isValidClass = document.getElementsByClassName(isValid);
            const isInvalidClass = document.getElementsByClassName(isInvalid);
            while (isInvalidClass.length) {
                isInvalidClass[0].classList.remove(isInvalid);
            }
            while (isValidClass.length) {
                isValidClass[0].classList.remove(isValid);
            }

            // Hide cheched profile button and show check profile button
            this.checkProfileId.classList.remove(dNone);
            this.profileIdChecked.classList.add(dNone);

            // Remove checked class
            this.addEditProfileID.classList.remove('profileChecked');

            // Reset event select value
            this.addEditEventID.value = this.addEditEventID.options[0].value || '';
        });
        
        // Submmiting data
        this.buttonAddNew.addEventListener('click', (event) => {
            event.preventDefault();

            // Create filter object
            const filterObject = filterdValues(
                this.startDate.value,
                this.endDate.value,
                this.filterSessionEvent.value,
                this.filterSessionUser.value,
                0,
                paginationLimmit
            );

            const roundsDefinition = () => {
                const rounds = this.editAddForm.querySelectorAll('.singleRound.add');
                const roundsDefinition = [];
                rounds.forEach(( round, index ) => {
                    roundsDefinition.push({
                        startDate: dateTimeFormater(round.querySelector(`#addSessionDateStart-${index}`).value).date.toISOString().split('.')[0]+"Z",
                        featuredUserIds: proUsersArr[index]
                    });
                });
                return roundsDefinition;
            }

            // Creating data
            const updatedGlobalData = {
                userId: this.userId,
                profileId: this.addEditProfileID.value,
                sessionId: '', // this.addEditSessionID.value,
                eventId: this.addEditEventID.value,
                roundsDefinition: roundsDefinition().sort(function compare(a, b) {
                    var dateA = new Date(a.startDate);
                    var dateB = new Date(b.startDate);
                    return dateA - dateB;
                }),
                maxUsers: parseInt(this.addEditMaxUsers.value),
                rules: 'COMPETITIVE',
                isRealWeather: this.addEditrealWeather.value === 'yes' ? true : false,
                launchOptions: {
                    maxInstances: 3,
                    maxSeconds: 300
                },
                warmupSeconds: 600, // parseInt(this.addEditWarmUpTime.value),
                mainPartMinSeconds: parseInt(this.addEditMainPartMinSecconds.value)
            };

            // Form validation
            //- Check sessionId value
            // if (this.addEditSessionID.value === '') {
            //     this.addEditSessionID.classList.add(isInvalid);
            // } else {
            //     this.addEditSessionID.classList.remove(isInvalid);
            // }
            // this.addEditSessionID.addEventListener('input', event => {
            //     this.addEditSessionID.classList.remove(isInvalid);
            // });

            //- Check profileId value
            if (!this.addEditProfileID.classList.contains('profileChecked')) {
                this.addEditProfileID.classList.add(isInvalid);
            } else {
                this.addEditProfileID.classList.remove(isInvalid);
            }

            // Check for isInvalid class on datetime inputs
            const allInputsValid = Array.prototype.slice.call(allDatetimeInput).find(input => input.classList.contains(isInvalid));

            // Submit
            if (this.addEditProfileID.classList.contains('profileChecked') && allInputsValid === undefined) {
                handler(updatedGlobalData, filterObject);

                // Hide modal
                this.myModal.hide();
            }
            // if (this.addEditSessionID.value !== '' && this.addEditProfileID.classList.contains('profileChecked') && allInputsValid === undefined) {
            //     handler(updatedGlobalData, filterObject);

            //     // Hide modal
            //     this.myModal.hide();
            // }
        });
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
    firstUiAppRender(loadedUsers, loadedEvents) {
        // Date on sidebar
        this.startDate.value = todayDateTime();

        // Pagination btnPrev button disabled
        this.btnPrev.classList.add('disabled');

        // Populate featured users buttons
        loadedUsers.forEach((user, index) => {
            // Getting user values
            const { avatarUrl, surname, name, id } = user;

            // Adding user buttons
            // Find-Replace elements in template
            const findReplace = {
                '{{avatarUrl}}': avatarUrl,
                '{{userId}}': id,
                '{{userName}}': name,
                '{{userSurname}}': surname
            };

            // Replaced in template
            const singleButton = Templates.featuredUserBtnTemplate.replace(new RegExp("(" + Object.keys(findReplace).map(function(i){return i.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")}).join("|") + ")", "g"), function(s){ return findReplace[s]});

            // Inserted to html
            document.querySelector('.addEditProUsers .users').insertAdjacentHTML('beforeend', singleButton);

            const usersSelectOption = Templates.featuredUserSelectOptionTemplate.replace(new RegExp("(" + Object.keys(findReplace).map(function(i){return i.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")}).join("|") + ")", "g"), function(s){ return findReplace[s]});

            this.filterSessionUser.insertAdjacentHTML('beforeend', usersSelectOption);
        });

        // Populate events buttons
        loadedEvents.forEach((event, index) => {
            // Getting user values
            const { eventId, eventName: {esValue} } = event;

            // Adding user buttons
            // Find-Replace elements in template
            const findReplace = {
                '{{eventId}}': eventId,
                '{{eventName}}': esValue
            };

            // Replaced in template
            const eventsSelectOption = Templates.eventSelectOptionTemplate.replace(new RegExp("(" + Object.keys(findReplace).map(function(i){return i.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")}).join("|") + ")", "g"), function(s){ return findReplace[s]});

            this.filterSessionEvent.insertAdjacentHTML('beforeend', eventsSelectOption);
            this.addEditEventID.insertAdjacentHTML('beforeend', eventsSelectOption);

            // Adding default value
            if (index === 0) {
                this.addEditEventID.value = esValue;
            }
        });
    }

    // Sidebar toggle actions
    bindSideBarEvents() {
        this.headerActions.addEventListener('click', event => {
            const element = event.target;
            const elementId = element.id;
            const isBtnSidebar = elementId === 'btnSidebar';
            const isBtnNewSession = elementId === 'btnNewSession';
            const isBtnLogOut = elementId === 'btnLogOut';

            // If element is the "sidebar toggle" button
            if (isBtnSidebar) {
                this.sidebar.classList.toggle('expand');
                element.classList.toggle('btn-white');
                element.classList.toggle('btn-outline-white');
                for(let i = 0; i < 2; i ++) {
                    this.btnSidebarSpans[i].classList.toggle(dNone);
                }
            }

            // If element is the "Add new session" button
            if (isBtnNewSession) {
                this.renderForm(null, null, 'add');
            }

            // If element is "Log out icon"
            if (isBtnLogOut) {
                keycloak.logout();
            }
        });
    }

    // Spinner toggle action
    toggleSpinner() {
        this.spinner.classList.toggle(dNone);
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
        this.cardContainer.insertAdjacentHTML('beforebegin', alertDiv);

        if (alertType !== 'info') {
            // Set time out to add alert progress
            setTimeout(() => {
                document.querySelectorAll('.alert-time').forEach(alert => alert.classList.add('on'));
            }, 100);

            // Set time out to remove alert message
            setTimeout(() => {
                document.querySelector('.alert').remove();
            }, 8100);
        } else if (alertType === 'info') {
            // Reset offsetLimit pagination
            this.offsetLimit.offset = 0;
        }
    }
};

export { View };