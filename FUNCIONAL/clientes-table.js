const clienteTable = (function($){
    const CLIENTE_TABLE_BODY = $("#clienteTable tbody");

    function clienteBuildTableRow(id) {
        const cliente = {id: id, ...clienteForm.getData()};
        const clienteTpl = _.template($("#clienteTemplate").html());

        return clienteTpl(cliente);
    }

    function addToTable() {
        CLIENTE_TABLE_BODY.append(clienteBuildTableRow(_nextId));
    }

    function _findClienteRowById(id) {
        return $("#clienteTable button[data-id='" + id + "']").parents("tr")[0];
    }

    function updateInTable(id)
    {
        const row = _findClienteRowById(id);
        const $row = $(row);

        // Adiciona a linha modifica na tabela
        $row.after(clienteBuildTableRow());

        // Remover a linha antiga
        $row.remove();
    }

    return {
        addToTable: addToTable,
        updateInTable: updateInTable
    }
})(jQuery);