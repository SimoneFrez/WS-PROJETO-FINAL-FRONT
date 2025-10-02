// scripts.js

// Suas funções de login e de montagem de kit continuam aqui...
function fazerLogin() {
    var usuario = document.getElementById("usuario").value;
    var senha = document.getElementById("senha").value;
    if (usuario === "aluno" && senha === "123") {
        alert("Login bem-sucedido!");
        window.location.href = "index.html";
    } else {
        alert("Usuário ou senha incorretos.");
    }
}
// (Aqui entram as funções do kit.html se você as estiver usando)

/*
    LÓGICA DO CARRINHO (CRUD COMPLETO)
*/

// CREATE (POST): Adicionar item ao carrinho
function adicionarAoCarrinho(nome, preco) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Verifica se o item já existe no carrinho
    let itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        // Se existe, apenas aumenta a quantidade (isso já é um tipo de PUT)
        itemExistente.quantidade++;
    } else {
        // Se não existe, adiciona o novo produto com quantidade 1
        carrinho.push({ nome: nome, preco: preco, quantidade: 1 });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert(nome + " foi adicionado ao carrinho!");
}

// READ (GET): Carregar e mostrar o carrinho na página
function carregarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let listaCarrinhoDiv = document.getElementById('lista-carrinho');
    listaCarrinhoDiv.innerHTML = '';
    let total = 0;

    for (let i = 0; i < carrinho.length; i++) {
        let item = carrinho[i];
        let subtotal = item.preco * item.quantidade;
        total += subtotal;
        
        // Agora o HTML do item inclui um campo para mudar a quantidade
        listaCarrinhoDiv.innerHTML += `
            <div class="carrinho-item">
                <p>${item.nome}</p>
                <div class="item-quantidade">
                    <label>Qtd:</label>
                    <input type="number" value="${item.quantidade}" min="1" onchange="atualizarQuantidade(${i}, this.value)">
                </div>
                <p>R$ ${subtotal.toFixed(2)}</p>
                <button class="botao-remover" onclick="removerDoCarrinho(${i})">Remover</button>
            </div>
        `;
    }
    document.getElementById('valor-total').innerText = `R$ ${total.toFixed(2)}`;
}

// UPDATE (PUT): Atualizar a quantidade de um item
function atualizarQuantidade(index, novaQuantidade) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    // Converte a nova quantidade para número, garantindo que seja pelo menos 1
    let quantidade = parseInt(novaQuantidade);
    if (quantidade > 0) {
        carrinho[index].quantidade = quantidade;
    } else {
        // Se a quantidade for zero ou menor, remove o item
        carrinho.splice(index, 1);
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    // Recarrega a visualização do carrinho para mostrar o novo total
    carregarCarrinho();
}

// DELETE: Remover item do carrinho
function removerDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
}

/*
    VALIDAÇÃO AVANÇADA DO FORMULÁRIO DE CHECKOUT
*/
function validarFormularioCheckout() {
    let nome = document.getElementById('nomeCompleto').value;
    let email = document.getElementById('email').value;
    let cep = document.getElementById('cep').value;

    // 1. Validação de campos vazios (já tínhamos)
    if (nome === "" || email === "" || cep === "") {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return false;
    }

    // 2. Validação do formato do E-mail (usando uma expressão regular simples)
    let emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        alert("Por favor, insira um endereço de e-mail válido.");
        return false;
    }

    // 3. Validação do CEP (verifica se contém apenas números)
    let cepRegex = /^[0-9]+$/;
    if (!cepRegex.test(cep)) {
        alert("O CEP deve conter apenas números.");
        return false;
    }
    
    // Se todas as validações passarem
    alert("Compra finalizada com sucesso! (Isso é uma simulação)");
    localStorage.removeItem('carrinho');
    window.location.href = "index.html";
    return true; // Permite o "envio" do formulário
}