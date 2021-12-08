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
    console.log("Fetching all Rolls")
    const connection = getConnection()
  
    const queryString = "SELECT * FROM Rolls"
    connection.query(queryString, (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for Rolls: " + error)
        res.sendStatus(500)//200 and 300 - norm
        res.end()
      }
      
      const rolls = rows.map((row) => {//rows - ответ гет запроса
        return {
          idRolls: row.idRolls,
          roll: row.roll,
        }
      })
  
      console.log("I think we fetched Rolls successfully")
      res.json(rolls)//res - ответ
    })
  })

  router.post("/create", (req, res) => {
    const connection = getConnection()
  
    const queryString = "INSERT INTO `Rolls` (roll) VALUES (?)"
    getConnection().query(queryString, [req.body.roll], (err, results, fields) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

  router.get("/:id", (req, res) =>{
    console.log("Fetching Rolls with id:" + req.params.id)
    const connection = getConnection()

    const queryString = "Select * FROM `Rolls` WHERE idRolls = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for Rolls: " + error)
        res.sendStatus(500)
        res.end()
      }
  
      console.log("I think we fetched Rolls successfully")
      res.json(rows)
    })
  })

  router.put("/update/:id", (req, res) => {
    const connection = getConnection()
  
    const queryString = "UPDATE `Rolls` SET  roll = ? WHERE idRolls = ?"
    getConnection().query(queryString, [req.body.roll, req.params.id], (err, results, fields) => {
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

    const queryString = "DELETE FROM `Rolls` WHERE idRolls = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log(error)
        res.sendStatus(500)
      }
      res.end()

    })
  })


  module.exports = router;