// VendaItemApiService.js
// Serviço para consumir a API de itens de venda
import ApiService from './ApiService';

const resource = 'vendaitens';

const VendaItemApiService = {
  async insert(item) {
    return ApiService.post(resource + '/adiciona', item, true);
  },
  async getItensDaVenda(venda_id) {
    // GET /vendaitens/venda/:venda_id 
    return ApiService.get(`${resource}/${venda_id}`, true);
  },
  async getAll() {
    return ApiService.get(resource, true);
  },
  async deleteById(id) {
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

export default VendaItemApiService;
