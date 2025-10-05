const user = getUser();
if (!user) {
  window.location.href = "../Login/login.html";
}

document.getElementById("nomePerfil").value = user.nomeCompleto;
document.getElementById("emailPerfil").value = user.email;
document.getElementById("senhaPerfil").value = user.password;

async function atualizarPerfil() {
  const dadosAtualizados = {
    nomeCompleto: document.getElementById("nomePerfil").value,
    email: document.getElementById("emailPerfil").value,
    password: document.getElementById("senhaPerfil").value
  };

  const resposta = await fetch(`${base_url}/${user.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dadosAtualizados)
  });

  const dados = await resposta.json();
  saveUser(dados);
  alert("Perfil atualizado com sucesso!");
}

async function deletarConta() {
  if (confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.")) {
    await fetch(`${base_url}/${user.id}`, { method: "DELETE" });
    removeUser();
    alert("Conta excluída com sucesso!");
    window.location.href = "../Cadastro/cadastro.html";
  }
}

function logout() {
  removeUser();
}