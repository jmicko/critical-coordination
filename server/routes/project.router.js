const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
   rejectUnauthenticated,
} = require('../modules/authentication-middleware');


//will need rejectunauthenticated text here 
router.get('/:id', rejectUnauthenticated, (req, res) => {
   console.log('GETTING PROJECT FROM DB');
   const sqlText = `SELECT * FROM "project" 
                     JOIN company ON company.id=project.company_fk
                     JOIN company_location ON company_location.id=project.location_fk
                     JOIN task ON task.project_fk = project.id
                     JOIN task_name ON task_name.id = task.task_name_fk
                     JOIN task_status ON task_status.id = task.task_status_fk
                     WHERE project.id=$1;`
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