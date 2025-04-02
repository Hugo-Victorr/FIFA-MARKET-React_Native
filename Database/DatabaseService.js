import * as SQLite from 'expo-sqlite';

const DatabaseService = {
    init,
    getDatabase
  };

  export default DatabaseService;

let database = null;

async function getDatabase() { 
    if (!database) {
        database = await SQLite.openDatabaseAsync('N2_AlbumJogadores');
    }
    return database;
}

async function init() { 

  console.log('entrou no init');
  const db = await getDatabase(); 
  
  try {
  await db.execAsync(`  
    PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS jogadores (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          nome TEXT,
          idade INTEGER,
          posicao TEXT,
          ritmo INTEGER, 
          finalizacao INTEGER,
          passe INTEGER, 
          conducao INTEGER,
          defesa INTEGER,
          fisico INTEGER,
          preco REAL
        );
      `,
   );
   console.log('Tabela jogadores criada.');
}
catch (error){
    console.error('Erro ao criar tabela posicoes:', error.message);
}

   try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS posicoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL
      );
    `);
    console.log('Tabela posicoes criada.');
  } catch (error) {
    console.error('Erro ao criar tabela posicoes:', error.message);
  }

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

