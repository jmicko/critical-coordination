const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const encryptLib = require('../modules/encryption');

// GET company table
router.get('/company', (req, res) => {
   const queryText = 'SELECT * FROM company ORDER BY id ASC';
   console.log ('in company get')
   pool.query(queryText)
     .then((result) => { res.send(result.rows); })
     .catch((err) => {
       console.log('Error completing company query', err);
       res.sendStatus(500);
     });
 });

// GET location table w/ company join
router.get('/location', (req, res) => {
   const queryText = `SELECT * FROM company_location 
      JOIN company ON company.id = company_location.company_fk
      ORDER BY company.id, company_location.id ASC;`
   console.log ('in location get')
   pool.query(queryText)
     .then((result) => { res.send(result.rows); })
     .catch((err) => {
       console.log('Error location company query', err);
       res.sendStatus(500);
     });
 });

 // GET location table w/ company join
router.get('/users', (req, res) => {
   const queryText = `SELECT email, first_name, last_name, company_fk, user_type, company.company_name FROM "user" 
         JOIN company ON company.id = "user".company_fk
         ORDER BY company.id, "user".id  ASC;`
   console.log ('in all users GET')
   pool.query(queryText)
     .then((result) => { res.send(result.rows); })
     .catch((err) => {
       console.log('Error GET all users query', err);
       res.sendStatus(500);
     });
 });

// GET status table 
router.get('/taskstatus', (req, res) => {
   const queryText = `SELECT * FROM task_status
         ORDER BY id  ASC;`
   console.log ('in task status GET')
   pool.query(queryText)
     .then((result) => { res.send(result.rows); })
     .catch((err) => {
       console.log('Error GET task status query', err);
       res.sendStatus(500);
     });
 });

//PUT status table
router.put('/taskstatus', (req, res) => {
   const id = req.body.editRecord.id;
   const status = req.body.editRecord.status_type;
   const archived = req.body.editRecord.archived;
   const sqlText = `UPDATE task_status SET status_type = $2, archived = $3 WHERE id=$1;`;
   pool.query(sqlText, [id, status, archived])
   .then( () => {
      res.sendStatus(201)
   }) .catch( (error) => {
      console.log('Error with ADD USER admin post', error);
   })
});



//add new user route for admin page
router.post('/adduser', (req, res) => {
   const email = req.body.email;
   const first_name = req.body.first_name;
   const last_name = req.body.last_name;
   const company = req.body.company;
   const password = encryptLib.encryptPassword(req.body.password);
   const user_type = req.body.user_type;
   const sqlText = `INSERT INTO "user"("email", "first_name", "last_name", "company_fk", "password", "user_type") 
      VALUES($1, $2, $3, $4, $5, $6);`;
   pool.query(sqlText, [email, first_name, last_name, company, password, user_type])
   .then( () => {
      res.sendStatus(201)
   }) .catch( (error) => {
      console.log('Error with ADD USER admin post', error);
   })
});

//add new company route for admin page
router.post('/addcompany', (req, res) => {
   const company = req.body.company;
   const sqlText = `INSERT INTO company ("company_name") VALUES($1);`;
   pool.query(sqlText, [company])
      .then(() => {
         res.sendStatus(201)
      }).catch((error) => {
         console.log('Error with ADD COMPANY admin post', error);
      })
});

//add new location route for admin page
router.post('/addlocation', (req, res) => {
   const location = req.body.location_name;
   const address = req.body.address;
   const company = req.body.company;
   const sqlText = `INSERT INTO company_location ("address", "location_name", "company_fk") VALUES($1, $2, $3);`;
   pool.query(sqlText, [address, location, company])
      .then(() => {
         res.sendStatus(201)
      }).catch((error) => {
         console.log('Error with ADD LOCATION admin post', error);
      })
});

router.post('/addstatus', (req, res) => {
   const status = req.body.status_type
   const sqlText = `INSERT INTO task_status ("status_type") VALUES($1);`;
   pool.query(sqlText, [status])
      .then(() => {
         res.sendStatus(201)
      }).catch((error) => {
         console.log('Error with ADD LOCATION admin post', error);
      })
});


module.exports = router;