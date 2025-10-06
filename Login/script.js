function logarUsuario() {
    const email = document.getElementById("emailLogin").value;
    const senha = document.getElementById("senhaLogin").value;
    const lembrar = document.getElementById("lembrarLogin").checked;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioEncontrado = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuarioEncontrado) {
        alert("E-mail ou senha incorretos!");
        return;
    }

    if (lembrar) {
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
    } else {
        sessionStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
    }

    window.location.href = "../Home/index.html";
}

function loadUser() {
    const user = JSON.parse(localStorage.getItem("usuarioLogado")) || 
                 JSON.parse(sessionStorage.getItem("usuarioLogado"));
    if (user) {
        document.getElementById("nomeUser").innerText = user.nome;
    }
}

document.addEventListener('DOMContentLoaded', loadUser);