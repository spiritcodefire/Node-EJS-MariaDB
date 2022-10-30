const express = require('express')
const app = express()
var mysql = require('mysql');
const axios = require("axios");





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
    //console.log('req.body', req.query )
    // http://localhost:3030/insert?request=test&resultat=essai

    let array = ['create'];

    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        console.log('element', element)
        let postAxios =  await axios.post(`https://lionfish-app-xheyf.ondigitalocean.app/${element}`)
        console.log('postAxios',postAxios.data)
        if (postAxios.data !== { api: 'GRAPHQL', version: '1.0' }) {
            console.log('hacking possible')
        }
    }

    // console.log('alphabet', alphabet);
        
    // let postAxios =  await axios.get(`https://lionfish-app-xheyf.ondigitalocean.app`)

    // console.log('postAxios',postAxios.data)


    // let values = ["test4", "test4"]
    // let sql = "INSERT INTO result (request, result) VALUES (?,?)"
    // connection.query(sql, values, function (err, result) {
    //     if (err) throw err;
    //     console.log("Number of records inserted: " + result.affectedRows);
    // });
    // connection.end();

    res.send('finish')
})






app.listen(3030)