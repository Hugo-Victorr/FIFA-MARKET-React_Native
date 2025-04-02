import * as SQLite from 'expo-sqlite';

const JogadorService = {
  init,
  insert,
  update,
  getJogadores,
  getJogadorById,
  deleteJogadores,
  deleteJogadorById,
  deleteTable,
  deleteTableTest
};

export default JogadorService;

async function init() { 
  console.log('entrou no init');
  const db = await SQLite.openDatabaseAsync('N2_AlbumJogadores'); 
  
  // precisa ser execAsync
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

  // await db.execAsync(`
  //   PRAGMA journal_mode = WAL;
  //       CREATE TABLE IF NOT EXISTS jogadoresTest (
  //         id INTEGER PRIMARY KEY AUTOINCREMENT, 
  //         nome TEXT,
  //         idade INTEGER,
  //         preco REAL
  //       );
  //     `
  //  );
}

// precisa ser runAsyc
async function insert(jogador) {
  const db = await SQLite.openDatabaseAsync('N2_AlbumJogadores');
  try {
    await db.runAsync( 
      `INSERT INTO jogadores
        (nome, idade, posicao, ritmo, finalizacao, passe, conducao, defesa, fisico, preco) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        jogador.nome,
        jogador.idade,
        jogador.posicao,
        jogador.ritmo,
        jogador.finalizacao,
        jogador.passe,
        jogador.conducao,
        jogador.defesa,
        jogador.fisico,
        jogador.preco
      ]
    );
    console.log('Jogador inserido com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir jogador:', error.message);
  }
}

async function deleteJogadorById(id) {
  const db = await SQLite.openDatabaseAsync('N2_AlbumJogadores');

  try {
    await db.runAsync(`DELETE FROM jogadores WHERE id = ?;`, [id]);
    console.log(`Jogador com id ${id} deletado.`);
  } catch (error) {
    console.error('Erro ao deletar jogador:', error.message);
  }
}

async function update(jogador) {
  const db = await SQLite.openDatabaseAsync('N2_AlbumJogadores');

  try {
    await db.runAsync(
      `UPDATE jogadores SET 
        nome = ?, 
        idade = ?, 
        posicao = ?, 
        ritmo = ?, 
        finalizacao = ?, 
        passe = ?, 
        conducao = ?, 
        defesa = ?, 
        fisico = ?, 
        preco = ?
      WHERE id = ?;`,
      [
        jogador.nome,
        jogador.idade,
        jogador.posicao,
        jogador.ritmo,
        jogador.finalizacao,
        jogador.passe,
        jogador.conducao,
        jogador.defesa,
        jogador.fisico,
        jogador.preco,
        jogador.id // last param for WHERE id = ?
      ]
    );
    console.log(`Jogador com id ${jogador.id} atualizado.`); 
  } catch (error) {
    console.error('Erro ao atualizar jogador:', error.message); 
  }
}

// precisa ser getAllAsync
async function getJogadores() {  
  console.log('entrou no get');  
  const db = await SQLite.openDatabaseAsync('N2_AlbumJogadores');
  const rows = await db.getAllAsync(
    'SELECT * FROM jogadores;'    
  ); 

  console.log("linhas");
  console.log(rows.length);

  for (const row of rows){
    console.log(row.id, row.nome, row.idade, row.posicao, row.ritmo)  
  }

  return rows;
  
}

async function getJogadorById(id) {
  const db = await SQLite.openDatabaseAsync('N2_AlbumJogadores');
  const result = await db.getFirstAsync('SELECT * FROM jogadores WHERE id = ?;', [id]);
  return result;
}

async function deleteJogadores() {
  console.log('linhas apagadas apagada');
  const db = await SQLite.openDatabaseAsync('N2_AlbumJogadores');
 await db.runAsync('DELETE FROM jogadores;');
  
}

async function deleteTable() {
  console.log('tabela apagada'); 
  const db = await SQLite.openDatabaseAsync('N2_AlbumJogadores');
  await db.runAsync('DROP TABLE IF EXISTS jogadores;'); 
   
}  

async function deleteTableTest() {
  console.log('tabela apagada'); 
  const db = await SQLite.openDatabaseAsync('N2_AlbumJogadores');
  await db.runAsync('DROP TABLE IF EXISTS jogadoresTest;'); 
   
}  
  // Other CRUD methods...
