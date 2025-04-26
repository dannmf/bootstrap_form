/**
 * Script principal que inicializa todos os componentes da aplicação
 */
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa a barra de navegação
    navbarManager.init();
    
    // Inicializa o gerenciador do formulário
    formHandler.init();
    
    // Inicializa o gerenciador da lista de usuários
    userListManager.init();
});
