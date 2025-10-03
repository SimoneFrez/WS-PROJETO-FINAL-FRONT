function clickMenu() {
    let itens = document.getElementById('itens');
    if (itens.style.display === "flex") {
        itens.style.display = "none";
    } else {
        itens.style.display = "flex";
    }
}