const express = require('express')
const app = express()
var mysql      = require('mysql');






var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'nodegraph'
});
 
connection.connect();
 
connection.query('SELECT * FROM result', (err, rows) => {
    if (err) throw err
    console.log(rows)
})

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/sql', function (req, res) {
    connection.query('SELECT * FROM result', (err, rows) => {
        if (err) throw err
        console.log(rows)
    })
})

app.get('/insert', async (req, res) => {
    console.log('req.body', req.query )
    let requete1 = req.query.request
    let result1 = req.query.resultat

    let values = [requete1, result1]
    console.log("values", values)
    let sql = "INSERT INTO result (request, result) VALUES (?,?)"
    connection.query(sql, values, function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
    connection.end();

    res.send('finish')
   // 
})






app.listen(3030)