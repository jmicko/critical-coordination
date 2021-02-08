const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
   rejectUnauthenticated,
} = require('../modules/authentication-middleware');


//will need rejectunauthenticated text here 
router.get('/:id', rejectUnauthenticated, (req, res) => {
   const sqlText = `SELECT * 
                     FROM "project
                     WHERE project.id = $1";`


   pool.query(sqlText, [req.params.id])
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