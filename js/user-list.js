/**
 * Gerenciador da lista de usuários
 */
const userListManager = {
    /**
     * Inicializa o gerenciador da lista de usuários
     */
    init() {
        if (window.location.href.includes('usuarios.html')) {
            this.loadUsers();
        }
    },

    /**
     * Carrega os usuários na página
     */
    async loadUsers() {
        const userListContainer = document.getElementById('userList');
        if (userListContainer) {
            try {
                const users = await userAPI.listUsers();
                
                // Limpa o container antes de adicionar os usuários
                userListContainer.innerHTML = '';
                
                // Adiciona cada usuário à lista
                users.forEach(user => {
                    const userCard = document.createElement('div');
                    userCard.className = 'card mb-3';
                    userCard.innerHTML = `
                        <div class="card-body">
                            <h5 class="card-title">${user.name}</h5>
                            <p class="card-text">Email: ${user.email}</p>
                            <p class="card-text">Data de Nascimento: ${new Date(user.birthDate).toLocaleDateString()}</p>
                            <div class="d-flex gap-2">
                                <button class="btn btn-primary btn-sm edit-user" data-id="${user.id}">Editar</button>
                                <button class="btn btn-danger btn-sm delete-user" data-id="${user.id}">Excluir</button>
                            </div>
                        </div>
                    `;
                    userListContainer.appendChild(userCard);
                });
                
                // Adiciona eventos aos botões
                this.setupButtons();
                
            } catch (error) {
                console.error('Erro ao carregar usuários:', error);
                userListContainer.innerHTML = '<div class="alert alert-danger">Erro ao carregar usuários.</div>';
            }
        }
    },

    /**
     * Configura os eventos dos botões de editar e excluir
     */
    setupButtons() {
        // Adiciona evento para os botões de excluir
        document.querySelectorAll('.delete-user').forEach(button => {
            button.addEventListener('click', async () => {
                const userId = button.getAttribute('data-id');
                if (confirm('Tem certeza que deseja excluir este usuário?')) {
                    try {
                        await userAPI.deleteUser(userId);
                        alert('Usuário excluído com sucesso!');
                        this.loadUsers(); // Recarrega a lista
                    } catch (error) {
                        console.error('Erro ao excluir usuário:', error);
                        alert('Erro ao excluir usuário.');
                    }
                }
            });
        });
        
        // Adiciona evento para os botões de editar
        document.querySelectorAll('.edit-user').forEach(button => {
            button.addEventListener('click', async () => {
                const userId = button.getAttribute('data-id');
                try {
                    const user = await userAPI.getUserById(userId);
                    // Redireciona para a página do formulário com os dados do usuário
                    sessionStorage.setItem('editUser', JSON.stringify(user));
                    window.location.href = '../index.html?edit=' + userId;
                } catch (error) {
                    console.error('Erro ao obter dados do usuário:', error);
                    alert('Erro ao obter dados do usuário para edição.');
                }
            });
        });
    }
};
