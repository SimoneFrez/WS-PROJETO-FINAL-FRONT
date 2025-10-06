function enviarLink() {
    const email = document.getElementById('senhaLogin').value.trim();

    // Regex simples para validar email
    const regex = /^\S+@\S+\.\S+$/;

    if (!email) {
        alert("Por favor, preencha seu e-mail!");
        return;
    }

    if (!regex.test(email)) {
        alert("Por favor, insira um e-mail válido!");
        return;
    }

    alert(`Link de redefinição de senha enviado para ${email}`);
}
