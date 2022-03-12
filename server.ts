import 'zone.js/node'
import {enableProdMode} from '@angular/core'
import { ngExpressEngine } from '@nguniversal/express-engine'
import * as express from 'express'
import { join } from 'path'

import { AppServerModule } from './src/main.server'
import { APP_BASE_HREF } from '@angular/common'
import { existsSync } from 'fs'

const bodyParser = require('body-parser')
const request = require('request')
const cors = require('cors')
const http = require('http')
const CryptoJS = require("crypto-js")
let ciphertext = null
import { api } from './api/api'

enableProdMode()

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  const domino = require('domino');
  const win = domino.createWindow(indexHtml);
  server.use(bodyParser.urlencoded({limit: "5mb", extended: true}))
  server.use(cors());
  global['window'] = win;
  global['document'] = win.document;
  global['navigator'] = win.navigator;

  let consumerkey = process.env.TWITTER_KEY
  let consumersecret = process.env.TWITTER_SECRET
  let bearertoken = ''
  let msfToken = process.env.TOKEN

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  server.post('/authorize', function(req, res) {
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

  server.post('/search', function(req, res) {
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

  // server.get('/heroku-env', (req, res) => {
  //   ciphertext = CryptoJS.AES.encrypt(msfToken, 'footballSack').toString();
  //   TOKEN = ciphertext;
  //   res.json(TOKEN);
  // });

  server.post('/info', async (req, res) => {
    //console.log(req.body, 'body')
    let sport = req.body.query
    let dailyDate = req.body.dailyDate
    let season = req.body.season
    let feedType = req.body.feedType
    let dateBegin = ''
    let dateEnd = ''
    let player = req.body.player
    let position = req.body.position
    let team = req.body.team
    let selectedDate = req.body.selectedDate
    let isToday = req.body.isToday
    let dataType = req.body.dataType
    let fromTo = req.body.fromTo
    let fromToWeek = req.body.fromToWeek
    let fromToNext = req.body.fromToNext
    let haveSchedules = req.body.haveSchedules
    let selectedWeek = req.body.selectedWeek
    const data =  await api.data.getInfo(msfToken, sport, dailyDate, season, feedType, dateBegin, dateEnd, player, position, team, selectedDate, isToday, dataType, fromTo, fromToWeek, fromToNext, haveSchedules, selectedWeek)
    res.status(200).json(data);
  })

  server.post('/stats', async (req, res) => {
    //console.log(req.body, 'body')
    let sport = req.body.query
    let dailyDate = req.body.dailyDate
    let season = req.body.season
    let feedType = req.body.feedType
    let feedType2 = req.body.feedType2
    let feedType3 = req.body.feedType3
    let player = req.body.player
    let position = req.body.position
    let team = req.body.team
    let selectedDate = req.body.selectedDate
    let isToday = req.body.isToday
    let dataType = req.body.dataType
    let playerType = req.body.playerType
    let fromTo = req.body.fromTo
    let nflWeek = req.body.nflWeek
    let liveUpdate = req.body.liveUpdate
    let spanDate = req.body.spanDate
    let haveSchedules = req.body.haveSchedules
    const data =  await api.data.getStats(msfToken, sport, dailyDate, season, feedType, feedType2, feedType3, player, position, team, selectedDate, isToday, dataType, fromTo, playerType, nflWeek, liveUpdate, spanDate, haveSchedules)
    res.status(200).json(data)
  })

  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
