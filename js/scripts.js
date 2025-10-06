/*
    js/scripts.js
    Lógica do carrinho e checkout.
*/

// CREATE (POST): Adicionar item ao carrinho
function adicionarAoCarrinho(nome, preco) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let itemExistente = carrinho.find(item => item.nome === nome);
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
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
        listaCarrinhoDiv.innerHTML += `
            <div class="carrinho-item">
                <p>${item.nome}</p>
                <div class="item-quantidade">
                    <label>Qtd:</label>
                    <input type="number" value="${item.quantidade}" min="1" onchange="atualizarQuantidade(${i}, this.value)">
                </div>
                <p>R$ ${subtotal.toFixed(2)}</p>
                <button class="botao-remover" onclick="removerDoCarrinho(${i})">Remover</button>
            </div>`;
    }
    document.getElementById('valor-total').innerText = `R$ ${total.toFixed(2)}`;
}

// UPDATE (PUT): Atualizar a quantidade de um item
function atualizarQuantidade(index, novaQuantidade) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let quantidade = parseInt(novaQuantidade);
    if (quantidade > 0) {
        carrinho[index].quantidade = quantidade;
    } else {
        carrinho.splice(index, 1);
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
}

// DELETE: Remover item do carrinho
function removerDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
}

// Validação do Formulário de Checkout
function validarFormularioCheckout() {
    let nome = document.getElementById('nomeCompleto').value;
    let email = document.getElementById('email').value;
    let cep = document.getElementById('cep').value;

    if (nome === "" || email === "" || cep === "") {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return false;
    }
    let emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        alert("Por favor, insira um endereço de e-mail válido.");
        return false;
    }
    let cepRegex = /^[0-9]+$/;
    if (!cepRegex.test(cep)) {
        alert("O CEP deve conter apenas números.");
        return false;
    }
    
    alert("Compra finalizada com sucesso! (Isso é uma simulação)");
    localStorage.removeItem('carrinho');
    // CORRIGIDO: Adicionado "../" para voltar para a página inicial
    window.location.href = "../index.html";
    return true;
}