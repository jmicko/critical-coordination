const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const key = process.env.RESET_PASSWORD_KEY;
const mailAcct = process.env.REACT_APP_EMAIL_USER;
const mailPw = process.env.REACT_APP_EMAIL_PASSWORD
const encryptLib = require('../modules/encryption');
const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: mailAcct, //value from .env file
      pass: mailPw // value from .env file
   }
});

router.put('/forgot', (req, res) => {
   console.log(req.body);
   const password = encryptLib.encryptPassword(req.body.password);
   let sqlText = `UPDATE "user" SET password=$1, token=null WHERE $2=token;`;
   pool.query(sqlText, [password, req.body.token])
   .then({

   }) .catch( (error) => {
      console.log('something went wrong,', error);
   })
})


forgotPassword = (req, res) => {
   const email = req.body.email;
   console.log('in forgotPassword');
   let sqlText = 'SELECT * FROM "user" WHERE email=$1;'
   pool.query(sqlText, [email])
      .then( (result) => {
         console.log(result.rows[0].email);
         if (result.rows[0].email) {
            const token = jwt.sign({email: email}, key, {expiresIn: '20m'})
            sqlText = 'UPDATE "user" SET token=$1 WHERE email=$2;'
            pool.query(sqlText, [token, email])
            const mailOptions = {
               from: 'noreply@auth-shelf.com',
               to: email,
               subject: 'password reset',
               text: `Please click on the link to reset your password ${process.env.CLIENT_URL}/#/resetpassword?token=${token}`
            };
            transporter.sendMail(mailOptions, function (error, info) {
               if (error) {
                  console.log(error);
                  res.sendStatus(500)
               } else {
                  console.log('Email sent: ' + info.response);
                  return res.json({message: 'Email has been sent, please reset your account'})
               }
            });
         }
      })
      .catch((error)=> {
         console.log('problem with GET to match lost password with registered user', error);
         res.sendStatus(500)
      })
}

// handles password reset request
router.put('/', forgotPassword)



module.exports = router;
