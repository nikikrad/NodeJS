// const { request } = require('express')
const express = require('express')
const mysql = require('mysql')
const router = express.Router()

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'denis',
    database: 'mydb'
})

function getConnection() {
    return pool
}

router.get("/", (req,res) => {
    console.log("Fetching all sponsors")
    const connection = getConnection()
  
    const queryString = "SELECT * FROM Sponsors"//query - запрос
    connection.query(queryString, (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for Sponsors: " + error)
        res.sendStatus(500)//200 and 300 - norm
        res.end()
      }
      
      const sponsors = rows.map((row) => {//rows - ответ гет запроса
        return {
          id: row.idSponsors,
          name: row.name,
          number: row.number,
          mail: row.mail
        }
      })
  
      console.log("I think we fetched Sponsor successfully")
      res.json(sponsors)//res - ответ
    })
  })

  router.post("/create", (req, res) => {//is ready
    const connection = getConnection()
  
    const queryString = "INSERT INTO `Sponsors` (name, number, mail, idSportClubs) VALUES (?, ?, ?, ?)"
    getConnection().query(queryString, [req.body.name, req.body.number, req.body.mail, req.body.idSportClubs], (err, results, fields) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

  router.get("/:id", (req, res) =>{
    console.log("Fetching sponsor with id:" + req.params.id)
    const connection = getConnection()

    const queryString = "Select * FROM `Sponsors` WHERE idSponsors = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for sponsor: " + error)
        res.sendStatus(500)
        res.end()
      }
  
      console.log("I think we fetched sponsors successfully")
      res.json(rows)
    })
  })

  router.put("/update/:id", (req, res) => {//is ready
    const connection = getConnection()
  
    const queryString = "UPDATE `Sponsors` SET name = ?, number = ?, mail = ?, idSportClubs = ? WHERE idSponsors = ?"
    getConnection().query(queryString, [req.body.name, req.body.number, req.body.mail, req.body.idSportClubs, req.params.id], (err, results, fields) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

  router.delete("/delete/:id", (req, res) =>{//is ready
    const connection = getConnection()

    const queryString = "DELETE FROM `Sponsors` WHERE idSponsors = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log(error)
        res.sendStatus(500)
      }
      res.end()

    })
  })


  module.exports = router;