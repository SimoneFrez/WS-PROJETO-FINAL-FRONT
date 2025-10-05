// Versão de debug para identificar o problema
async function cadastrarUsuario() {
    const nome = document.getElementById('nomeCadastro').value;
    const email = document.getElementById('emailCadastro').value;
    const senha = document.getElementById('senhaCadastro').value;
    const confirmaSenha = document.getElementById('confirmaSenhaCadastro').value;

    console.log('Dados do formulário:', { nome, email, senha, confirmaSenha });

    // Validações básicas
    if (!nome || !email || !senha || !confirmaSenha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (senha !== confirmaSenha) {
        alert('As senhas não coincidem.');
        return;
    }

    try {
        // Testar a API primeiro
        console.log('Testando conexão com a API...');
        const testResponse = await fetch(base_url);
        console.log('Status da API:', testResponse.status);
        
        if (!testResponse.ok) {
            throw new Error(`API não está respondendo: ${testResponse.status}`);
        }

        const testData = await testResponse.json();
        console.log('Estrutura da API:', testData);

        // Verificar se usuário existe
        const searchResponse = await fetch(`${base_url}?email=${email}`);
        const users = await searchResponse.json();
        console.log('Resultado da busca:', users);

        if (users.length > 0) {
            alert('Este e-mail já está cadastrado.');
            return;
        }

        // Tentar diferentes estruturas de dados
        const estruturas = [
            { name: nome, email: email, password: senha },
            { nome: nome, email: email, senha: senha },
            { username: nome, email: email, password: senha },
            { fullName: nome, email: email, password: senha }
        ];

        let usuarioCriado = null;
        
        for (let estrutura of estruturas) {
            console.log('Tentando estrutura:', estrutura);
            
            try {
                const response = await fetch(base_url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(estrutura)
                });

                if (response.ok) {
                    usuarioCriado = await response.json();
                    console.log('Sucesso com estrutura:', estrutura);
                    break;
                }
            } catch (e) {
                console.log('Falhou com estrutura:', estrutura, e);
            }
        }

        if (usuarioCriado) {
            saveUser(usuarioCriado);
            alert('Cadastro realizado com sucesso!');
            window.location.href = '../Home/index.html';
        } else {
            // Fallback para localStorage
            console.log('Usando fallback para localStorage...');
            cadastrarUsuarioLocalStorage(nome, email, senha);
        }

    } catch (error) {
        console.error('Erro completo:', error);
        // Fallback para localStorage
        cadastrarUsuarioLocalStorage(nome, email, senha);
    }
}

function cadastrarUsuarioLocalStorage(nome, email, senha) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    if (usuarios.find(user => user.email === email)) {
        alert('Este e-mail já está cadastrado.');
        return;
    }

    const novoUsuario = {
        id: Date.now(),
        nome: nome,
        email: email,
        senha: senha,
        dataCriacao: new Date().toISOString()
    };

    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    saveUser(novoUsuario);
    alert('Cadastro realizado com sucesso (armazenado localmente)!');
    window.location.href = '../Home/index.html';
}