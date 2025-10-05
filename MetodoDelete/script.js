// async function deleteUser(event) {
//   event.preventDefault();

//   const idUser = document.getElementById("idUser").value.trim();

//   if (!idUser) {
//     alert("Digite o ID do usuário");
//     return;
//   }

//   try {
//     const resposta = await fetch(`${base_url}/${idUser}`, {
//       method: 'DELETE',
//     });

//     if (resposta.ok) {
//       alert("Usuário excluído com sucesso!");
//       location.reload();
//     } else {
//       alert("Não foi possível excluir o usuário");
//     }

//   } catch (error) {
//     alert("Erro ao conectar ao servidor");
//   }
// }
