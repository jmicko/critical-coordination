const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//will need rejectunauthenticated text here 
router.get('/', (req, res) => {
  const sqlText = `SELECT * FROM "task";`
  pool.query(sqlText, [])
  .then( (result) => {
     res.send(result.rows)
  })
  .catch( (error) => {
     console.log('error in TASK GET route, ', error);
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;