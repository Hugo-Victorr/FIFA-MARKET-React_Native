import * as SQLite from 'expo-sqlite';

const VendaService = {
    init,
    insertVenda,
    getVendas,
  };

  export default VendaService;

async function init() {
    const db = await SQLite.openDatabaseAsync('N2_AlbumJogadores');
  
    try {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS vendas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          data TEXT,
          total REAL,
          forma_pagamento TEXT
        );
      `);
      console.log('Tabela "vendas" criada/verificada.');
    } catch (error) {
      console.error('Erro ao criar tabela vendas:', error.message);
    }
  }

  
async function insertVenda(venda) {
    await db.runAsync(
      `INSERT INTO vendas (data, total, forma_pagamento) VALUES (?, ?, ?);`,
      [venda.data, venda.total, venda.forma_pagamento]
    );
  }
  
async function getVendas() {
    const rows = await db.getAllAsync(`SELECT * FROM vendas;`);

    console.log("vendas");
  console.log(rows.length);

    for (const row of rows){
        console.log(row.id, row.nome, row.idade, row.posicao, row.ritmo)  
      }
    
      return rows;
  }