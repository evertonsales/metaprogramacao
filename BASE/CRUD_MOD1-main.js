// Próximo ID para adicionar um novo {{.IdModulo}}
let _nextId = 1;

// ID de {{.IdModulo}} que está sendo editado
let _activeId = 0;

const {{.IdModulo}}_FORM = $("#{{.IdModulo}}-form");
const {{.IdModulo}}_TABLE = $("#{{.IdModulo}}Table");

function handle{{.IdModulo}}Edit() {
    const row = $(this).parents("tr");
    const cols = row.children("td");

    _activeId = $($(cols[{{(len .Campos)}}]).children("button")[0]).data("id");

    {{.IdModulo}}Form.setData({{range $i, $a := .Campos}}$(cols[{{$i}}]).text(), {{end}});

    {{.IdModulo}}Form.setSubmitButtonText("Atualizar");
}

function handle{{.IdModulo}}DeleteClick() {
    $(this).parents("tr").remove();
}

function handle{{.IdModulo}}Submission(e) {
    e.preventDefault();

    if ({{.IdModulo}}Form.hasErrors()) {
        return;
    }

    if ({{.IdModulo}}Form.getSubmitButtonText() === "Atualizar") {
        {{.IdModulo}}Table.updateInTable(_activeId);
        {{.IdModulo}}Form.setSubmitButtonText("Adicionar " + "{{.TituloSingular}}");
    } else {
        {{.IdModulo}}Table.addToTable(_activeId);
        _nextId += 1;
    }

    {{.IdModulo}}Form.clear();
}

{{.IdModulo}}_TABLE.on('click', '.{{.IdModulo}}-edit', handle{{.IdModulo}}Edit);
{{.IdModulo}}_TABLE.on('click', '.{{.IdModulo}}-delete', handle{{.IdModulo}}DeleteClick);
{{.IdModulo}}_FORM.on('submit', handle{{.IdModulo}}Submission);
