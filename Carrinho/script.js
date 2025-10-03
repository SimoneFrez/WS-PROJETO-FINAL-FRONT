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
    const lista = document.getElementById("cart-items");
    const totalElemento = document.getElementById("total");
    const contador = document.getElementById("cart-count");

    lista.innerHTML = "";
    let total = 0;

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;

        const li = document.createElement("li");
        li.innerHTML = `
            ${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade}
            <button onclick="removerDoCarrinho('${item.nome}')">X</button>
        `;
        lista.appendChild();
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