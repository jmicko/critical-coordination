const { default: Axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios')

/**
 * GET route template
 */
router.get('/:carrier/:tracking_number', (req, res) => {
   const token = process.env.SHIPPO_API_KEY;
   const carrier = req.params.carrier;
   const tracking_number = req.params.tracking_number;
   axios.get(`https://api.goshippo.com/tracks/${carrier}/${tracking_number}`, { 'headers': { 'Authorization': `ShippoToken ${token}`}})
   .then((response) => {
      res.send(response.data)
   }) .catch( (error) => {
      console.log('problem in get request to Shippo:', error);
   })
});


module.exports = router;
