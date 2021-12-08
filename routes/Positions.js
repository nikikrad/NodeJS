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
    console.log("Fetching all Positions")
    const connection = getConnection()
  
    const queryString = "SELECT * FROM Positions"//ready
    connection.query(queryString, (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for Positions: " + error)
        res.sendStatus(500)//200 and 300 - norm
        res.end()
      }
      
      const positions = rows.map((row) => {//rows - ответ гет запроса
        return {
          idPositions: row.idPositions,
          positionName: row.positionName,
        }
      })
  
      console.log("I think we fetched Positions successfully")
      res.json(positions)//res - ответ
    })
  })

  router.post("/create", (req, res) => {//ready
    const connection = getConnection()
  
    const queryString = "INSERT INTO `Positions` (positionName) VALUES (?)"
    getConnection().query(queryString, [req.body.positionName], (err, results, fields) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

  router.get("/:id", (req, res) =>{//ready
    console.log("Fetching Positions with id:" + req.params.id)
    const connection = getConnection()

    const queryString = "Select * FROM `Positions` WHERE idPositions = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for Positions: " + error)
        res.sendStatus(500)
        res.end()
      }
  
      console.log("I think we fetched Positions successfully")
      res.json(rows)
    })
  })

  router.put("/update/:id", (req, res) => {//ready
    const connection = getConnection()
  
    const queryString = "UPDATE `Positions` SET  positionName = ? WHERE idPositions = ?"
    getConnection().query(queryString, [req.body.positionName, req.params.id], (err, results, fields) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

  router.delete("/delete/:id", (req, res) =>{//ready
    const connection = getConnection()

    const queryString = "DELETE FROM `Positions` WHERE idPositions = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log(error)
        res.sendStatus(500)
      }
      res.end()

    })
  })


  module.exports = router;