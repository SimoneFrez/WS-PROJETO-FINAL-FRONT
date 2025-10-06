document.addEventListener('DOMContentLoaded', () => { //Quando a página for carregada
    document.querySelectorAll('.benefits-list .pergunta').forEach(pergunta => {
        pergunta.addEventListener('click', () => {
            const li = pergunta.parentElement;
            li.classList.toggle('active'); // alterna show/hide
        });
    });
});
