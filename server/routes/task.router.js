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

router.get('/project/:id', rejectUnauthenticated, (req, res) => {
  const task = req.params.id;
  const sqlText = `SELECT task.id AS id, company_name, nlt_date, poc_fk, project_fk, scheduled_date, status_type, task_name, task_name_fk, task_status_fk, technician_info, token, tracking_id, updated_by, notes, company_fk  
                  FROM task 
                  JOIN task_name ON task_name.id = task.task_name_fk
                  JOIN task_status ON task_status.id = task.task_status_fk
                  JOIN company on company.id = task.company_fk
                  where project_fk = $1 
                  ORDER BY nlt_date ASC;`;
  pool.query(sqlText, [task])
  .then( (result) => {
    res.send(result.rows)
  })
  .catch ( (error) => {
    console.log('error in getting tasks for Project', error);
  })
})

router.put('/update', rejectUnauthenticated, (req, res) => {
  const queryText1 = `UPDATE task SET task_status_fk=$1, task_name_fk=$2, nlt_date=$3, scheduled_date=$4 WHERE id=$5;`;
  pool.query(queryText1, [req.body.task_status, req.body.task_type, req.body.nlt_date, req.body.date_scheduled, req.body.task_id])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
    console.log('Error completeing the TASK UPDATE in task.router.js', error);
    res.sendStatus(500);  
  });
});

router.put('/contractor', rejectUnauthenticated, (req, res) => {
  const queryText1 = `UPDATE task SET task_status_fk=$1, scheduled_date=$2 WHERE id=$3;`;
  pool.query(queryText1, [req.body.status, req.body.date_scheduled, req.body.task_id])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
    console.log('Error completeing the CONTRACTOR TASK UPDATE in task.router.js', error);
    res.sendStatus(500);  
  });
});

router.put('/delete', rejectUnauthenticated, (req, res) => {
  const queryText1 = `DELETE FROM task WHERE id=$1`
  pool.query(queryText1, [req.body.task_id])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
    console.log('Error completeing the DELETE in task.router.js', error);
    res.sendStatus(500);  
  });
});

module.exports = router;