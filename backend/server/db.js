const Pool=require("pg").Pool;

const pool=new Pool({
    user:'postgres',
    password:'zeenatmalikk16',
    host:'localhost',
    port:5432,
    database:'Hello_app'
})

module.exports=pool;