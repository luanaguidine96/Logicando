const respostas = {

    cadastro:
        "Para realizar seu cadastro, acesse a opção de cadastro na pagina inicial e preencha as informações solicitadas. Depois, confira seus dados e finalize o processo.",

    login:
        "Para entrar no sistema, informe seu usuário e sua senha nos campos correspondentes e clique em Entrar.",

    celular:
        "Sim! O sistema foi desenvolvido para funcionar em diferentes tamanhos de tela, incluindo celulares, tablets e computadores.",

    dados:
        "As informações fornecidas pelo usuário são devidamente armazenadas em nosso banco de dados.",

    problema:
        "Caso encontre algum problema durante a utilização do sistema, entre em contato com as responsável pelo projeto."
};


function responder(pergunta) {

    const areaResposta = document.getElementById("resposta");

    areaResposta.innerHTML = `
        <strong>Assistente:</strong>
        <p>${respostas[pergunta]}</p>
    `;
}


