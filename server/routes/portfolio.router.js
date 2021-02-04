const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/:id', rejectUnauthenticated, (req, res) => {
    const queryText1 =` SELECT *
                        FROM project
                        INNER JOIN company_location 
                        ON company_location.id = project.location_fk
                        WHERE project.company_fk = $1`;
    console.log(req.params.id);
    
    pool.query(queryText1, [req.params.id])
        .then((result) => {
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