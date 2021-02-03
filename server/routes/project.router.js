const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
   const sqlText = `SELECT * FROM "project";`
   pool.query(sqlText, [])
      .then((result) => {
         res.send(result.rows)
      })
      .catch((error) => {
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