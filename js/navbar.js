/**
 * Gerenciador da barra de navegação
 */
const navbarManager = {
    /**
     * Inicializa a barra de navegação
     */
    init() {
        this.carregarNavbar();
    },

    /**
     * Carrega o componente navbar nas páginas
     */
    carregarNavbar() {
        const navbarContainer = document.getElementById('navbar-container');
        
        if (navbarContainer) {
            // Verifica se estamos na página de usuários ou na página principal
            const isUsuariosPage = window.location.href.includes('usuarios.html');
            
            // Insere a barra de navegação diretamente
            navbarContainer.innerHTML = `
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">🤠</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="nav-link ${!isUsuariosPage ? 'active' : ''}" 
                                       ${!isUsuariosPage ? 'aria-current="page"' : ''} 
                                       href="${isUsuariosPage ? '../index.html' : 'index.html'}">Cadastro</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link ${isUsuariosPage ? 'active' : ''}" 
                                       ${isUsuariosPage ? 'aria-current="page"' : ''}
                                       href="${isUsuariosPage ? 'usuarios.html' : 'pages/usuarios.html'}">Usuários</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            `;
        }
    }
};
