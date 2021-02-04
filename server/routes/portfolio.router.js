const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/:id', rejectUnauthenticated, (req, res) => {
    const queryText =`SELECT * FROM project WHERE company_fk = $1 ;`;
    console.log(req.params.id);
    
    pool.query(queryText, [req.params.id])
        .then((result) => {
            console.log('here');
            
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('Error completing the GET route for PORTFOLIO');
            res.sendStatus(500);
        });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;