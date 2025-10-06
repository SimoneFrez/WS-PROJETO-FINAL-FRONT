// Função para cadastrar usuário
function cadastrarUsuario(event) {
    event.preventDefault(); // impede reload da página

    const nome = document.getElementById("nomeCadastro").value;
    const email = document.getElementById("emailCadastro").value;
    const senha = document.getElementById("senhaCadastro").value;
    const confirmaSenha = document.getElementById("confirmaSenhaCadastro").value;

    // Valida se as senhas coincidem
    if (senha !== confirmaSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    const convertJson = JSON.stringify(data);

    fetch(base_url, {
        method: 'POST',
        body: convertJson,
        headers: {
            'Content-type': 'application/json'
        }
    }).then((resposta) => {

        if (resposta.status === 201) {
            alert("Usuario criado com sucesso");
            location.reload();
        } else {
            alert("Não foi possivel criar o usario");
        }

    }).catch(() => {
        alert("Não foi possivel conectar com o servidor");
    })

    // Recupera usuários salvos ou cria um array vazio
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verifica se o email já existe
    if (usuarios.some(u => u.email === email)) {
        alert("Este e-mail já está cadastrado!");
        return;
    }

    // Adiciona novo usuário
    const novoUsuario = { nome, email, senha };
    usuarios.push(novoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Cadastro realizado com sucesso! Agora faça login.");
    window.location.href = "../Login/login.html"; // redireciona para login
}

// Função para logar usuário
function logarUsuario() {
    const email = document.getElementById("emailLogin").value;
    const senha = document.getElementById("senhaLogin").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioEncontrado = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuarioEncontrado) {
        alert("E-mail ou senha incorretos!");
        return;
    }

    // Salva usuário logado
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));

    // Redireciona para a Home
    window.location.href = "../Home/index.html";
}

// Função para verificar se usuário está logado na Home
function verificarLogin() {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuario) {
        // Se não estiver logado, redireciona para login
        window.location.href = "../Login/login.html";
    }
}

// Função para logout
function logout() {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "../Login/login.html";
}

