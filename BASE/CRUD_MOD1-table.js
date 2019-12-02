const {{.IdModulo}}Table = (function($){
    const {{.IdModulo}}_TABLE_BODY = $("#{{.IdModulo}}Table tbody");

    function {{.IdModulo}}BuildTableRow(id) {
        const {{.IdModulo}} = {id: id, ...{{.IdModulo}}Form.getData()};
        const {{.IdModulo}}Tpl = _.template($("#{{.IdModulo}}Template").html());

        return {{.IdModulo}}Tpl({{.IdModulo}});
    }

    function addToTable() {
        {{.IdModulo}}_TABLE_BODY.append({{.IdModulo}}BuildTableRow(_nextId));
    }

    function _find{{.IdModulo}}RowById(id) {
        return $("#{{.IdModulo}}Table button[data-id='" + id + "']").parents("tr")[0];
    }

    function updateInTable(id)
    {
        const row = _find{{.IdModulo}}RowById(id);
        const $row = $(row);

        // Adiciona a linha modifica na tabela
        $row.after({{.IdModulo}}BuildTableRow());

        // Remover a linha antiga
        $row.remove();
    }

    return {
        addToTable: addToTable,
        updateInTable: updateInTable
    }
})(jQuery);