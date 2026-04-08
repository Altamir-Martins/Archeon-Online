// Script simples para testar conexão com Supabase
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    console.log('🔄 Testando conexão com Supabase...');

    const client = await pool.connect();
    console.log('✅ Conexão estabelecida!');

    // Testar se as tabelas existem
    const tables = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    console.log('📋 Tabelas encontradas:', tables.rows.map(row => row.table_name));

    // Verificar se as tabelas principais existem
    const requiredTables = ['users', 'content', 'products', 'purchases', 'rewards'];
    const existingTables = tables.rows.map(row => row.table_name);

    const missingTables = requiredTables.filter(table => !existingTables.includes(table));

    if (missingTables.length > 0) {
      console.log('❌ Tabelas faltando:', missingTables);
      console.log('💡 Execute o arquivo supabase-schema.sql no SQL Editor do Supabase');
    } else {
      console.log('✅ Todas as tabelas necessárias existem!');
    }

    client.release();
    pool.end();

  } catch (error) {
    console.error('❌ Erro na conexão:', error.message);
    console.log('💡 Verifique se:');
    console.log('   1. A DATABASE_URL está correta no backend/.env');
    console.log('   2. O projeto Supabase está ativo');
    console.log('   3. O schema SQL foi executado no Supabase');
  }
}

testConnection();