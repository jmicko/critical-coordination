const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// ---- GET route ----
router.get('/:id', rejectUnauthenticated, (req, res) => {
    
    console.log(req.params.id)
    //This will grab everything for anyone working at critical coordination
    // and the else is for any other company other than critical coordination
    if( req.params.id === '2' ) {
        const queryTextAdmin = `SELECT * 
                                FROM project
                                INNER JOIN company_location
                                ON company_location.id = project.location_fk;`;
        pool.query(queryTextAdmin)
            .then((result) => {
                res.send(result.rows);
            })
            .catch((error) => {
                console.log('Error completeing the GET route for PORTFOLIO ADMIN', error);
                res.sendStatus(500);
            });
    } else {
        const queryText1 =` SELECT *
                            FROM project
                            INNER JOIN company_location 
                            ON company_location.id = project.location_fk
                            WHERE project.company_fk = $1`;    
        pool.query(queryText1, [req.params.id])
            .then((result) => {
                res.send(result.rows);
            })
            .catch((error) => {
                console.log('Error completing the GET route for PORTFOLIO', error);
                res.sendStatus(500);
            });
    }
});


router.put('/update', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    const queryText1 =  `UPDATE project SET project_name=$1, "PO_Number"=$2, due_date=$3 WHERE id = $4;`;
    const queryText2 = `UPDATE company_location SET location_name=$1 WHERE id=$2`

    pool.query(queryText1, [req.body.project_name, req.body.PO_Number, req.body.due_date, req.body.project_id])
        .then(() => {
            pool.query(queryText2, [req.body.location_name, req.body.location_id])
            .then(() => {
                res.sendStatus(201);
            })            
        })
        .catch((error) => {
            console.log('Error completing the PUT route for PORTFOLIO', error);
            res.sendStatus(500);
        })

  // POST route code here
});

module.exports = router;