const {Pool} =require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'nodejsAPI',
    password: 'sql',
    port: 5432,
  });
  
pool.query('SELECT NOW()',(err,res)=>{
    if(err){
        console.error('...Failed to connect to DB', err.stack);
    }else {
        console.log('...connected to db', res.rows[0].now);
      }
})

module.exports = pool;