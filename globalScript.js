const base_url = "https://68e4140e8e116898997aeebd.mockapi.io/APIfrontEnd";

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