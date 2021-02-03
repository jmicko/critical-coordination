const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/company', (req, res) => {
   const sqlText = `SELECT * FROM "company"`
   pool.query(sqlText, [])
   .then( (result) => {
      res.send(result.rows)
   })
   .catch( (error) => {
      console.log('error in COMPANY GET route, ', error);
      res.sendStatus(500)
   })
});

router.get('/user', (req, res) => {
   // GET route code here
});

router.get('/location', (req, res) => {
   // GET route code here
});

router.get('/project', (req, res) => {
   // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
   // POST route code here
});

module.exports = router;