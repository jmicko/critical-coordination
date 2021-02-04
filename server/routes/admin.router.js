const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

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



/**
 * POST route template
 */
router.post('/', (req, res) => {
   // POST route code here
});

module.exports = router;