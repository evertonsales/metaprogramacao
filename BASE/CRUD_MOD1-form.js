const {{.IdModulo}}Form = (function($){
    {{range .Campos}}
    const {{.Id}} = $("#{{.Id}}");
    {{end}}

    const {{.IdModulo}}_UPDATE_BUTTON = $("#updateButton");

    function clear() {
        setData();
        {{(index .Campos 0).Id}}.focus();
    }

    function hasErrors() {
        return {{(index .Campos 0).Id}}.val() === null || {{(index .Campos 0).Id}}.val() === '';
    }

    function getData() {
        return {
            {{range .Campos}}
                {{.Nome}}: {{.Id}}.val(),
            {{end}}
        };
    }

    function setData({{range .Campos}}{{.Nome}}='', {{end}}) {
        {{range .Campos}}
        {{.Id}}.val({{.Nome}});
        {{end}}
    }

    function setSubmitButtonText(str) {
        {{.IdModulo}}_UPDATE_BUTTON.text(str);
    }

    function getSubmitButtonText() {
        return {{.IdModulo}}_UPDATE_BUTTON.text();
    }

    return {
        clear: clear,
        hasErrors: hasErrors,
        getData: getData,
        setData: setData,
        setSubmitButtonText: setSubmitButtonText,
        getSubmitButtonText: getSubmitButtonText,
    };
    alert("{{.Titulo}}")
})(jQuery);