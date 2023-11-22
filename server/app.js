import express from 'express'
import cors from 'cors'
import mysql from 'mysql2'
import e from 'express'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'patjs',
})

app.get('/sonper', (req, res) => {
  connection.query(`SELECT * FROM sonper`, (error, rows) => {
    if (error) {
      console.error('Error executing query', error)
      res.status(500).send('An error occurred while executing the query')
    } else {
      res.send(rows)
    }
  })
})

app.get('/sonper/:id', (req, res) => {
  connection.query(
    `SELECT * FROM sonper WHERE id = ?`,
    [req.params.id],
    (error, rows) => {
      if (error) {
        console.error('Error executing query', error)
        res.status(500).send('An error occurred while executing the query')
      } else {
        res.send(rows)
      }
    },
  )
})

app.post('/sonper/add', (req, res) => {
  connection.query(
    `INSERT INTO sonper (name, age) VALUES (?, ?)`,
    [req.body.name, req.body.age],
    (error, _) => {
      if (error) {
        console.error('Error executing query', error)
        res.status(500).send('An error occurred while executing the query')
      } else {
        res.send({ message: `Successfully insert ${req.body.name}` })
      }
    },
  )
})

app.patch('/sonper/edit/:id', (req, res) => {
  connection.query(
    `UPDATE sonper SET name = ?, age = ? WHERE id = ?`,
    [req.body.name, req.body.age, req.params.id],
    (error, _) => {
      if (error) {
        console.error('Error executing query', error)
        res.status(500).send('An error occurred while executing the query')
      } else {
        res.send({ message: `Successfully edited ${req.params.id}` })
      }
    },
  )
})

app.delete('/sonper/delete/:id', (req, res) => {
  connection.query(
    `DELETE FROM sonper WHERE id = ?`,
    [req.params.id],
    (error, _) => {
      if (error) {
        console.error('Error executing query', error)
        res.status(500).send('An error occurred while executing the query')
      } else {
        res.send({ message: `Sucessfully deleted ${req.params.id}` })
      }
    },
  )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
