import * as SQLite from 'expo-sqlite';

const VendaItemService = {
    init,
    insertVendaItem,
    getItensDaVenda
  };

  export default VendaItemService;

  async function init() {
    const db = await SQLite.openDatabaseAsync('N2_AlbumJogadores');
  
    try {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS venda_itens (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          venda_id INTEGER,
          produto_id INTEGER,
          quantidade INTEGER,
          preco_unit REAL,
          subtotal REAL,
          FOREIGN KEY (venda_id) REFERENCES vendas(id),
          FOREIGN KEY (produto_id) REFERENCES produtos(id)
        );
      `);
      console.log('Tabela "venda_itens" criada/verificada.');
    } catch (error) {
      console.error('Erro ao criar tabela venda_itens:', error.message);
    }
  }

  
async function insertVendaItem(item) {
    await db.runAsync(
      `INSERT INTO venda_itens (venda_id, produto_id, quantidade, preco_unit, subtotal) VALUES (?, ?, ?, ?, ?);`,
      [item.venda_id, item.produto_id, item.quantidade, item.preco_unit, item.subtotal]
    );
  }
  
  async function getItensDaVenda(venda_id) {
    return await db.getAllAsync(
      `SELECT * FROM venda_itens WHERE venda_id = ?;`,
      [venda_id]
    );
  }