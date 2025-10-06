class Perfil {
    constructor(usuarioId) {
        this.usuarioId = usuarioId;
    }

    async atualizarUsuario() {
        const nome = document.getElementById('nomePerfil').value;
        const email = document.getElementById('emailPerfil').value;
        const senha = document.getElementById('senhaPerfil').value;

        try {
            const response = await fetch(`${base_url}/${this.usuarioId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, email, senha })
            });

            if (response.ok) {
                const upadatedUser = await response.json();
                saveUser(upadatedUser);
                alert('Perfil atualizado com sucesso!');
            } else {
                alert('Erro ao atualizar perfil.');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    async deletarUsuario() {
        if (!this.usuarioId) return alert('Usuário não encontrado.');
        if (!confirm('Tem certeza que deseja deletar sua conta?')) return;

        try {
            const response = await fetch(`${base_url}/${this.usuarioId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Conta deletada com sucesso!');
                localStorage.removeItem('@dataUser'); // ✅ limpar localStorage
                window.location.href = '../Login/index.html';
            } else {
                alert('Erro ao deletar conta.');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    }
}

const usuarioLogado = JSON.parse(localStorage.getItem('@dataUser'));
const perfil = new Perfil(usuarioLogado?.id);

document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = JSON.parse(localStorage.getItem('@dataUser'));

    if (usuarioLogado) {
        document.getElementById('nomePerfil').value = usuarioLogado.nome || '';
        document.getElementById('emailPerfil').value = usuarioLogado.email || '';
        document.getElementById('senhaPerfil').value = usuarioLogado.senha || '';
    } else {
        alert('Nenhum usuário logado encontrado. Faça login novamente.');
        window.location.href = '../Login/index.html';
    }
});