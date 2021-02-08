const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

//will need rejectunauthenticated text here 
router.get('/:id', rejectUnauthenticated, (req, res) => {
  console.log(`SHOULD BE task id from task router line 7`, req.params);
  const sqlText = `SELECT * FROM "task" WHERE "id"=$1`
  pool.query(sqlText, [req.params.id])
  .then( (result) => {
    console.log(`hey look at these RESULTS`, result.rows);
     res.send(...result.rows)
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