const express = require('express');
const path = require('path');
const cors = require('cors')

const app = express();
const databaseOptions = require('./config/config');

const mysql = require('mysql');

var mc = mysql.createConnection(databaseOptions);

/*
var mc = mysql.createConnection({
    host     : databaseOptions.host,
    database : databaseOptions.database,
    user     : databaseOptions.user,
    password : databaseOptions.password,
    insecureAuth : true
});
*/

app.use(cors())

app.get('/ingredients/:id', function (req, res, next) {

    var ingquery = "SELECT i.ingredient_name FROM ingredients AS i JOIN recipe AS r ON r.recipe_id = i.recipe_id WHERE r.recipe_id = '"+req.params.id+"' ORDER BY i.ingredient_name ASC";

    mc.query(ingquery, function (error, results, fields) {
        if (error) throw error;
        else res.send(results);
        return;
    });
});

app.get('/recipe/:id', function (req, res, next) {    
    var query = "SELECT * FROM recipe WHERE recipe_id= '"+req.params.id+"'";
    mc.query(query, function (error, results, fields) {
        if (error) throw error;
        else res.send(results);
        return;
    });
});

app.get('/method/:id', function (req, res, next) {
    var query = "SELECT s.step AS stepDescription FROM method AS s JOIN recipe AS r ON r.recipe_id = s.recipe_id WHERE r.recipe_id = '"+req.params.id+"'";
    mc.query(query, function (error, results, fields) {
        if (error) throw error;
        else res.send(results);
        return;
    });
});

app.get('/recipes', function (req, res) {
    var query = "SELECT recipe_id, name, image, author, difficulty, tag FROM recipe";
    mc.query(query, function (error, results) {
        if (error) throw error;
        else res.send (results);
        console.log(results)
        return;
    });
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);