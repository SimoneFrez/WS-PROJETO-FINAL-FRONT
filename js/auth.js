/*
    js/auth.js
    Responsável por toda a lógica de autenticação do usuário.
*/

// --- FUNÇÃO DE CADASTRO ---
function cadastrarUsuario() {
    // 1. Pegar os valores dos inputs
    const nome = document.getElementById('nomeCadastro').value;
    const email = document.getElementById('emailCadastro').value;
    const senha = document.getElementById('senhaCadastro').value;
    const confirmaSenha = document.getElementById('confirmaSenhaCadastro').value;

    // 2. Validações
    if (!nome || !email || !senha || !confirmaSenha) {
        alert("Por favor, preencha todos os campos.");
        return; // Para a execução
    }

    if (senha !== confirmaSenha) {
        alert("As senhas não coincidem. Tente novamente.");
        return;
    }

    // Validação simples de e-mail
    if (!email.includes('@') || !email.includes('.')) {
        alert("Por favor, insira um e-mail válido.");
        return;
    }

    // 3. Acessar os usuários no localStorage
    // Se não houver, cria um array vazio
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // 4. Verificar se o e-mail já está cadastrado
    const usuarioExistente = usuarios.find(user => user.email === email);
    if (usuarioExistente) {
        alert("Este e-mail já está cadastrado. Tente fazer login.");
        return;
    }

    // 5. Adicionar o novo usuário ao array
    usuarios.push({ nome, email, senha });

    // 6. Salvar o array atualizado de volta no localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // 7. Feedback e redirecionamento
    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html"; // Envia o usuário para a página de login
}


// --- FUNÇÃO DE LOGIN ---
function logarUsuario() {
    // 1. Pegar os valores dos inputs
    const email = document.getElementById('emailLogin').value;
    const senha = document.getElementById('senhaLogin').value;

    // 2. Validações básicas
    if (!email || !senha) {
        alert("Por favor, preencha e-mail e senha.");
        return;
    }

    // 3. Acessar os usuários no localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // 4. Procurar pelo usuário com o e-mail e senha correspondentes
    const usuarioEncontrado = usuarios.find(user => user.email === email && user.senha === senha);

    if (usuarioEncontrado) {
        // 5. Se encontrou, login bem-sucedido
        alert(`Bem-vindo, ${usuarioEncontrado.nome}!`);
        // Armazena informação de que o usuário está logado (opcional, mas útil)
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
        window.location.href = "../index.html"; // Redireciona para a página principal
    } else {
        // 6. Se não encontrou, exibe erro
        alert("E-mail ou senha incorretos.");
    }
}