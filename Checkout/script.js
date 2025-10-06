document.addEventListener("DOMContentLoaded", () => {
  const metodoPagamento = document.getElementById("metodoPagamento");
  const divCartao = document.getElementById("pagamento-cartao");
  const divPix = document.getElementById("pagamento-pix");

  metodoPagamento.addEventListener("change", () => {
    const metodo = metodoPagamento.value;

    if (metodo === "cartao") {
      divCartao.style.display = "block";
      divPix.style.display = "none";
    } else if (metodo === "pix") {
      divCartao.style.display = "none";
      divPix.style.display = "block";
    } else {
      divCartao.style.display = "none";
      divPix.style.display = "none";
    }
  });
});