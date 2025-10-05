async function getAllUsers() {
  try {
    const resposta = await fetch(base_url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (resposta.ok) {
      const users = await resposta.json();

      const lista = document.getElementById("userList");
      lista.innerHTML = "";

      users.forEach(user => {
        const li = document.createElement("li");
        li.textContent = `Nome: ${user.nomeCompleto} | Email: ${user.email}`;
        lista.appendChild(li);
      });

    } else {
      alert("Erro ao buscar usuários");
    }

  } catch (error) {
    alert("Não foi possível conectar ao servidor");
  }
}

async function getUserById(idUser) {
  try {
    const resposta = await fetch(`${base_url}/${idUser}`);
    if (resposta.ok) {
      const user = await resposta.json();
      console.log("Usuário encontrado:", user);
      return user;
    } else {
      alert("Usuário não encontrado");
    }
  } catch (error) {
    alert("Erro ao buscar usuário");
  }
}