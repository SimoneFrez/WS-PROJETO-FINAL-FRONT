const base_url = "https://68dda3d7d7b591b4b78cfc7e.mockapi.io/usuarios";

function saveUser(data) {
  localStorage.setItem('@dataUser', JSON.stringify(data));
}

function getUser() {
  return JSON.parse(localStorage.getItem('@dataUser'));
}

function removeUser() {
  localStorage.removeItem('@dataUser');
}