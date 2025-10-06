const base_url = "https://68dda3d7d7b591b4b78cfc7e.mockapi.io/usuarios";

function saveUser(data) {
    console.log('Salvando usuário:', data);
    let userJson = JSON.stringify(data);
    localStorage.setItem('@dataUser', userJson);
}

function getUser() {
    let userJson = localStorage.getItem('@dataUser');
    if (userJson) {
        let dataConvert = JSON.parse(userJson);
        return dataConvert;
    }
    return null;
}

function removeUser() {
    localStorage.removeItem('@dataUser');
    console.log('Usuário removido do localStorage');
}

// Função para verificar autenticação em páginas protegidas
function verificarAutenticacao() {
    const usuario = getUser();
    if (!usuario) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = '../Login/login.html';
        return false;
    }
    return true;
}

// Função para verificar se usuário está logado
function verificarLogin() {
    const usuario = getUser();
    return usuario !== null;
}

// Função para obter dados do usuário logado
function getUsuarioLogado() {
    return getUser();
}