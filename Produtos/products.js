document.addEventListener('DOMContentLoaded', function() {
    const selectTamanho = document.getElementById('select-tamanho');
    const saboresContainer = document.getElementById('sabores-container');
    const precoModal = document.getElementById('preco-modal');

    const precos = {'30': 50.00,'60': 90.00};
    const sabores = ['Laranja', 'Maçã-Verde', 'Morango', 'Pêssego', 'Uva'];

    function atualizarModal() {
        const tamanhoSelecionado = selectTamanho.value;
        saboresContainer.innerHTML = '';
        precoModal.textContent = `Preço: R$ ${precos[tamanhoSelecionado].toFixed(2)}`;

        if (tamanhoSelecionado === '60') {
            criarSeletorSabor('Sabor 1:', 'select-sabor-1');
            criarSeletorSabor('Sabor 2:', 'select-sabor-2');
        } else {
            criarSeletorSabor('Sabor:', 'select-sabor-1');
        }
    }

    function criarSeletorSabor(labelTexto, id) {
        const div = document.createElement('div');
        div.className = 'mb-3';
        div.innerHTML = `
            <label for="${id}" class="form-label">${labelTexto}</label>
            <select class="form-select" id="${id}">
                ${sabores.map(sabor => `<option value="${sabor}">${sabor}</option>`).join('')}
            </select>
        `;
        saboresContainer.appendChild(div);
    }

    selectTamanho.addEventListener('change', atualizarModal);
    atualizarModal();
});

window.adicionarAoCarrinho = function(nome, preco) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produtoExistente = carrinho.find(item => item.nome === nome);

    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert(`✅ ${nome} adicionado ao carrinho por R$ ${preco.toFixed(2)}`);
};

window.adicionarKitAoCarrinho = function() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const nome = 'Kit de Gomas';
    const tamanho = document.getElementById('select-tamanho').value;
    const quantidade = parseInt(document.getElementById('input-quantidade').value);
    const preco = tamanho === '30' ? 50.00 : 90.00;

    const sabor1 = document.getElementById('select-sabor-1').value;
    const sabor2Element = document.getElementById('select-sabor-2');
    const saboresString = sabor2Element ? `${sabor1} e ${sabor2Element.value}` : sabor1;

    const produtoNome = `${nome} (${tamanho} gomas, Sabores: ${saboresString})`;
    const produtoExistente = carrinho.find(item => item.nome === produtoNome);

    if (produtoExistente) {
        produtoExistente.quantidade += quantidade;
    } else {
        carrinho.push({ nome: produtoNome, preco, quantidade });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    const modalKitGomas = bootstrap.Modal.getInstance(document.getElementById('modalKitGomas'));
    modalKitGomas.hide();

    alert(`✅ Adicionado ao carrinho: ${produtoNome}, Quantidade: ${quantidade}`);
};
