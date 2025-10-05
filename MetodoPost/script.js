function register(event) {
  event.preventDefault();

  let nomeCompleto = document.getElementById('nomeCompleto').value.trim();
  let email = document.getElementById('sobrenome').value.trim();
  let password = document.getElementById('password').value.trim();

  if (!nomeCompleto || !email || !password) {
    alert("Preencha as informações")
    return;
  }

  const data = {
    nomeCompleto: nomeCompleto,
    email: email,
    password: password
  }

  const convertJson = JSON.stringify(data);

  fetch(base_url, {
    method: 'POST',
    body: convertJson,
    headers: {
      'Content-type': 'application/json'
    }
  }).then((resposta) => {

    if (resposta.status === 201) {
      alert("Usuario criado com sucesso");
      location.reload();
    } else {
      alert("Não foi possivel criar o usario");
    }

  }).catch(() => {
    alert("Não foi possivel conectar com o servidor");
  })
}

async function registerAssincrono(event) {
  event.preventDefault();

  let nomeCompleto = document.getElementById('nomeCompleto').value.trim();
  let email = document.getElementById('sobrenome').value.trim();
  let password = document.getElementById('password').value.trim();

  if (!nomeCompleto || !email || !password) {
    alert("Preencha as informações")
    return;
  }

  const data = {
    nomeCompleto: nomeCompleto,
    email: email,
    password: password
  }

  const convertJson = JSON.stringify(data);

  try {

    const resposta = await fetch(base_url, {
      method: 'POST',
      body: convertJson,
      headers: {
        'Content-type': 'application/json'
      }
    })

    if (resposta.status === 201) {
      alert("Usuario criado com sucesso");
      location.reload();
    } else {
      alert("Não foi possivel criar o usario");
    }

  } catch (error) {
    alert("Não foi possivel conectar com o servidor");
  }
}