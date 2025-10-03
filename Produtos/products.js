document.addEventListener('DOMContentLoaded', function() {
    const selectTamanho = document.getElementById('select-tamanho');
    const saboresContainer = document.getElementById('sabores-container');
    const precoModal = document.getElementById('preco-modal');

    const precos = {
        '30': 50.00,
        '60': 90.00
    };

    const sabores = ['Laranja', 'Maçã-Verde', 'Morango', 'Pêssego', 'Uva'];

    // Função para atualizar o modal com base no tamanho selecionado
    function atualizarModal() {
        const tamanhoSelecionado = selectTamanho.value;
        saboresContainer.innerHTML = '';
        precoModal.textContent = `Preço: R$ ${precos[tamanhoSelecionado].toFixed(2)}`;

        // Se o tamanho for 60 gomas, exibe 2 seletores de sabor
        if (tamanhoSelecionado === '60') {
            criarSeletorSabor('Sabor 1:', 'select-sabor-1');
            criarSeletorSabor('Sabor 2:', 'select-sabor-2');
        } else {
            // Caso contrário, exibe apenas 1
            criarSeletorSabor('Sabor:', 'select-sabor-1');
        }
    }

    // Função que cria um seletor de sabor dinamicamente
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

    // Adiciona um "ouvinte de evento" para o seletor de tamanho
    selectTamanho.addEventListener('change', atualizarModal);

    // Inicializa o modal na carga da página
    atualizarModal();
});

// A função 'adicionarKitAoCarrinho' precisa ser global para ser acessada pelo HTML
window.adicionarKitAoCarrinho = function() {
    const nome = 'Kit de Gomas';
    const tamanho = document.getElementById('select-tamanho').value;
    const quantidade = document.getElementById('input-quantidade').value;
    const sabor1 = document.getElementById('select-sabor-1').value;
    let saboresString = sabor1;

    // Se o segundo seletor de sabor existe, pega o valor dele
    const sabor2Element = document.getElementById('select-sabor-2');
    if (sabor2Element) {
        const sabor2 = sabor2Element.value;
        saboresString = `${sabor1} e ${sabor2}`;
    }

    // Você pode adaptar esta parte para a sua lógica de carrinho
    alert(`Adicionado ao carrinho: ${nome} (${tamanho} gomas), Sabores: ${saboresString}, Quantidade: ${quantidade}`);

    // Fecha o modal após adicionar ao carrinho
    const modalKitGomas = new bootstrap.Modal(document.getElementById('modalKitGomas'));
    modalKitGomas.hide();
};