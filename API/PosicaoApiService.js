// PosicaoApiService.js
// Serviço para consumir a API de posições
import ApiService from './ApiService';

const resource = 'posicoes';

const PosicaoApiService = {
  async insert(nome) {
    // POST /posicoes/adiciona, body: { nome }
    return ApiService.post(resource + '/adiciona', { nome }, true);
  },
  async update(posicao) {
    // PUT /posicoes/atualiza/:id, body: { ...posicao }
    console.log('Atualizando posição:', posicao);
    return ApiService.put(resource + '/atualiza', posicao.id, posicao, true);
  },
  async getAll() {
    // GET /posicoes
    return ApiService.get(resource, true);
  },
  async getById(id) {
    // GET /posicoes/:id
    return ApiService.get(`${resource}/${id}`, true);
  },
  async deleteById(id) {
    // DELETE /posicoes/delete/:id
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

export default PosicaoApiService;
