const changeUser = async (event) => {

    event.preventDefault();

    let nomeCompleto = document.getElementById('nomeCompleto').value.trim();
    let email = document.getElementById('sobrenome').value.trim();
    let password = document.getElementById('password').value.trim();

    if(!nomeCompleto || !email || !password) {
        alert("Preencha as informações")
        return;
    }

    const data = {
        nomeCompleto: nomeCompleto,
        email: email,
        password: password
    }

    const convertJson = JSON.stringify(data);


    try{
        const resposta = await fetch(`${base_url}/${idUser}`, {
            method: 'PUT', 
            body: convertJson,
            headers: {
                'Content-type': 'application/json'
            }
        });

        if(resposta.status === 200 || resposta.status === 201){
            alert("Usuario alterado com sucesso!");
            location.reload();
        }else{
            alert("Não foi possivel alterar o usuário no momento");
        }  
    }catch(error){
        alert("Não foi possível conectar ao servidor")
    }
}
