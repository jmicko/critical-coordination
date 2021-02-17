const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/:id', rejectUnauthenticated, (req, res) => {
  console.log(`SHOULD BE task id from task router line 7`, req.params);
  const sqlText = `SELECT * FROM "task" WHERE "id"=$1`
  pool.query(sqlText, [req.params.id])
    .then((result) => {
      console.log(`hey look at these RESULTS`, result.rows);
      res.send(...result.rows)
    })
    .catch((error) => {
      console.log('error in TASK GET route, ', error);
    })
});


// This seems to get all the tasks for a single project
// TODO - THIS SHOULD GO IN PROJECT ROUTER
// or wait, it's right? Wow wish I had notes
router.get('/for_project/:id', rejectUnauthenticated, (req, res) => {
  const project = req.params.id;
  const company = req.user.company_fk;
  // Not sure if we want to protect this route from clients or not, but here's the code if we do
  // just drop the closing bracket down over the function
  let inputs = [project];
  if (req.user.user_type !== "client") {
    console.log(req.user.user_type);
  }
  if (req.user.user_type === "contractor" || req.user.user_type === "contractor") {
    console.log(req.user.user_type);
    // for contractors, we need to limit them tasks they can see 
    // to only those they are assigned, so add company
    inputs = [project, company];
  } 
  // else {
  //   inputs = [project];
  // }
  const sqlText = `SELECT task.id AS id,
                          company_name,
                          nlt_date,
                          poc_fk,
                          project_fk,
                          scheduled_date,
                          status_type, task_name,
                          task_name_fk,
                          task_status_fk,
                          technician_info,
                          token,
                          tracking_id,
                          updated_by,
                          notes,
                          company_fk,
                          notified_date  
    FROM task 
    JOIN task_name ON task_name.id = task.task_name_fk
    JOIN task_status ON task_status.id = task.task_status_fk
    JOIN company on company.id = task.company_fk
    where project_fk = $1 
    ${
      // this will limit contractors from seeing tasks not assigned to them
      req.user.user_type === "contractor"
      ? "AND company_fk = $2"
      : ""
    }
    ORDER BY nlt_date ASC;`;
  pool.query(sqlText, inputs)
    .then((result) => {
      res.send(result.rows)
    })
    .catch((error) => {
      console.log('error in getting tasks for Project', error);
    })
})

// TODO - THIS SHOULD GO INTO IT'S OWN MODULE
dateConversion = fieldValue => {
  if (fieldValue != null) {
    let year = fieldValue.slice(0, 4);
    let month = fieldValue.slice(5, 7);
    let day = fieldValue.slice(8, 10);
    return `${year}-${month}-${day}`
  }
}

// Update a single task
router.put('/update', rejectUnauthenticated, (req, res) => {
  const updatedBy = `${req.user.first_name} ${req.user.last_name}`
  const due_date = dateConversion(req.body.nlt_date);
  const scheduled_date = dateConversion(req.body.scheduled_date);
  const status = req.body.task_status;
  const taskName = req.body.task_name_fk;
  const trackingId = req.body.tracking_id;
  const notes = req.body.notes;
  const techInfo = req.body.technician_info;
  const id = req.body.id;
  const queryText1 = `UPDATE task SET task_status_fk=$1, task_name_fk=$2, nlt_date=$3, scheduled_date=$4, updated_by=$5, tracking_id=$6, notes=$7, technician_info=$8 WHERE id=$9;`;
  pool.query(queryText1, [status, taskName, due_date, scheduled_date, updatedBy, trackingId, notes, techInfo, id])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error completing the TASK UPDATE in task.router.js', error);
      res.sendStatus(500);
    });
});

// this does not protect the contractor route because it does not check the user type
// it only checks if they are logged in. A client could hit this route and "complete" a task
router.put('/contractor', rejectUnauthenticated, (req, res) => {
  const queryText1 = `UPDATE task SET task_status_fk=$1, scheduled_date=$2 WHERE id=$3;`;
  pool.query(queryText1, [req.body.status, req.body.date_scheduled, req.body.task_id])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error completing the CONTRACTOR TASK UPDATE in task.router.js', error);
      res.sendStatus(500);
    });
});


// this does not protect the route because it does not check the user type
// any logged in user can delete a task
router.put('/delete', rejectUnauthenticated, (req, res) => {
  const queryText1 = `DELETE FROM task WHERE id=$1`
  pool.query(queryText1, [req.body.id])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error completing the DELETE in task.router.js', error);
      res.sendStatus(500);
    });
});

module.exports = router;