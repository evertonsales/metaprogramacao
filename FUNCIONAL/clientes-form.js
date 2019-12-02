const clienteForm = (function($){
    const CLIENTE_NOME = $("#cliente_nome");
    const CLIENTE_IDADE = $("#cliente_idade");
    const CLIENTE_CIDADE = $("#cliente_cidade");
    const CLIENTE_ESTADO = $("#cliente_estado");
    const CLIENTE_UPDATE_BUTTON = $("#updateButton");

    function clear() {
        setData();
        CLIENTE_NOME.focus();
    }

    function hasErrors() {
        return CLIENTE_NOME.val() === null || CLIENTE_NOME.val() === '';
    }

    function getData() {
        return {
            nome: CLIENTE_NOME.val(),
            idade: CLIENTE_IDADE.val(),
            cidade: CLIENTE_CIDADE.val(),
            estado: CLIENTE_ESTADO.val(),
        };
    }

    function setData(nome='', idade='', cidade='', estado='') {
        CLIENTE_NOME.val(nome);
        CLIENTE_IDADE.val(idade);
        CLIENTE_CIDADE.val(cidade);
        CLIENTE_ESTADO.val(estado);
    }

    function setSubmitButtonText(str) {
        CLIENTE_UPDATE_BUTTON.text(str);
    }

    function getSubmitButtonText() {
        return CLIENTE_UPDATE_BUTTON.text();
    }

    return {
        clear: clear,
        hasErrors: hasErrors,
        getData: getData,
        setData: setData,
        setSubmitButtonText: setSubmitButtonText,
        getSubmitButtonText: getSubmitButtonText,
    };
})(jQuery);