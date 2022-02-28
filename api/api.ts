let request = require('request');
let methods: any = {}
let apiRoot: string = `https://api.mysportsfeeds.com/v2.1/pull`
import { forkJoin } from 'rxjs'

let info = [
    {
      games: [],
      dailyLineup: [],
      weeklySchedule: [],
      nextSchedule: [],
      fullSchedule: []
    }
  ]

methods.getInfo = async (
    apiKey: string, 
    sport: string, 
    dailyDate: any, 
    season: string, 
    feedType: any, 
    dateBegin: any, 
    dateEnd: any, 
    player: string, 
    position: string, 
    team: any, 
    selectedDate: any, 
    isToday: boolean,
    dataType: string,
    fromTo: string,
    fromToWeek: string,
    fromToNext: string,
    haveSchedules: string) => {
  if (dataType === 'dailySchedule') {
    console.log(`fetch data for ${sport}`)
    let firstPromise = new Promise(async(resolve, reject) => {
      const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
      let headers = {"Authorization": "Basic " + Buffer.from(apiKey + ":" + "MYSPORTSFEEDS").toString('base64')}
      let dailyLineup = []
      let apiUrl = `${apiRoot}/${sport}/${season}/date/${dailyDate}/${feedType}.json`
      let fromToUrl = `${apiRoot}/${sport}/${season}/${feedType}.json?date=${fromTo}`
      let jsonTeam = null
      await sleep(10)
      jsonTeam = await JSON.parse(team)
      //console.log(jsonTeam, 'json') 

      const optionsFromTo = {
          method: 'GET',
          url: fromToUrl ,
          headers: headers,
          json: true
      }

      request(optionsFromTo, async (error, response, body) => {
          //NHL schedules for yesterday, today and tomorrow
          info[0].fullSchedule = await body
      })

      const options = {
          method: 'GET',
          url: apiUrl ,
          headers: headers,
          json: true
      }
            
      request(options, async (error, response, body) => {
        let games: any  

        //Helper fn to compare game times to the next day
        async function tomorrow(date, day) {
          date = day === 'true' ? new Date() : date
          let tomorrow = new Date(date)
          //console.log(new Date(tomorrow), 'before')
          tomorrow.setDate(tomorrow.getDate() + (day === 'true' ? 1 : 2));
          tomorrow.setHours(tomorrow.getHours() - 8);
          //console.log(new Date(tomorrow), 'after')
          await sleep(50)
          return new Date(tomorrow)
        }

        await sleep(50)
        let playedStatuses = {'COMPLETED': 'COMPLETED', 'COMPLETED_PENDING_REVIEW': 'COMPLETED_PENDING_REVIEW', 'LIVE' : 'LIVE'}
        games = body.games ? body.games.filter(async item => new Date(item['schedule'].startTime) < await tomorrow(selectedDate, isToday) || playedStatuses[item['schedule'].playedStatus] != null) : []

        try {
          if (body.games != null) {
            body.games = games
            info[0].games = body
          } else {
            info[0].games = body
          } 
          console.log('got todays games')
        } catch(e) {
          console.log(e, 'error')
        }
        
        // console.log(body.games, 'dailyshced after filter')
        //info[0].games = body

        if (body.games != null) {
          console.log('sort lineups')
          forkJoin(
              body.games.map(
              g =>  request(`${apiRoot}/${sport}/${season}/${feedType}/${g['schedule'].id}/lineup.json?position=${position}`, {headers},
                async function(err, res, body) {
                //console.log(body, 'lineup')
                await sleep(10)
                try {
                  let data = await JSON.parse(body)
                  dailyLineup.push(data)
                  info[0]['dailyLineup'] = dailyLineup
                } catch(e) {
                  console.log(e, 'error')
                }  
              })
            )
          )
        }

        if (haveSchedules === 'false') {
          console.log('fetching schedules, all teams, this week, next week')
          let teamsSched = []
          let teamSchedule
          let nextWeekSched = []
          let nextWeekSchedule
          let items = []
          let items2 = []
          const teamsArray = Object.values(jsonTeam)
          //console.log(teamsArray, 'teams')

          forkJoin(
            teamsArray.map(
              g => request(`${apiRoot}/${sport}/${season}/${feedType}.json?team=${g['abbreviation']}&date=${fromToWeek}`, {headers},
                async function(err, res, body) {
                  //console.log(body, 'lineup')
                  //await sleep(10)
                  try {
                    let data = await JSON.parse(body)
                    data.gamesBelongTo = g['abbreviation']
                    items.push(data)
                  } catch(e) {
                    console.log(e, 'error')
                  }
                })
            )
          )

          forkJoin(
            teamsArray.map(
              g => request(`${apiRoot}/${sport}/${season}/${feedType}.json?team=${g['abbreviation']}&date=${fromToNext}`, {headers},
                async function(err, res, body) {
                  //await sleep(10)
                  try {
                    let data = await JSON.parse(body)
                    data.gamesBelongTo = g['abbreviation']
                    items2.push(data)
                  } catch(e) {
                    console.log(e, 'error')
                  }
                })
            )
          )

          await sleep(3000)
          console.log('waited 3 seconds for schedules')
          
          if (items.length > 0) {
            for (let item of items) {
              for (let team of teamsArray) {
                if(item.gamesBelongTo === team['abbreviation']) {
                  teamSchedule = {
                    team: team['abbreviation'],
                    schedule: item['games'],
                    teamInfo: team,
                    begin:'2/21',
                    end: '2/27'
                  }
                  teamsSched.push(teamSchedule)
                  info[0]['weeklySchedule'] = teamsSched
                }
              }
            }
          }

          if (items2.length > 0) {
            console.log('sort next week and resolve')
            for (let item of items2) {
              for (let team of teamsArray) {
                if(item.gamesBelongTo === team['abbreviation']) {
                  nextWeekSchedule = {
                    team: team['abbreviation'],
                    schedule: item['games'],
                    teamInfo: team,
                    begin:'2/28',
                    end: '3/6'
                  }
                  nextWeekSched.push(nextWeekSchedule)
                  info[0]['nextSchedule'] = nextWeekSched    
                }
              }
            }
            await sleep(1200)
            resolve('done')
          } else if (items2.length === 0) {
            console.log('could not get schedules, try again')
            await sleep(1200)
            resolve('done')
          } 
        } else {
          console.log('already have schedules, resolve')
          await sleep(1200)
          resolve('done')
        }
      })  //end of daily games req
    })
    let result = await firstPromise
    //console.log(info[0], 'info resolved')
    return info[0]
  }  
}

export const api = {data: methods}