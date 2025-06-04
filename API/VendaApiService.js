// VendaApiService.js
// Serviço para consumir a API de vendas
import ApiService from './ApiService';

const resource = 'vendas';

const VendaApiService = {
  async insert(venda) {
    // POST /vendas/adiciona, body: { ...venda }
    console.log('Inserindo venda:', venda);
    return ApiService.post(resource + '/adiciona', venda, true);
  },
  async update(venda) {
    // PUT /vendas/atualiza/:id, body: { ...venda }
    return ApiService.put(resource + '/atualiza', venda.id, venda, true);
  },
  async getAll() {
    // GET /vendas
    return ApiService.get(resource, true);
  },
  async getById(id) {
    // GET /vendas/:id
    return ApiService.get(`${resource}/${id}`, true);
  },
  async deleteById(id) {
    // DELETE /vendas/delete/:id
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

export default VendaApiService;
