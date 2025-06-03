// ApiService.js
// Serviço central para requisições à sua API externa
// Adapte os endpoints conforme necessário

// const BASE_URL = 'http://localhost:3000'; // Altere para o endpoint real
const BASE_URL = 'http://192.168.1.6:3000'; // Altere para o endpoint real

let authToken = null;  
let authRefreshToken = null;
let currentUser = null;

const ApiService = {
  setToken(token) {
    authToken = token; 
  },
  setRefreshToken(token) {
    authRefreshToken = token;  
  },
  // clearToken() {
  //   authToken = null;
  //   currentUser = null; 
  // },
  setUser(user) {
    currentUser = user; 
  },
  getUser() {
    return currentUser;
  }, 
  async get(resource, useAuth = false) {  
    const headers = {};
    if (useAuth && authToken) headers['Authorization'] = `Bearer ${authToken}`;
    let url = `${BASE_URL}/${resource}`;
    const options = { headers };
    const response = await fetch(url, options);
    if (!response.ok) throw new Error('Erro ao buscar dados');
    return response.json();
  },

  async post(resource, data, useAuth = false) {
    const headers = { 'Content-Type': 'application/json' };
    if (useAuth && authToken) headers['Authorization'] = `Bearer ${authToken}`;
    let body = { ...data };
    const response = await fetch(`${BASE_URL}/${resource}`, { 
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error('Erro ao salvar dados');
    return response.json();
  },

  async put(resource, id, data, useAuth = false) {  
    const headers = { 'Content-Type': 'application/json' };
    if (useAuth && authToken) headers['Authorization'] = `Bearer ${authToken}`;
    let body = { ...data };
    const response = await fetch(`${BASE_URL}/${resource}/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error('Erro ao atualizar dados');
    return response.json();
  },

  async delete(resource, id, useAuth = false) {
    const headers = {};
    if (useAuth && authToken) headers['Authorization'] = `Bearer ${authToken}`;
    let url = `${BASE_URL}/${resource}/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers,
    });
    if (!response.ok) throw new Error('Erro ao deletar dados');
    return response.json();
  },
};

export default ApiService;
