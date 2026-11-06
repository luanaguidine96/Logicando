
const form = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const dados = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        login: document.getElementById("login").value,
        senha: document.getElementById("senha").value,
        loginCrianca: document.getElementById("loginCrianca").value,
        senhaCrianca: document.getElementById("senhaCrianca").value
    };

    mensagem.textContent = "Realizando cadastro...";

    try {
        const response = await fetch("http://localhost:8081/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        if (response.ok) {
            mensagem.textContent =
                "Responsável e criança cadastrados com sucesso!";

            form.reset();
        } else {
            const erro = await response.json();

            mensagem.textContent =
                "Erro ao cadastrar: " + erro.mensagem;
        }


    } catch (error) {
        mensagem.textContent =
            "Não foi possível conectar ao servidor.";

        console.error(error);
    }
});
