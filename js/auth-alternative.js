// Versão alternativa usando apenas localStorage (sem API)
function cadastrarUsuario() {
    const nome = document.getElementById('nomeCadastro').value;
    const email = document.getElementById('emailCadastro').value;
    const senha = document.getElementById('senhaCadastro').value;
    const confirmaSenha = document.getElementById('confirmaSenhaCadastro').value;

    // Validações
    if (!nome || !email || !senha || !confirmaSenha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (senha !== confirmaSenha) {
        alert('As senhas não coincidem.');
        return;
    }

    if (senha.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres.');
        return;
    }

    // Buscar usuários do localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Verificar se email já existe
    if (usuarios.find(user => user.email === email)) {
        alert('Este e-mail já está cadastrado.');
        return;
    }

    // Criar novo usuário
    const novoUsuario = {
        id: Date.now(), // ID único baseado no timestamp
        nome: nome,
        email: email,
        senha: senha,
        dataCriacao: new Date().toISOString()
    };

    // Adicionar à lista de usuários
    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    // Fazer login automático
    saveUser(novoUsuario);
    alert('Cadastro realizado com sucesso!');
    window.location.href = '../Home/index.html';
}

function logarUsuario() {
    const email = document.getElementById('emailLogin').value;
    const senha = document.getElementById('senhaLogin').value;

    if (!email || !senha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Buscar usuários do localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Encontrar usuário
    const usuario = usuarios.find(user => user.email === email && user.senha === senha);
    
    if (usuario) {
        saveUser(usuario);
        alert('Login realizado com sucesso!');
        window.location.href = '../Home/index.html';
    } else {
        alert('E-mail ou senha incorretos.');
    }
}