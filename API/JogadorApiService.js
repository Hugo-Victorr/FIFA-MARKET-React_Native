// JogadorApiService.js
// Serviço para consumir a API de jogadores
import ApiService from './ApiService';

const resource = 'jogadores';

const JogadorApiService = {
  async insert(jogador) {
    // POST /jogadores/adiciona, body: { ...jogador }
    return ApiService.post(resource + '/adiciona', jogador, true);
  },
  async update(jogador) {
    // PUT /jogadores/atualiza/:id, body: { ...jogador }
    return ApiService.put(resource + '/atualiza', jogador.id, jogador, true);
  },
  async getAll() {
    // GET /jogadores
    return ApiService.get(resource, true);
  },
  async getById(id) {
    // GET /jogadores/:id
    return ApiService.get(`${resource}/${id}`, true);
  },
  async deleteById(id) {
    // DELETE /jogadores/delete/:id
    return ApiService.delete(resource + '/delete', id, true);
  },
  async clearAll() {
    const response = await fetch(`${resource}/clear`, {
      method: 'POST',
      headers: ApiService.getAuthHeaders ? ApiService.getAuthHeaders() : {},
    });
    if (!response.ok) throw new Error('Erro ao limpar dados');
    return response.json();
  }
};

export default JogadorApiService;
