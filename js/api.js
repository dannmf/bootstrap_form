// Configuração base do axios
const API_URL = 'http://localhost:3333';

// Funções para interagir com a API
const userAPI = {
  // Criar usuário
  createUser: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/users`, userData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  },
  
  // Listar todos os usuários
  listUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      return response.data;
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      throw error;
    }
  },
  
  // Buscar usuário por ID
  getUserById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar usuário ${id}:`, error);
      throw error;
    }
  },
  
  // Atualizar usuário
  updateUser: async (id, userData) => {
    try {
      const response = await axios.put(`${API_URL}/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar usuário ${id}:`, error);
      throw error;
    }
  },
  
  // Excluir usuário
  deleteUser: async (id) => {
    try {
      await axios.delete(`${API_URL}/users/${id}`);
      return true;
    } catch (error) {
      console.error(`Erro ao excluir usuário ${id}:`, error);
      throw error;
    }
  }
};