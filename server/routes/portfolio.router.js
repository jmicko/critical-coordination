const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// ---- GET route ----
router.get('/', rejectUnauthenticated, (req, res) => {  

    //This will grab everything for anyone checking as an administrator
    // and the else is for any other company other than critical coordination
    if( req.user.user_type === 'admin' ) {
        const queryTextAdmin = `SELECT project_name, project.id, due_date, "PO_Number", address, location_name, location_fk  FROM project
                                JOIN company_location ON company_location.id = project.location_fk
                                JOIN company ON company.id = project.company_fk
                                WHERE project.archived=false
                                ORDER BY project.due_date ASC;`;
        pool.query(queryTextAdmin)
            .then((result) => {
                res.send(result.rows);
            })
            .catch((error) => {
                console.log('Error completing the GET route for PORTFOLIO ADMIN', error);
                res.sendStatus(500);
            });
    } else if (req.user.user_type === 'client') {
        const queryText1 =` SELECT project_name, project.id, due_date, "PO_Number", address, location_name, location_fk  FROM project
                            JOIN company_location ON company_location.id = project.location_fk
                            JOIN company ON company.id = project.company_fk
                            WHERE project.company_fk = $1 and project.archived=false
                            ORDER BY project.due_date ASC;`;    
        pool.query(queryText1, [req.user.company_fk])
            .then((result) => {
                res.send(result.rows);
            })
            .catch((error) => {
                console.log('Error completing the GET route for PORTFOLIO', error);
                res.sendStatus(500);
            });
    } else if (req.user.user_type === 'contractor') {
        const queryText1 = `SELECT * FROM task
                            JOIN company on company.id = task.company_fk
                            JOIN project on project.id = task.project_fk
                            WHERE task.company_fk = $1 and task.archived=false
                            ORDER BY task.nlt_date ASC;`
        pool.query(queryText1, [req.user.company_fk])
            .then((result) => {
                res.send(result.rows);
            })
            .catch((error) => {
                console.log('Error completing the GET route for PORTFOLIO', error);
                res.sendStatus(500);
            });
    }
});

// ---- GET ARCHIVED route ----
router.get('/archive', rejectUnauthenticated, (req, res) => {  

    //This will grab everything for anyone checking as an administrator
    // and the else is for any other company other than critical coordination
    if( req.user.user_type === 'admin' ) {
        const queryTextAdmin = `SELECT project_name, project.id, due_date, "PO_Number", address, location_name, location_fk  FROM project
                                JOIN company_location ON company_location.id = project.location_fk
                                JOIN company ON company.id = project.company_fk
                                WHERE project.archived=true
                                ORDER BY project.due_date ASC;`;
        pool.query(queryTextAdmin)
            .then((result) => {
                res.send(result.rows);
            })
            .catch((error) => {
                console.log('Error completing the GET route for PORTFOLIO ADMIN', error);
                res.sendStatus(500);
            });
    } else if (req.user.user_type === 'client') {
        const queryText1 =` SELECT project_name, project.id, due_date, "PO_Number", address, location_name, location_fk  FROM project
                            JOIN company_location ON company_location.id = project.location_fk
                            JOIN company ON company.id = project.company_fk
                            WHERE project.company_fk = $1 and project.archived=true
                            ORDER BY project.due_date ASC;`;    
        pool.query(queryText1, [req.user.company_fk])
            .then((result) => {
                res.send(result.rows);
            })
            .catch((error) => {
                console.log('Error completing the GET route for PORTFOLIO', error);
                res.sendStatus(500);
            });
    } else if (req.user.user_type === 'contractor') {
        const queryText1 = `SELECT * FROM task
                            JOIN company on company.id = task.company_fk
                            JOIN project on project.id = task.project_fk
                            WHERE task.company_fk = $1 and task.archived=true
                            ORDER BY task.nlt_date ASC;`
        pool.query(queryText1, [req.user.company_fk])
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
    const queryText1 =  `UPDATE project SET project_name=$1, "PO_Number"=$2, due_date=$3 WHERE id = $4;`;
    const queryText2 = `UPDATE company_location SET location_name=$1 WHERE id=$2;`;
    pool.query(queryText1, [req.body.project_name, req.body.PO_Number, req.body.due_date, req.body.project_id])
        .then(() => {
            pool.query(queryText2, [req.body.location_name, req.body.location_fk])
            .then(() => {
                res.sendStatus(201);
            })            
        })
        .catch((error) => {
            console.log('Error completing the PUT route for PORTFOLIO', error);
            res.sendStatus(500);
        })
});

module.exports = router;