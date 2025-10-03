/*
    js/auth.js
    Responsável por toda a lógica de autenticação do usuário.
*/

// --- FUNÇÃO DE CADASTRO ---
function cadastrarUsuario() {
    const nome = document.getElementById('nomeCadastro').value;
    const email = document.getElementById('emailCadastro').value;
    const senha = document.getElementById('senhaCadastro').value;
    const confirmaSenha = document.getElementById('confirmaSenhaCadastro').value;

    if (!nome || !email || !senha || !confirmaSenha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }
    if (senha !== confirmaSenha) {
        alert("As senhas não coincidem. Tente novamente.");
        return;
    }
    if (!email.includes('@') || !email.includes('.')) {
        alert("Por favor, insira um e-mail válido.");
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioExistente = usuarios.find(user => user.email === email);
    if (usuarioExistente) {
        alert("Este e-mail já está cadastrado. Tente fazer login.");
        return;
    }

    usuarios.push({ nome, email, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert("Cadastro realizado com sucesso!");
    // O link para login.html está correto, pois a página de cadastro já está na pasta "pages"
    window.location.href = "login.html";
}


// --- FUNÇÃO DE LOGIN ---
function logarUsuario() {
    const email = document.getElementById('emailLogin').value;
    const senha = document.getElementById('senhaLogin').value;

    if (!email || !senha) {
        alert("Por favor, preencha e-mail e senha.");
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioEncontrado = usuarios.find(user => user.email === email && user.senha === senha);

    if (usuarioEncontrado) {
        alert(`Bem-vindo, ${usuarioEncontrado.nome}!`);
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
        // CORRIGIDO: Adicionado "../" para voltar uma pasta antes de ir para o index.html
        window.location.href = "../index.html";
    } else {
        alert("E-mail ou senha incorretos.");
    }
}