// Próximo ID para adicionar um novo cliente
let _nextId = 1;
// ID do cliente que está sendo editado
let _activeId = 0;

const CLIENTE_FORM = $("#cliente-form");
const CLIENTE_TABLE = $("#clienteTable");

function handleClienteEdit() {
    const row = $(this).parents("tr");
    const cols = row.children("td");

    _activeId = $($(cols[4]).children("button")[0]).data("id");

    clienteForm.setData($(cols[0]).text(), $(cols[1]).text(), $(cols[2]).text(), $(cols[3]).text());

    clienteForm.setSubmitButtonText("Atualizar");
}

function handleClienteDeleteClick() {
    $(this).parents("tr").remove();
}

function handleClienteSubmission(e) {
    e.preventDefault();

    if (clienteForm.hasErrors()) {
        return;
    }

    if (clienteForm.getSubmitButtonText() === "Atualizar") {
        clienteTable.updateInTable(_activeId);
        clienteForm.setSubmitButtonText("Adicionar Cliente");
    } else {
        clienteTable.addToTable(_activeId);
        _nextId += 1;
    }

    clienteForm.clear();
}

CLIENTE_TABLE.on('click', '.cliente-edit', handleClienteEdit);
CLIENTE_TABLE.on('click', '.cliente-delete', handleClienteDeleteClick);
CLIENTE_FORM.on('submit', handleClienteSubmission);
