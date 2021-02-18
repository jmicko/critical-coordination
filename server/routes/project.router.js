const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
   rejectUnauthenticated,
} = require('../modules/authentication-middleware');



router.get('/:id', rejectUnauthenticated, (req, res) => {
   console.log('GETTING PROJECT FROM DB');
   const sqlText = `SELECT * FROM "project" 
                     JOIN company ON company.id=project.company_fk
                     JOIN company_location ON company_location.id=project.location_fk
                     WHERE project.id=$1 and project.archived = false`
   pool.query(sqlText, [req.params.id])
      .then((result) => {
         res.send(result.rows)
      })
      .catch((error) => {
         console.log('error in TASK GET route, ', error);
      })
});


   
router.put('/:id', (req, res) => {
   console.log("============= project to archive is:", req.params.id);
   const sqlText = `UPDATE "public"."project" SET "archived"=NOT "archived" WHERE "id"=$1`
   pool.query(sqlText, [req.params.id])
      .then((result) => {
         res.send(result.rows)
      })
      .catch((error) => {
         console.log('error in TASK PUT route, ', error);
      })

});

module.exports = router;