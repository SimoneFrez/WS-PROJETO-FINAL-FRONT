document.addEventListener('DOMContentLoaded', function() {
    const selectTamanho = document.getElementById('select-tamanho');
    const saboresContainer = document.getElementById('sabores-container');
    const precoModal = document.getElementById('preco-modal');

    const precos = {
        '30': 50.00,
        '60': 90.00
    };

    const sabores = ['Laranja', 'Maçã-Verde', 'Morango', 'Pêssego', 'Uva'];

    // Atualiza o modal conforme o tamanho
    function atualizarModal() {
        const tamanhoSelecionado = selectTamanho.value;
        saboresContainer.innerHTML = '';
        precoModal.textContent = `Preço: R$ ${precos[tamanhoSelecionado].toFixed(2)}`;

        // Mostra 1 ou 2 seletores de sabor conforme o tamanho
        if (tamanhoSelecionado === '60') {
            criarSeletorSabor('Sabor 1:', 'select-sabor-1');
            criarSeletorSabor('Sabor 2:', 'select-sabor-2');
        } else {
            criarSeletorSabor('Sabor:', 'select-sabor-1');
        }
    }

    // Cria dinamicamente um seletor de sabor
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
    atualizarModal(); // inicia o modal
});

// Função global — chamada pelo botão do modal
window.adicionarKitAoCarrinho = function() {
    const nome = 'Kit de Gomas';
    const tamanho = document.getElementById('select-tamanho').value;
    const quantidade = document.getElementById('input-quantidade').value;
    const sabor1 = document.getElementById('select-sabor-1').value;
    let saboresString = sabor1;

    const sabor2Element = document.getElementById('select-sabor-2');
    if (sabor2Element) {
        const sabor2 = sabor2Element.value;
        saboresString = `${sabor1} e ${sabor2}`;
    }

    alert(`✅ Adicionado ao carrinho: ${nome} (${tamanho} gomas), Sabores: ${saboresString}, Quantidade: ${quantidade}`);

    const modalKitGomas = bootstrap.Modal.getInstance(document.getElementById('modalKitGomas'));
    modalKitGomas.hide();
};

// Exemplo simples de adicionar outros produtos
window.adicionarAoCarrinho = function(nome, preco) {
    alert(`✅ ${nome} adicionado ao carrinho por R$ ${preco.toFixed(2)}`);
};
