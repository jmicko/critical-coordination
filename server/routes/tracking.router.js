const { default: Axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios')

/**
 * GET route template
 */
router.get('/:carrier/:tracking_number', (req, res) => {
   const carrier = req.params.carrier;
   const tracking_number = req.params.tracking_number;
   axios.get(`https://api.goshippo.com/tracks/fedex/783275757626`, { 'headers': { 'Authorization': 'ShippoToken shippo_live_fdafef3163b3e143001cbaf1ffe000b8d7b82c1e'}})
   .then((response) => {
      console.log(response.data);
      res.send(response.data)
   }) .catch( (error) => {
      console.log('problem in get request to Shippo:', error);
   })
});


module.exports = router;
