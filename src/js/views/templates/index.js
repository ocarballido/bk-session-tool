export const scheduledSessionLi = `
    <li 
        class="list-group-item p-0" 
        data-id="{{id}}"
        data-userId="{{userId}}"
        data-profileId="{{profileId}}"
        data-sessionId="{{sessionId}}"
        data-eventId="{{eventId}}"
        data-maxUsers="{{maxUsers}}"
        data-rules="{{rules}}"
        data-isRealWeather="{{isRealWeather}}"
        data-warmupSeconds="{{warmupSeconds}}"
        data-mainPartMinSeconds="{{mainPartMinSeconds}}"
    >
        <div class="{{sessionFirst}} p-3 d-flex align-items-center justify-content-between collapse-trigger" data-bs-toggle="collapse" href="#target-{{id}}">
            {{sessionName}}
            <span class="icon-expand-more text-dark"></span>
        </div>
        <div class="collapse collapse-body {{sessionShow}}" id="target-{{id}}">
            <table class="table table-hover m-0">
                <thead>
                    <tr class="table-light">
                        <th class="sessionBegins" scope="col">Comienza</th>
                        <th class="sessionTimes" scope="col">Hora</th>
                        <th class="sessionActions text-end" scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {{sessionTableRow}}
                </tbody>
            </table>
        </div>
    </li>
`;
export const scheduledSessionTableRowTemplate = `
    <tr data-id="{{id}}" data-date="{{sessionUTCDate}}">
        <td class="sessionBegins">{{sessionDate}}</td>
        <td class="sessionTimes" scope="col"><span class="badge bg-white border border-light text-dark">{{sessionTime}}</span></td>
        <td class="sessionActions text-end">
            <button type="button" data-bs-toggle="modal" data-bs-target="#editAddSessionModal" class="btnEditSession btn btn-sm btn-light me-1">Editar</button>
            <button type="button" data-bs-toggle="modal" data-bs-target="#deleteModal" class="btnDeleteSession btn-delete btn bg-transparent text-danger btn-icon btn-sm"><span class="icon-delete"></span></button>
        </td>
    </tr>
`;
export const alertTemplate = `
    <div class="alert alert-{{alertType}} mx-0 mb-3 border-0" role="alert">{{alertMassage}}</div>
`;