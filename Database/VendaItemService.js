import * as SQLite from 'expo-sqlite';

const VendaItemService = {
    init,
    insert,
    deleteTable,
    getAll,
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

  
async function insert(item) {
  const db = await SQLite.openDatabaseAsync('N2_AlbumJogadores');
    await db.runAsync(
      `INSERT INTO venda_itens (venda_id, produto_id, quantidade, preco_unit, subtotal) VALUES (?, ?, ?, ?, ?);`,
      [item.venda_id, item.produto_id, item.quantidade, item.preco_unit, item.subtotal]
    );
  }

  async function getItensDaVenda(venda_id) { 
    const db = await SQLite.openDatabaseAsync('N2_AlbumJogadores');
    const rows = await db.getAllAsync(
      `SELECT * FROM venda_itens WHERE venda_id = ?;`,
      [venda_id]
    );

    return rows;
  }

  async function getAll() { 
    const db = await SQLite.openDatabaseAsync('N2_AlbumJogadores');
    const rows = await db.getAllAsync(
      `SELECT * FROM venda_itens;`
    );

    return rows;
  }

  async function deleteTable() {
    console.log('tabela apagada'); 
    const db = await SQLite.openDatabaseAsync('N2_AlbumJogadores');
    await db.runAsync('DROP TABLE IF EXISTS venda_itens;'); 
     
  }  