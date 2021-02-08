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
  const sqlText = `SELECT * FROM task 
                  JOIN task_name ON task_name.id = task.task_name_fk
                  JOIN task_status ON task_status.id = task.task_status_fk
                  where project_fk = $1;`;
  pool.query(sqlText, [task])
  .then( (result) => {
    res.send(result.rows)
  })
  .catch ( (error) => {
    console.log('error in getting tasks for Project', error);
  })
})

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;