export const scheduledSessionLi = `
    <li class="list-group-item p-0" data-id="{{sessionID}}">
        <div class="{{sessionFirst}} p-3 d-flex align-items-center justify-content-between collapse-trigger" data-bs-toggle="collapse" href="#target-{{sessionID}}">
            {{sessionName}}
            <span class="icon-expand-more text-dark"></span>
        </div>
        <div class="collapse collapse-body {{sessionShow}}" id="target-{{sessionID}}">
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
    <tr data-id="{{sessionID}}" data-date="{{sessionUTCDate}}">
        <td class="sessionBegins">{{sessionDate}}</td>
        <td class="sessionTimes" scope="col"><span class="badge bg-white border border-light text-dark">{{sessionTime}}</span></td>
        <td class="sessionActions text-end">
            <button type="button" class="btnEditSession btn btn-sm btn-light">Editar</button>
            <button type="button" class="btnDeleteSession btn bg-transparent text-danger btn-icon btn-sm"><span class="icon-delete"></span></button>
        </td>
    </tr>
`;
export const alertTemplate = `
    <tr id="alertMessages">
        <td colspan="5">
            <div class="alert alert-{{alertType}} m-0 rounded-0 border-0" role="alert">{{alertMassage}}</div>
        </td>
    </tr>
`;