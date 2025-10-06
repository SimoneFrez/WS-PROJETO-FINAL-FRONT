async function cadastrarUsuario(event) {
    event.preventDefault();

    const nomeCompleto = document.getElementById("nomeCadastro").value;
    const email = document.getElementById("emailCadastro").value;
    const senha = document.getElementById("senhaCadastro").value;
    const confirmaSenha = document.getElementById("confirmaSenhaCadastro").value;

    if (senha !== confirmaSenha) {
        alert("As senhas não coincidem. Por favor, tente novamente.");
        return;
    }

    const novoUsuario = {
        nome: nomeCompleto,
        email: email,
        password: senha
    };

    const resposta = await fetch(base_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoUsuario)
    })

    const dados = await resposta.json();
    alert("Cadastro realizado com sucesso!");
    saveUser(dados);
    window.location.href = "../Login/index.html";

}
