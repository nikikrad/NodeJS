const { request } = require('express')
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
  
    const queryString = "SELECT * FROM Sponsor"//query - запрос
    connection.query(queryString, (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for Sponsor: " + error)
        res.sendStatus(500)//200 and 300 - norm
        res.end()
      }
      
      const sponsors = rows.map((row) => {//rows - ответ гет запроса
        return {
          id: row.idSponsor,
          name: row.name,
          number: row.number,
          mail: row.mail
        }
      })
  
      console.log("I think we fetched Sponsor successfully")
      res.json(sponsors)//res - ответ
    })
  })

  router.post("/create", (req, res) => {
    const connection = getConnection()
  
    const queryString = "INSERT INTO `sponsor` (name, number, mail) VALUES (?, ?, ?)"
    getConnection().query(queryString, [req.body.name, req.body.number, req.body.mail], (err, results, fields) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

  router.get("/:id", (req, res) =>{
    console.log("Fetching client with id:" + req.params.id)
    const connection = getConnection()

    const queryString = "Select * FROM `Sponsor` WHERE idSponsor = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for client: " + error)
        res.sendStatus(500)
        res.end()
      }
  
      console.log("I think we fetched clients successfully")
      res.json(rows)
    })
  })

  router.put("/update/:id", (req, res) => {
    const connection = getConnection()
  
    const queryString = "UPDATE `Sponsor` SET name = ?, number = ?, mail = ? WHERE idSponsor = ?"
    getConnection().query(queryString, [req.body.name, req.body.number, req.body.mail, req.params.id], (err, results, fields) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

  router.delete("/delete/:id", (req, res) =>{
    const connection = getConnection()

    const queryString = "DELETE FROM `Sponsor` WHERE idSponsor = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        res.sendStatus(500)
      }
      res.end()

    })
  })


  module.exports = router;