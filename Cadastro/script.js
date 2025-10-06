async function cadastrarUsuario(event) {
    event.preventDefault();

    const usuario = {
        nomeCadastro: document.getElementById('nomeCadastro').value.trim(),
        emailCadastro: document.getElementById('emailCadastro').value.trim(),
        senhaCadastro: document.getElementById('senhaCadastro').value.trim()
    };

    // Validação simples
    if (!usuario.nomeCadastro || !usuario.emailCadastro || !usuario.senhaCadastro) {
        alert('Preencha todos os campos!');
        return;
    }

    try {
        // Envia o usuário para a API
        const response = await fetch(base_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        });

        if (!response.ok) {
            throw new Error("Erro ao cadastrar usuário na API");
        }

        const data = await response.json();
        console.log("Usuário cadastrado na API:", data);

        // Salva também no localStorage usando sua função global
        saveUser(data);

        alert("Cadastro realizado com sucesso!");
        window.location.href = "../Home/index.html";
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao realizar cadastro. Tente novamente mais tarde.");
    }
}
