/**
 * Gerenciador do formulário de cadastro/edição
 */
const formHandler = {
    /**
     * Inicializa o gerenciador de formulário
     */
    init() {
        this.setupForm();
        this.checkEditMode();
    },

    /**
     * Configura o formulário e adiciona listeners de eventos
     */
    setupForm() {
        const userForm = document.getElementById('userForm');
        
        if (userForm) {
            userForm.addEventListener('submit', async (event) => {
                // Previne o comportamento padrão do formulário
                event.preventDefault();
                
                // Captura os valores dos campos
                const email = document.getElementById('email').value;
                const name = document.getElementById('name').value;
                const password = document.getElementById('password').value;
                const birthDate = document.getElementById('birthDate').value;
                
                // Captura o ID do usuário se estiver em modo de edição
                const userId = document.getElementById('userId')?.value;
                
                // Cria o objeto com os dados do usuário
                const userData = {
                    email,
                    name,
                    password,
                    birthDate
                };
                
                try {
                    let result;
                    if (userId) {
                        // Está editando um usuário existente
                        result = await userAPI.updateUser(userId, userData);
                        alert('Usuário atualizado com sucesso!');
                    } else {
                        // Está criando um novo usuário
                        result = await userAPI.createUser(userData);
                        alert('Usuário criado com sucesso!');
                    }
                    
                    console.log('Operação realizada com sucesso:', result);
                    
                    // Limpa o formulário
                    userForm.reset();
                    // Reseta para modo de criação
                    document.getElementById('formTitle').textContent = 'Formulário Completo';
                    document.querySelector('button[type="submit"]').textContent = 'Enviar';
                    
                    // Remove o campo de ID se existir
                    const userIdField = document.getElementById('userId');
                    if (userIdField) userIdField.remove();
                    
                    // Redireciona para a página de usuários se estiver editando
                    if (userId) {
                        window.location.href = 'pages/usuarios.html';
                    }
                } catch (error) {
                    console.error('Erro ao processar operação:', error);
                    alert('Erro ao processar operação. Verifique o console para mais detalhes.');
                }
            });
        }
    },

    /**
     * Verifica se está em modo de edição (pela URL) e preenche o formulário
     */
    checkEditMode() {
        const userForm = document.getElementById('userForm');
        const urlParams = new URLSearchParams(window.location.search);
        const editId = urlParams.get('edit');
        
        if (editId && userForm) {
            // Recupera os dados do usuário do sessionStorage
            const userData = JSON.parse(sessionStorage.getItem('editUser'));
            if (userData) {
                // Preenche o formulário com os dados do usuário
                document.getElementById('email').value = userData.email || '';
                document.getElementById('name').value = userData.name || '';
                document.getElementById('birthDate').value = userData.birthDate ? userData.birthDate.split('T')[0] : '';
                
                // Não preenche a senha por segurança
                document.getElementById('password').value = '';
                
                // Adiciona campo oculto para armazenar o ID
                const idField = document.createElement('input');
                idField.type = 'hidden';
                idField.id = 'userId';
                idField.value = editId;
                userForm.appendChild(idField);
                
                // Atualiza o título e o botão
                document.getElementById('formTitle').textContent = 'Editar Usuário';
                document.querySelector('button[type="submit"]').textContent = 'Atualizar';
                
                // Limpa o sessionStorage
                sessionStorage.removeItem('editUser');
            }
        }
    }
};
