const  express = require('express');
const  router = express.Router();
const  pool = require('../db/connection');

router.get('/sample', async (req, res) => {
    try{
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM sample_table');
        const data = { 'results': (result) ? result.rows : null};
        client.release();
        res.json(data);

    }catch(err){
        console.log("Error executing query: " + err);
        res.status(500).json({error:"Internal Server Error"});
    }
    
});

module.exports = router;