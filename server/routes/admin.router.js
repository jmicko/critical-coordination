const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const encryptLib = require('../modules/encryption');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const key = process.env.RESET_PASSWORD_KEY;
const mailAcct = process.env.REACT_APP_EMAIL_USER;
const mailPw = process.env.REACT_APP_EMAIL_PASSWORD
const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: mailAcct, //value from .env file
      pass: mailPw // value from .env file
   }
});

// GET company table
router.get('/company', rejectUnauthenticated, (req, res) => {
   if(req.user.user_type === 'admin'){
      console.log('user type is: ', req.user.user_type);
      const queryText = `SELECT * FROM company 
                  WHERE archived = false
                  ORDER BY company_name ASC;`;
      console.log ('in company get')
      pool.query(queryText)
        .then((result) => { res.send(result.rows); })
        .catch((err) => {
          console.log('Error completing company query', err);
          res.sendStatus(500);
        });
   } else {
      res.sendStatus(403)
   }
 });

// GET location table w/ company join
router.get('/location', rejectUnauthenticated, (req, res) => {
   if (req.user.user_type === 'admin'){
      const queryText = `SELECT company_location.id AS location_id, address, location_name, company_name, company_fk  
      FROM company_location
      JOIN company ON company.id = company_location.company_fk
      WHERE company_location.archived = false
      ORDER BY company_location.id ASC;`
      console.log ('in location get')
      pool.query(queryText)
        .then((result) => { res.send(result.rows); })
        .catch((err) => {
          console.log('Error location company query', err);
          res.sendStatus(500);
        });
   } else {
      res.sendStatus(403)
   }
    });

 // GET location table w/ company join
router.get('/users', rejectUnauthenticated, (req, res) => {
   if (req.user.user_type === 'admin'){
      const queryText = `SELECT "user".id, email, first_name, last_name, company_fk, user_type, company.company_name FROM "user" 
            JOIN company ON company.id = "user".company_fk
            WHERE "user".archived = false
            ORDER BY company.id, "user".id  ASC;`
      console.log ('in all users GET')
      pool.query(queryText)
        .then((result) => { res.send(result.rows); })
        .catch((err) => {
          console.log('Error GET all users query', err);
          res.sendStatus(500);
        });
   } else {
      res.sendStatus(403)
   }
   });


// GET status table 
router.get('/taskstatus', rejectUnauthenticated, (req, res) => {
   const queryText = `SELECT * FROM task_status 
         WHERE archived = false;`
   console.log ('in task status GET')
   pool.query(queryText)
     .then((result) => { res.send(result.rows); })
     .catch((err) => {
       console.log('Error GET task status query', err);
       res.sendStatus(500);
     });
 });

//PUT (update) status table, to include delete (archive)
router.put('/taskstatus', rejectUnauthenticated, (req, res) => {
   console.log (`taskstatus put payload: `, req.body );
   const id = req.body.id;
   const status = req.body.status_type;
   const archived = req.body.archived;
   const sqlText = `UPDATE task_status SET status_type = $2, archived = $3 WHERE id=$1;`;
   pool.query(sqlText, [id, status, archived])
   .then( () => {
      res.sendStatus(201)
   }) .catch( (error) => {
      console.log('Error with taskstatus admin post', error);
   })
});


//PUT (update) USER table, to include delete of user (archive)
router.put('/usermodify', rejectUnauthenticated, (req, res) => {
   console.log (`usermodify put payload: `, req.body );
   const id = req.body.id;
   const email = req.body.email;
   const first_name = req.body.first_name;
   const last_name = req.body.last_name;
   const company_fk = req.body.company_fk;
   const user_type = req.body.user_type;
   const archived = req.body.archived;
   const sqlText = `UPDATE "user" SET 
                     email = $2, 
                     first_name = $3,
                     last_name = $4,
                     company_fk= $5,
                     user_type = $6,
                     archived = $7
                    WHERE id=$1;`;
   pool.query(sqlText, [id, email, first_name, last_name, company_fk, user_type, archived])
   .then( () => {
      res.sendStatus(201)
   }) .catch( (error) => {
      console.log('Error with usermodify admin post', error);
   })
});

//PUT (update) company table, to include delete of user (archive)
router.put('/companymodify', rejectUnauthenticated, (req, res) => {
   console.log (`companymodify put payload: `, req.body );
   const id = req.body.id;
   const company_name = req.body.company_name;
   const archived = req.body.archived;
   const sqlText = `UPDATE company SET 
                     company_name = $2, 
                     archived = $3
                    WHERE id=$1;`;
   pool.query(sqlText, [id, company_name, archived])
   .then( () => {
      res.sendStatus(201)
   }) .catch( (error) => {
      console.log('Error with companymodify admin post', error);
   })
});

//PUT (update) company_location table, to include delete of user (archive)
router.put('/locationmodify', rejectUnauthenticated, (req, res) => {
   console.log (`locationmodify put payload: `, req.body );
   const id = req.body.id;
   const address = req.body.address;
   const location_name = req.body.location_name;
   const company_fk = req.body.company_fk;
   const archived = req.body.archived;
   const sqlText = `UPDATE company_location 
      SET address = $2, location_name = $3, company_fk = $4, archived = $5
      WHERE id=$1;`;
   pool.query(sqlText, [id, address, location_name, company_fk, archived])
   .then( () => {
      res.sendStatus(201)
   }) .catch( (error) => {
      console.log('Error with locationmodify admin post', error);
   })
});


//add new user route for admin page
router.post('/adduser', rejectUnauthenticated, (req, res) => {
   if (req.user.user_type === 'admin'){
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
   } else {
      res.sendStatus(403)
   }
});

//add new company route for admin page
router.post('/addcompany', rejectUnauthenticated, (req, res) => {
   if (req.user.user_type === 'admin'){
      const company = req.body.company;
      const sqlText = `INSERT INTO company ("company_name") VALUES($1);`;
      pool.query(sqlText, [company])
         .then(() => {
            res.sendStatus(201)
         }).catch((error) => {
            console.log('Error with ADD COMPANY admin post', error);
         })
   } else {
      res.sendStatus(403)
   }
});

//add new location route for admin page
router.post('/addlocation', rejectUnauthenticated, (req, res) => {
   if (req.user.user_type === 'admin'){
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
   } else {
      res.sendStatus(403)
   }
});

router.post('/addstatus', rejectUnauthenticated, (req, res) => {
   if (req.user.user_type === 'admin'){
      const status = req.body.status_type
      const sqlText = `INSERT INTO task_status ("status_type") VALUES($1);`;
      pool.query(sqlText, [status])
         .then(() => {
            res.sendStatus(201)
         }).catch((error) => {
            console.log('Error with ADD LOCATION admin post', error);
         })
   } else {
      res.sendStatus(403)
   }
});

router.post('/addproject', rejectUnauthenticated, (req, res) => {
   if (req.user.user_type === 'admin') {
      const project_name = req.body.project_name;
      const company = req.body.company;
      const location = req.body.location;
      const PO = req.body.PO;
      const due_date = req.body.due_date;
      const expedited = req.body.expedited;
      const ordered_by = req.body.ordered_by;
      const notes = req.body.notes;
      const sqlText = `INSERT INTO project ("project_name", "PO_Number", "due_date", "company_fk", "location_fk", "expedited", "ordered_by", "notes") 
                        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
                        RETURNING "id";`;
      pool.query(sqlText, [project_name, PO, due_date, company, location, expedited, ordered_by, notes])
      .then((result) => {
         const [projectId] = result.rows
         console.log(projectId);
         res.send(projectId)
      }).catch((error) => {
            console.log('Error with ADD PROJECT admin post', error);
         })
   } else {
      res.sendStatus(403)
   }
});

router.post('/addtask', rejectUnauthenticated, (req, res) => {

   console.log(req.body.status);

   // if (req.user.user_type === 'admin') {
   //    console.log(req.body);
   //    const company = req.body.company;
   //    const task_name = req.body.type;
   //    const nlt_date = req.body.due_date;
   //    const task_status = req.body.status;
   //    const updated_by = req.body.updated_by;
   //    const project = req.body.project;
   //    const notes = req.body.notes;
   //    const sqlText = `INSERT INTO task ("task_name_fk", "nlt_date", "task_status_fk", "updated_by", "project_fk", "notes", "company_fk")
   //    VALUES($1, $2, $3, $4, $5, $6, $7)`;
   //    pool.query(sqlText, [task_name, nlt_date, task_status, updated_by, project, notes, company])
   //       .then( () => {
   //          res.sendStatus(201)
   //       }).catch((error) => {
   //          console.log('Error with ADD Task admin post', error);
   //       })
   // } else {
   //    res.sendStatus(403)
   // }
});

router.post('/emailtask', rejectUnauthenticated, (req, res) => {
   if (req.user.user_type === 'admin') {
      const id = req.body.id;
      const sqlText = `SELECT * FROM task
         JOIN company on company.id = task.company_fk
         JOIN "user" on "user".company_fk = company.id
         JOIN project on project.id = task.project_fk
         JOIN company_location on company_location.id = project.location_fk
         WHERE task.id=$1;`
      pool.query(sqlText, [id])
      .then ( (result) => {
         console.log(result.rows[0]);
         const id = result.rows[0].id;
         for(let i=0; i<result.rows.length; i++){
            const task = result.rows[i];
            const email = task.email;
            const link = `${process.env.CLIENT_URL}`
            const mailOptions = {
               from: '',
               to: email,
               subject: 'Critical Coordination - Task Notification',
               text: `<p>${task.first_name}, Critical Coordination has issued a job request related to ${task.project_name}.</p>
                     <p>PO Number: ${task.PO_Number}</p>
                     <p>Location: ${task.location_name}</p>
                     <p>Address: ${task.address}</p>
                     <p>Notes: ${task.notes}</p>
                     <p>Please log in to the <a href="${link}">Critical Coordination Dashboard</a> to accept this job and change job status to "Receipt Acknowledged".<br/><br/>
                     For Shipping tasks please update with the tracking number and set status to "Shipped" when they are sent - for Install jobs please select an installation
                     date upon accepting the job </p>`,
               html: `<p>${task.first_name}, Critical Coordindation has issued a job request related to ${task.project_name}.</p>
                     <p>PO Number: ${task.PO_Number}</p>
                     <p>Location: ${task.location_name}</p>
                     <p>Address: ${task.address}</p>
                     <p>Notes: ${task.notes}</p>
                     <p>Please log in to the <a href="${link}">Critical Coordination Dashboard</a> to accept this job and change job status to "Receipt Acknowledged".<br/><br/>
                     For Shipping tasks please update with the tracking number and set status to "Shipped" when they are sent - for Install jobs please select an installation
                     date upon accepting the job </p>`};
            transporter.sendMail(mailOptions, function (error, info) {
               if (error) {
                  console.log(error);
                  res.sendStatus(500)
               } else {
                  console.log('Email sent: ' + info.response);
                  return res.json({ message: 'Email has been sent' })
               }
            });
         }
         res.sendStatus(200)
      }) .catch ( (error) => {
         console.log('error in sending task email, ', error);
         res.sendStatus(500)
      })
      const date = (new Date()).toLocaleString("en-US");
      const queryText = `UPDATE task 
            SET notified_date = $1 
            WHERE id=$2;`;
      pool.query(queryText, [date, id])
         .then(() => {
         }).catch((error) => {
            console.log('something broke in updating notified date', error);
      })
   }
})


module.exports = router;