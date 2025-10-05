// Função para cadastrar usuário
async function cadastrarUsuario() {
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

    // Mostrar loading no botão
    const botao = document.querySelector('.botao');
    const textoOriginal = botao.innerHTML;
    botao.innerHTML = '<i class="bi bi-arrow-repeat spinner"></i> Cadastrando...';
    botao.disabled = true;

    try {
        // Verificar se o usuário já existe
        console.log('Verificando se usuário existe...');
        const response = await fetch(`${base_url}?search=${email}`);
        const users = await response.json();
        
        console.log('Usuários encontrados:', users);
        
        if (users.length > 0) {
            alert('Este e-mail já está cadastrado.');
            return;
        }

        // Criar novo usuário com estrutura compatível
        const novoUsuario = {
            name: nome, // Mudando para 'name' que é mais comum em APIs
            email: email,
            password: senha, // Mudando para 'password'
            createdAt: new Date().toISOString().split('T')[0] // Formato mais simples
        };

        console.log('Enviando dados:', novoUsuario);

        const createResponse = await fetch(base_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoUsuario)
        });

        console.log('Resposta da API:', createResponse);

        if (createResponse.ok) {
            const usuarioCriado = await createResponse.json();
            console.log('Usuário criado:', usuarioCriado);
            
            saveUser(usuarioCriado);
            alert('Cadastro realizado com sucesso!');
            window.location.href = '../Home/index.html';
        } else {
            const errorText = await createResponse.text();
            console.error('Erro na resposta:', errorText);
            throw new Error(`Erro ${createResponse.status}: ${errorText}`);
        }

    } catch (error) {
        console.error('Erro completo:', error);
        alert('Erro ao realizar cadastro. Verifique o console para mais detalhes.');
    } finally {
        // Restaurar botão
        botao.innerHTML = textoOriginal;
        botao.disabled = false;
    }
}

// Função para fazer login
async function logarUsuario() {
    const email = document.getElementById('emailLogin').value;
    const senha = document.getElementById('senhaLogin').value;

    if (!email || !senha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Mostrar loading no botão
    const botao = document.querySelector('.botao');
    const textoOriginal = botao.innerHTML;
    botao.innerHTML = '<i class="bi bi-arrow-repeat spinner"></i> Entrando...';
    botao.disabled = true;

    try {
        console.log('Buscando usuário...');
        const response = await fetch(`${base_url}?search=${email}`);
        const users = await response.json();
        
        console.log('Usuários encontrados no login:', users);
        
        if (users.length === 0) {
            alert('E-mail não encontrado.');
            return;
        }

        const usuario = users[0];
        console.log('Usuário encontrado:', usuario);
        
        // Verificar senha (pode ser 'senha' ou 'password' dependendo da API)
        const senhaCorreta = usuario.senha === senha || usuario.password === senha;
        
        if (senhaCorreta) {
            saveUser(usuario);
            alert('Login realizado com sucesso!');
            window.location.href = '../Home/index.html';
        } else {
            alert('Senha incorreta.');
        }

    } catch (error) {
        console.error('Erro no login:', error);
        alert('Erro ao fazer login. Tente novamente.');
    } finally {
        // Restaurar botão
        botao.innerHTML = textoOriginal;
        botao.disabled = false;
    }
}