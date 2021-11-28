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
    console.log("Fetching all SportClubs")
    const connection = getConnection()
  
    const queryString = "SELECT * FROM SportClubs"//query - запрос
    connection.query(queryString, (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for SportClubs: " + error)
        res.sendStatus(500)//200 and 300 - norm
        res.end()
      }
      
      const sportclubs = rows.map((row) => {//rows - ответ гет запроса
        return {
          id: row.idSportClubs,
          addres: row.addres,
          number: row.number,
          mail: row.mail
        }
      })
  
      console.log("I think we fetched SportClubs successfully")
      res.json(sportclubs)//res - ответ
    })
  })

  router.post("/create", (req, res) => {//is ready
    const connection = getConnection()
  
    const queryString = "INSERT INTO `SportClubs` (addres, number, mail) VALUES (?, ?, ?)"
    getConnection().query(queryString, [req.body.addres, req.body.number, req.body.mail], (err, results, fields) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

  router.get("/:id", (req, res) =>{
    console.log("Fetching SportClubs with id:" + req.params.id)
    const connection = getConnection()

    const queryString = "Select * FROM `SportClubs` WHERE idSportClubs = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for SportClub: " + error)
        res.sendStatus(500)
        res.end()
      }
  
      console.log("I think we fetched SportClubs successfully")
      res.json(rows)
    })
  })

  router.put("/update/:id", (req, res) => {//is ready
    const connection = getConnection()
  
    const queryString = "UPDATE `SportClubs` SET addres = ?, number = ?, mail = ? WHERE idSportClubs = ?"
    getConnection().query(queryString, [req.body.addres, req.body.number, req.body.mail, req.params.id], (err, results, fields) => {
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

    const queryString = "DELETE FROM `SportClubs` WHERE idSportClubs = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log(error)
        res.sendStatus(500)
      }
      res.end()

    })
  })


  module.exports = router;