let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function atualizarCarrinho() {
    const lista = document.getElementById('lista-carrinho');
    const totalElemento = document.getElementById('valor-total');
    const contador = document.getElementById('contagemCarrinhos');

    if(!lista || !totalElemento) return;

    lista.innerHTML = '';
    let total = 0;

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;
        const div = document.createElement('div');
        div.className = 'carrinho-item';
        div.innerHTML = `
            <h4>${item.nome}</h4>
            <p>Quantidade: ${item.quantidade}</p>
            <p>Preço: R$ ${item.preco.toFixed(2)}</p>
            <button onclick="removerDoCarrinho('${item.nome}')">Remover</button>
        `;
        lista.appendChild(div);
    });

    totalElemento.textContent = `R$ ${total.toFixed(2)}`;
    if(contador) contador.textContent = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
}

window.removerDoCarrinho = function(nome) {
    carrinho = carrinho.filter(item => item.nome !== nome);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
};

window.finalizarCompra = function() {
    if(carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    alert("Compra finalizada com sucesso!");
    carrinho = [];
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
};

document.addEventListener('DOMContentLoaded', function() {
    atualizarCarrinho();
});