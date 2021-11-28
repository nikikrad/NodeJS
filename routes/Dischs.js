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

router.get("/", (req,res) => {//is ready
    console.log("Fetching all Dischs")
    const connection = getConnection()
  
    const queryString = "SELECT * FROM Dischs"
    connection.query(queryString, (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for Dischs: " + error)
        res.sendStatus(500)//200 and 300 - norm
        res.end()
      }
      
      const dischs = rows.map((row) => {//rows - ответ гет запроса
        return {
          id: row.idDischs,
          disch: row.disch,
        }
      })
  
      console.log("I think we fetched Dischs successfully")
      res.json(dischs)//res - ответ
    })
  })

  router.post("/create", (req, res) => {//is ready
    const connection = getConnection()
  
    const queryString = "INSERT INTO `Dischs` (disch) VALUES (?)"
    getConnection().query(queryString, [req.body.disch], (err, results, fields) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

  router.get("/:id", (req, res) =>{
    console.log("Fetching Dischs with id:" + req.params.id)
    const connection = getConnection()

    const queryString = "Select * FROM `Dischs` WHERE idDischs = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for Dischs: " + error)
        res.sendStatus(500)
        res.end()
      }
  
      console.log("I think we fetched Dischs successfully")
      res.json(rows)
    })
  })

  router.put("/update/:id", (req, res) => {//is ready
    const connection = getConnection()
  
    const queryString = "UPDATE `Dischs` SET  disch = ? WHERE idDischs = ?"
    getConnection().query(queryString, [req.body.disch, req.params.id], (err, results, fields) => {
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

    const queryString = "DELETE FROM `Dischs` WHERE idDischs = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log(error)
        res.sendStatus(500)
      }
      res.end()

    })
  })


  module.exports = router;