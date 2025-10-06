async function logarUsuario() {
    const email = document.getElementById("emailLogin").value.trim();
    const senha = document.getElementById("senhaLogin").value.trim();
    const lembrar = document.getElementById("lembrarLogin").checked;

    if (!email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        // Busca todos os usuários da API
        const response = await fetch(base_url);
        if (!response.ok) {
            throw new Error("Erro ao buscar usuários na API");
        }

        const usuarios = await response.json();

        // Procura o usuário com email e senha correspondentes
        const usuarioEncontrado = usuarios.find(
            u => u.email === email && u.senha === senha
        );

        if (!usuarioEncontrado) {
            alert("E-mail ou senha incorretos!");
            return;
        }

        // Salva usuário logado (pode usar suas funções globais também)
        if (lembrar) {
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
        } else {
            sessionStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
        }

        // Também salva no padrão global (opcional)
        saveUser(usuarioEncontrado);

        alert("Login realizado com sucesso!");
        window.location.href = "../Home/index.html";
    } catch (error) {
        console.error("Erro no login:", error);
        alert("Erro ao realizar login. Tente novamente mais tarde.");
    }
}

function loadUser() {
    const user =
        JSON.parse(localStorage.getItem("usuarioLogado")) ||
        JSON.parse(sessionStorage.getItem("usuarioLogado"));
    if (user) {
        document.getElementById("nomeUser").innerText = user.nome;
    }
}

document.addEventListener("DOMContentLoaded", loadUser);
