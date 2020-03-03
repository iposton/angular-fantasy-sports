const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');
const http = require('http');
const path = require('path');
const Heroku = require('heroku-client');
const CryptoJS = require("crypto-js");
let ciphertext = null;

const heroku = new Heroku({ token: process.env.API_TOKEN })

const app = express();

let TOKEN = '';
let consumerkey = process.env.TWITTER_KEY;
let consumersecret = process.env.TWITTER_SECRET;
let bearertoken = '';

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.post('/authorize', function(req, res) {
        var header = consumerkey+ ':' +consumersecret;
        var encheader = new Buffer(header).toString('base64');
        var finalheader = 'Basic ' + encheader;
        
        request.post('https://api.twitter.com/oauth2/token', {form: {'grant_type': 'client_credentials'}, 
        headers: {Authorization: finalheader}}, function(error, response, body) {
            if(error)
            console.log(error);
            else {
                bearertoken = JSON.parse(body).access_token;
                
                res.json({success: true, data:bearertoken});
            }   
        })
    });

app.post('/search', function(req, res) {
        let searchquery = req.body.query;
        let encsearchquery = encodeURIComponent(searchquery);
        let bearerheader = 'Bearer ' + bearertoken;
        request.get('https://api.twitter.com/1.1/search/tweets.json?q=' + encsearchquery +
         '&result_type=recent', {headers: {Authorization: bearerheader}}, function(error, body, response) {
             if(error)
             console.log(error);
             else {
                 res.json({success: true, data:JSON.parse(body.body)});
             }
         })
    });



app.use(express.static(path.join(__dirname, 'dist')));


// heroku.request({
//   method: 'GET',
//   path: 'https://api.heroku.com/apps/fantasy-sports-resource/config-vars',
//   headers: {
//     "Accept": "application/vnd.heroku+json; version=3",
//     "Authorization": "Bearer "+process.env.API_TOKEN
//   },
//   parseJSON: true
// }).then(response => {
//   ciphertext = CryptoJS.AES.encrypt(response.TOKEN, 'footballSack').toString();
//   TOKEN = ciphertext;
// })

app.get('/heroku-env', (req, res) => {
        ciphertext = CryptoJS.AES.encrypt(process.env.TOKEN, 'footballSack').toString();
        TOKEN = ciphertext;
        res.json(TOKEN);
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
});


const port = process.env.PORT || '3001';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));