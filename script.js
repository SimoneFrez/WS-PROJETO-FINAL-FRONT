// scripts.js

/*
    FUNÇÃO DE LOGIN
    Requisito: Autenticar usuário na página de login.
    Como funciona: Pega os valores dos campos de usuário e senha e
    compara com valores fixos.
*/
function fazerLogin() {
    // Pega o que o usuário digitou
    var usuario = document.getElementById("usuario").value;
    var senha = document.getElementById("senha").value;

    // Verifica se o usuário e a senha estão corretos
    if (usuario === "aluno" && senha === "123") {
        alert("Login bem-sucedido!");
        // Redireciona para a página principal
        window.location.href = "index.html";
    } else {
        alert("Usuário ou senha incorretos.");
    }
}

/*
    LÓGICA DO CARRINHO (CRUD - Create, Read, Update, Delete)
    Requisito: Adicionar itens, calcular total, validar formulários.
    Como funciona: Usamos o localStorage do navegador para guardar
    os itens do carrinho.
*/

// CREATE (Adicionar item ao carrinho)
function adicionarAoCarrinho(nome, preco) {
    // 1. Pega o carrinho que já existe no localStorage
    // Se não existir, cria um array vazio []
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // 2. Adiciona o novo produto ao array
    carrinho.push({ nome: nome, preco: preco });

    // 3. Salva o carrinho atualizado de volta no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // 4. Avisa o usuário
    alert(nome + " foi adicionado ao carrinho!");
}

// READ (Carregar e mostrar o carrinho na página)
function carregarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let listaCarrinhoDiv = document.getElementById('lista-carrinho');
    
    // Limpa a lista antes de adicionar os itens, para não duplicar
    listaCarrinhoDiv.innerHTML = '';

    let total = 0;

    // Loop para criar o HTML de cada item do carrinho
    for (let i = 0; i < carrinho.length; i++) {
        let item = carrinho[i];
        
        // Cria uma div para o item
        let itemDiv = document.createElement('div');
        itemDiv.classList.add('carrinho-item');
        
        // Adiciona o nome e o preço
        itemDiv.innerHTML = `<p>${item.nome}</p><p>R$ ${item.preco.toFixed(2)}</p>`;
        
        // Adiciona o botão de remover (DELETE)
        let botaoRemover = document.createElement('button');
        botaoRemover.classList.add('botao-remover');
        botaoRemover.innerText = 'Remover';
        // A função removerDoCarrinho será chamada com o índice 'i' do item
        botaoRemover.onclick = function() {
            removerDoCarrinho(i);
        };
        
        itemDiv.appendChild(botaoRemover);
        listaCarrinhoDiv.appendChild(itemDiv);

        // Soma o preço do item ao total (UPDATE do total)
        total += item.preco;
    }

    // Atualiza o valor total na página
    document.getElementById('valor-total').innerText = `R$ ${total.toFixed(2)}`;
}


// DELETE (Remover item do carrinho)
function removerDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Remove o item do array na posição 'index'
    carrinho.splice(index, 1);

    // Salva o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Recarrega a lista na página para mostrar a remoção
    carregarCarrinho();
}

/*
    Para a página de checkout, você pode criar uma função de validação.
    Exemplo:
*/
function validarFormularioCheckout() {
    let nome = document.getElementById('nomeCompleto').value;
    let endereco = document.getElementById('endereco').value;

    // Verifica se os campos estão vazios
    if (nome === "" || endereco === "") {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return false; // Impede o envio do formulário
    }

    alert("Compra finalizada com sucesso! (Isso é uma simulação)");
    
    // Limpa o carrinho depois da compra
    localStorage.removeItem('carrinho');
    window.location.href = "index.html"; // Volta pra home
    return true;
}