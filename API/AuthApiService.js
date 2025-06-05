// AuthApiService.js
// Serviço para autenticação (login/cadastro) e gerenciamento de token
import ApiService from './ApiService';

const resource = 'auth';

const AuthApiService = {
  async login(email, senha) {
    try {
        console.log('Tentando login com email:', email, 'e senha:', senha);
        const response = await ApiService.post(resource + '/login', { email, password: senha });
        console.log('Resposta completa do login:', response);
        if (response.accessToken) { 
            ApiService.setToken(response.accessToken); 
            ApiService.setToken(response.accessToken);
        if (response.user) { 
          ApiService.setUser(response.user); 
        }
        
        
        return true;
      } else {
        console.error('Login falhou, token não recebido:', response);
        return false;
      }
    } catch (error) {
      console.error('Erro ao tentar login:', error);
      return false;
    }
  },

  async register({ name, email, age, password, confirmpassword }) {
    return ApiService.post(resource +'/register', { name, email, age, password, confirmpassword });
  },

  logout() {
    ApiService.clearToken();
  },
};

export default AuthApiService;
