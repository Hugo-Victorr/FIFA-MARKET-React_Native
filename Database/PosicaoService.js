import * as SQLite from 'expo-sqlite';

const PosicaoService = {
  init,
  insert,
  getAll,
  update,
  deleteById
};

export default PosicaoService;

async function init() {
  const db = await SQLite.openDatabaseAsync('N2_AlbumJogadores');
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS posicoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL
      );
    `);
    console.log('Tabela posicoes criada/verificada.');
  } catch (error) {
    console.error('Erro ao criar tabela posicoes:', error.message);
  }
}

async function insert(nome) {
  const db = await SQLite.openDatabaseAsync('N2_AlbumJogadores');
  try {
    await db.runAsync(`INSERT INTO posicoes (nome) VALUES (?);`, [nome]);
    console.log('Posição inserida:', nome);
  } catch (error) {
    console.error('Erro ao inserir posição:', error.message);
  }
}

async function getAll() {
  const db = await SQLite.openDatabaseAsync('N2_AlbumJogadores');
  try {
    const rows = await db.getAllAsync('SELECT * FROM posicoes;');
    console.log('Posições encontradas:', rows);

    console.log("posicoes");
  console.log(rows.length);

  for (const row of rows){
    console.log(row.id, row.nome)  
  }

    return rows;
  } catch (error) {
    console.error('Erro ao buscar posições:', error.message);
    return [];
  }
}

async function update(posicao) {
  const db = await SQLite.openDatabaseAsync('N2_AlbumJogadores');
  try {
    await db.runAsync(
      `UPDATE posicoes SET nome = ? WHERE id = ?;`,
      [posicao.nome, posicao.id]
    );
    console.log(`Posição com id ${posicao.id} atualizada.`);
  } catch (error) {
    console.error('Erro ao atualizar posição:', error.message);
  }
}

async function deleteById(id) {
  const db = await SQLite.openDatabaseAsync('N2_AlbumJogadores');
  try {
    await db.runAsync(`DELETE FROM posicoes WHERE id = ?;`, [id]);
    console.log(`Posição com id ${id} deletada.`);
  } catch (error) {
    console.error('Erro ao deletar posição:', error.message);
  }
}
