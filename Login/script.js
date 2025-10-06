async function logarUsuario() {
    const email = document.getElementById("emailLogin").value;
    const senha = document.getElementById("senhaLogin").value;

    const resposta = await fetch(base_url);
    const usuarios = await resposta.json();

    const usuarioEncontrado = usuarios.find(
        (user) => user.email === email && user.password === senha
    );

    if (usuarioEncontrado) {
        alert("Login realizado com sucesso!");
        saveUser(usuarioEncontrado);
        window.location.href = "../Home/index.html";
    } else {
        alert("Email ou senha incorretos. Por favor, tente novamente.");
    }
}