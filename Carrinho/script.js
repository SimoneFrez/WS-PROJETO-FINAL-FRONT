let carrinho = [];

const adicionarAoCarrinho = (nome, preco) => {
    const produtoExistente = carrinho.find(item => item.nome === nome);
    
    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        carrinho.push({nome, preco, quantidade: 1});
    }

    atualizarCarrinho();
}

const removerDoCarrinho = (nome) => {
    carrinho = carrinho.filter(item => item.nome !== nome);
    atualizarCarrinho;
}

const atualizarCarrinho = () => {
    const lista = document.getElementById("lista-carrinho");
    const totalElemento = document.getElementById("valor-total");
    const contador = document.getElementById("cart-count");

    lista.innerHTML = "";
    let total = 0;

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;

        const div = document.createElement("div");
        div.className = "carrinho-item";
        div.innerHTML = `
            <img src="produto.jpg" alt="${item.nome}">
            <div class="carrinho-info">
                <h4>${item.nome}</h4>
                <p>Quantidade: ${item.quantidade}</p>
                <p>Preço: R$ ${item.preco.toFixed(2)}</p>
            </div>
            <div class="carrinho-actions">
                <button onclick="removerDoCarrinho('${item.nome}')">Remover</button>
            </div>
        `;
        lista.appendChild(div);
    });

    totalElemento.textContent = total.toFixed(2);
    contador.textContent = carrinho.length;
}

const finalizarCompra = () => {
    if(carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    alert("Compra finalizada com sucesso!");
    carrinho = [];
    atualizarCarrinho();
}

document.getElementById("abrirCarrinho").addEventListener("click", () => {
    const lista = document.getElementById("lista-carrinho");
    if(lista.style.display === "block") {
        lista.style.display = "none";
    } else {
        lista.style.display = "block";
    }
});

const carregarCarrinho = () => {
    atualizarCarrinho();
}