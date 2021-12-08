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
    console.log("Fetching all KindOfSports")
    const connection = getConnection()
  
    const queryString = "SELECT * FROM KindOfSports"
    connection.query(queryString, (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for KindOfSports: " + error)
        res.sendStatus(500)//200 and 300 - norm
        res.end()
      }
      
      const kindofsport = rows.map((row) => {//rows - ответ гет запроса
        return {
          idKindOfSports: row.idKindOfSports,
          kindofsport: row.kindofsport,
        }
      })
  
      console.log("I think we fetched KindOfSports successfully")
      res.json(kindofsport)//res - ответ
    })
  })

  router.post("/create", (req, res) => {//is ready
    const connection = getConnection()
  
    const queryString = "INSERT INTO `KindOfSports` (kindofsport) VALUES (?)"
    getConnection().query(queryString, [req.body.kindofsport], (err, results, fields) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

  router.get("/:id", (req, res) =>{
    console.log("Fetching KindOfSports with id:" + req.params.id)
    const connection = getConnection()

    const queryString = "Select * FROM `KindOfSports` WHERE idKindOfSports = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for KindOfSports: " + error)
        res.sendStatus(500)
        res.end()
      }
  
      console.log("I think we fetched KindOfSports successfully")
      res.json(rows)
    })
  })

  router.put("/update/:id", (req, res) => {//is ready
    const connection = getConnection()
  
    const queryString = "UPDATE `KindOfSports` SET  kindofsport = ? WHERE idKindOfSports = ?"
    getConnection().query(queryString, [req.body.kindofsport, req.params.id], (err, results, fields) => {
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

    const queryString = "DELETE FROM `KindOfSports` WHERE idKindOfSports = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log(error)
        res.sendStatus(500)
      }
      res.end()

    })
  })


  module.exports = router;