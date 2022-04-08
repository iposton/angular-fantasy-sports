let request = require('request')
let methods: any = {}
let apiRoot: string = `https://api.mysportsfeeds.com/v2.1/pull`
import { forkJoin } from 'rxjs'

let info = [
    {
      games: [],
      dailyLineup: [],
      fullSchedule: []
    }
  ]

  let stats = [
    {
      dailyStats: [],
      teamStats: [],
      playerStats: [],
      playerInfo: [],
      team: [],
      updatedSchedule: [],
      boxscores: [],
      spanSchedule: [],
      scheduleGames: []
    }
  ]

  let games = [
    {
      nba: [],
      nhl: [],
      nfl: [],
      mlb: []
    }
  ]

  let schedules = [
    {
      weeklySchedule: [],
      nextSchedule: []
    }
  ]

const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    
    fg: {
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        white: "\x1b[37m"
    }
}

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
    haveSchedules: string,
    selectedWeek: string) => {
      const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
      let headers = {"Authorization": "Basic " + Buffer.from(apiKey + ":" + "MYSPORTSFEEDS").toString('base64')}
      let jsonTeam = null
      await sleep(10)
      if (haveSchedules === 'false')
        jsonTeam = await JSON.parse(team)

  if (dataType === 'dailySchedule') {
    console.log(colors.fg.yellow+`Fetch data for ${sport}`, colors.reset)
    let firstPromise = new Promise(async(resolve, reject) => {

      let dailyLineup = []
      let gamesUrl = sport != 'nfl' ? `${apiRoot}/${sport}/${season}/date/${dailyDate}/${feedType}.json` : `${apiRoot}/${sport}/${season}/week/${selectedWeek}/${feedType}.json`
      let fromToUrl = `${apiRoot}/${sport}/${season}/${feedType}.json?date=${fromTo}`
      
      
      //console.log(jsonTeam, 'json') 
      console.log(gamesUrl, 'games url')
      console.log(fromToUrl, 'from to url')

      if(sport === 'nhl') {
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
      }

      const options = {
          method: 'GET',
          url: gamesUrl,
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
            console.log('got todays games')
            body.games = games
            info[0].games = body
          } else {
            console.log(`No Games for ${sport}`)
            info[0].games = body
          } 
          
        } catch(e) {
          console.log(colors.fg.red+`${sport} Games error:`, e, colors.reset)
        }
        
        // console.log(body.games, 'dailyshced after filter')
        //info[0].games = body

        if (body.games != null) {
          console.log(`Sort daily lineups for ${sport}`)
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
                  console.log(colors.fg.red+`Daily Lineup for ${sport} error:`, e, colors.reset)
                }  
              })
            )
          )
        }

      await sleep(1000)
      resolve('done')
      })  //end of daily games req
    })
    
    let result = await firstPromise
    //console.log(info[0], 'info resolved')
    return info[0]
  }  

  if (dataType === 'games') {
    console.log(colors.fg.yellow+`Fetch Games for All Sports: Home Page`, colors.reset)
    //console.log(player, 'players')
    let gamePromise = new Promise(async(resolve, reject) => {
      let nbaUrl = `${apiRoot}/nba/${season}/date/${dailyDate}/${feedType}.json`
      let nflUrl = `${apiRoot}/nfl/${season}/week/${selectedWeek}/${feedType}.json`
      let nhlUrl = `${apiRoot}/nhl/${season}/date/${dailyDate}/${feedType}.json`
      let mlbUrl = `${apiRoot}/mlb/2022-regular/date/${dailyDate}/${feedType}.json`

      const nbaOptions = {
        method: 'GET',
        url: nbaUrl ,
        headers: headers,
        json: true
      }
          
      request(nbaOptions, async (error, response, body) => {
        games[0].nba = body
      })

      const nhlOptions = {
        method: 'GET',
        url: nhlUrl ,
        headers: headers,
        json: true
      }
          
      request(nhlOptions, async (error, response, body) => {
        games[0].nhl = body
      })

      const mlbOptions = {
        method: 'GET',
        url: mlbUrl ,
        headers: headers,
        json: true
      }
          
      request(mlbOptions, async (error, response, body) => {
        games[0].mlb = body
      })

      const nflOptions = {
        method: 'GET',
        url: nflUrl ,
        headers: headers,
        json: true
      }
          
      request(nflOptions, async (error, response, body) => {
        games[0].nfl = body
        await sleep(1000)
        console.log(colors.fg.green+'Waited 1 Second to Finish Getting Games, Got NFL, NHL, MLB, and NBA Games, Resolve', colors.reset)
        resolve('done')
      })

    })
    let result = await gamePromise
    //console.log(info[0], 'info resolved')
    return games[0]
  }

  if (dataType === 'schedules') {
    let schedPromise = new Promise(async(resolve, reject) => {
    if (sport != 'nfl' && haveSchedules === 'false') {
      
      console.log(`Fetching ${sport} schedules, all teams, this week, next week`)
      let teamsSched = []
      let teamSchedule
      let nextWeekSched = []
      let nextWeekSchedule
      let items = []
      let items2 = []
      const teamsArray = Object.values(jsonTeam)
      //console.log(teamsArray, 'teams')
      console.log(`${apiRoot}/${sport}/${season}/${feedType}.json?team=123&date=${fromToWeek}`, 'fromtoweek')
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
                console.log(colors.fg.red+'Fromto Week error', e, colors.reset)
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
                console.log(colors.fg.red+'FromtoNext Week error', e, colors.reset)
              }
            })
        )
      )

      await sleep(5000)
      console.log(`Waited 5 seconds for ${sport} schedules`)
      
      if (items.length > 0) {
        for (let item of items) {
          for (let team of teamsArray) {
            if(item.gamesBelongTo === team['abbreviation']) {
              teamSchedule = {
                team: team['abbreviation'],
                schedule: item['games'],
                teamInfo: team,
                begin:'3/28',
                end: '4/3'
              }
              teamsSched.push(teamSchedule)
              schedules[0]['weeklySchedule'] = teamsSched
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
                begin:'4/4',
                end: '4/10'
              }
              nextWeekSched.push(nextWeekSchedule)
              schedules[0]['nextSchedule'] = nextWeekSched    
            }
          }
        }
        await sleep(1200)
        console.log(colors.fg.green+`Waited 1.2 second, Resolve ${sport} Info`, colors.reset)
        resolve('done')
      } else if (items2.length === 0) {
        console.log(`Could not Get ${sport} Schedules, try again`)
        await sleep(1200)
        resolve('done')
      } 

  
    } else {
      console.log(colors.fg.green+`Dont Need To Fetch ${sport} Schedules, Resolve`, colors.reset)
      await sleep(1200)
      resolve('done')
    }
  })
  let result = await schedPromise
  //console.log(info[0], 'info resolved')
  return schedules[0]
  }
}

methods.getStats = async (
  apiKey: string, 
  sport: string, 
  dailyDate: any, 
  season: string, 
  feedType: string, 
  feedType2: string, 
  feedType3: string, 
  player: string, 
  position: string, 
  team: any, 
  selectedDate: any, 
  isToday: boolean,
  dataType: string,
  fromTo: string,
  playerType: string,
  nflWeek: string,
  liveUpdate: string,
  spanDate: string,
  haveSchedules: string) => {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    let headers = {"Authorization": "Basic " + Buffer.from(apiKey + ":" + "MYSPORTSFEEDS").toString('base64')}

    if (dataType === 'stats') {
      console.log(colors.fg.yellow+`Fetch Stats for ${sport}`, colors.reset)
      //console.log(playerType, 'playerType')
      let firstPromise = new Promise(async(resolve, reject) => {

        let dailyLineup = []
        let dailyUrl = null
        let teamStatsUrl = null
        let playerStatsUrl = null
        let playerInfoUrl = null
        let dailyTeamUrl = null
        let jsonTeam = null
        await sleep(10)
        if (sport === 'nfl' && haveSchedules === 'false') {
          console.log('have schedules?', haveSchedules)
          jsonTeam = await JSON.parse(team)
        }
          
        dailyUrl = playerType === 'nhlGoalies' ? `${apiRoot}/${sport}/${season}/date/${dailyDate}/${feedType}.json?position=${position}` : playerType === 'nflOffense' || playerType === 'nflDefense' ? `${apiRoot}/${sport}/${season}/week/${nflWeek}/${feedType}.json?position=${position}` : playerType === 'nflPlayers' ? `${apiRoot}/${sport}/${season}/week/${nflWeek}/${feedType}.json?player=${player}` : sport === 'mlb' ? `${apiRoot}/${sport}/2022-regular/date/${dailyDate}/${feedType}.json?player=${player}` : `${apiRoot}/${sport}/${season}/date/${dailyDate}/${feedType}.json?player=${player}`
        teamStatsUrl = `${apiRoot}/${sport}/${season}/${feedType2}.json`
        playerStatsUrl = playerType === 'statLeaders' || playerType === 'nhlGoalies' || playerType === 'nflOffense' || playerType === 'nflDefense' ? `${apiRoot}/${sport}/${season}/${feedType3}.json?position=${position}` : `${apiRoot}/${sport}/${season}/${feedType3}.json?player=${player}` 
        playerInfoUrl = `${apiRoot}/${sport}/players.json?position=${position}`
        dailyTeamUrl = `${apiRoot}/${sport}/${season}/week/${nflWeek}/team_gamelogs.json`
        
        console.log(playerStatsUrl, 'player stats totals url for', sport)
        console.log(dailyUrl, 'dailyurl url for', sport)
        //console.log(nflWeek , 'nflWeek')
        stats[0].dailyStats = []

        if (nflWeek != 'all') {
          const dailyOptions = {
            method: 'GET',
            url: dailyUrl ,
            headers: headers,
            json: true
          }
  
          request(dailyOptions, async (error, response, body) => {
              
              try {
                await sleep(10)
                if (body.gamelogs != null) {
                  console.log(`Got daily stats for ${sport}!`)
                  stats[0].dailyStats = await body
                } else {
                  console.log(colors.fg.red+'Daily Games Not Responding Properly', body, colors.reset)
                  stats[0].dailyStats = []
                }
              } catch(e) {
                console.log(colors.fg.red+'Daily stats error:', e, colors.reset)
              } 
              
          })
        }

        if (playerType != 'nhlSkaters' && liveUpdate === 'noUpdate') {
          const teamOptions = {
            method: 'GET',
            url: teamStatsUrl ,
            headers: headers,
            json: true
          }

          request(teamOptions, async (error, response, body) => {
              console.log('Got Season Total Team Stats.')
              stats[0].teamStats = await body
          })
        } else {
          console.log('Not getting team stats again, already have them.')
        }

        if (sport === 'nfl' && nflWeek != 'all') {
          const dtOptions = {
           method: 'GET',
           url: dailyTeamUrl ,
           headers: headers,
           json: true
          }
 
          request(dtOptions, async (error, response, body) => {
             //only use at the start of season to fetch all players
             console.log('Got Daily Team Stats.')
             stats[0].team = await body
          })
        } 
        
        if (sport === 'nfl' && nflWeek === 'all' && haveSchedules === 'false' || playerType === 'nflPlayers' && haveSchedules === 'false') {
          console.log(`Get ${sport} schedule games for sort ranks.`)
          forkJoin(
            jsonTeam.map(
              g => request(`${apiRoot}/${sport}/${season}/games.json?team=${g.abbreviation}`, {headers},
                async function(err, res, body) {
                  try {
                    //getting nfl schedules
                    let data = await JSON.parse(body)
                    stats[0].scheduleGames.push(data)
                    data.gamesBelongTo = g['abbreviation']
                  } catch(e) {
                    console.log(colors.fg.red+'Schedule games error:', e, colors.reset)
                  }
                })
            )
          )
        }

      if (liveUpdate === 'noUpdate') {
        const psOptions = {
          method: 'GET',
          url: playerStatsUrl ,
          headers: headers,
          json: true
        }
  
        request(psOptions, async (error, response, body) => {
            let sleepTime = (playerType === 'nflDefense' ? 3500 : playerType === 'mlbPlayers' ? 4500 : 3000)
            let values = null
            let rookieVal
            await sleep(30)
            try {        
              if (body['playerStatsTotals'] != null) {
                console.log('got player season total stats')
                values = body['playerStatsTotals'].filter(x => x.player.currentTeam != null && x.team != null && x.player.currentTeam.id === x.team.id)
                rookieVal = body['playerStatsTotals'].filter(player => player.player.rookie === true)
                body['playerStatsTotals'] = values
                body.rookies = rookieVal
                stats[0].playerStats = await body
                await sleep(sleepTime)
                console.log(colors.fg.green+`Waited ${sleepTime} milliseconds for other stats, Resolve`, colors.reset)
                resolve('done')
              } else {
                stats[0].playerStats = await body
                await sleep(sleepTime)
                console.log(colors.fg.red+`Waited ${sleepTime} milliseconds. Something went wrong: player season total stats, resolve`, colors.reset)
                resolve('done')
              }  
            } catch(e) {
              console.log(colors.fg.red+'Error: Player season total stats', e, colors.reset)
            }
            
        })
      } else if (liveUpdate === 'nhlUpdate' || liveUpdate === 'nbaUpdate') {
        let gamesUrl = `${apiRoot}/${sport}/${season}/date/${dailyDate}/games.json`

        const options = {
          method: 'GET',
          url: gamesUrl,
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
            tomorrow.setHours(tomorrow.getHours() - 8)
            //console.log(new Date(tomorrow), 'after')
            await sleep(50)
            return new Date(tomorrow)
          }

          await sleep(50)
          let playedStatuses = {'COMPLETED': 'COMPLETED', 'COMPLETED_PENDING_REVIEW': 'COMPLETED_PENDING_REVIEW', 'LIVE' : 'LIVE'}
          games = body.games ? body.games.filter(async item => new Date(item['schedule'].startTime) < await tomorrow(selectedDate, isToday) || playedStatuses[item['schedule'].playedStatus] != null) : []

          try {
            if (body.games != null) {
              console.log(`Got Todays Games for ${sport} update.`)
              body.games = games
              stats[0].updatedSchedule = body
              await sleep(2000)
              console.log(colors.fg.green+'Waited 2 seconds for other stats, Resolve', colors.reset)
              resolve('done')
            } else {
              await sleep(2000)
              console.log(`Something went wrong updating ${sport} Games.`)
              resolve('done')
              stats[0].updatedSchedule = body
            } 
            
          } catch(e) {
            console.log(colors.fg.red+`Error: ${sport} Games Update`, e, colors.reset)
          }
        })
      }

      if (sport === 'mlb') {
        const piOptions = {
          method: 'GET',
          url: playerInfoUrl ,
          headers: headers,
          json: true
        }

        request(piOptions, async (error, response, body) => {
            //only use at the start of season to fetch all players
            console.log(`got player info for ${sport}`)
            stats[0].playerInfo = await body
        })
      }
      
      })
      let result = await firstPromise
      //console.log(stats[0], 'info resolved')
      return stats[0]
    } else if (dataType === 'spanStats') {
      
        console.log(colors.fg.yellow+`Fetch time span stats for ${sport}`, colors.reset)
        //console.log(playerType, 'playerType')
        let secondPromise = new Promise(async(resolve, reject) => {
        
        let gamesUrl = `${apiRoot}/${sport}/${season}/games.json?date=${spanDate}`
        console.log('timeSpan', gamesUrl)
        const options = {
          method: 'GET',
          url: gamesUrl,
          headers: headers,
          json: true
        }
        //empty timeSpan arrays
        stats[0].spanSchedule = []
        stats[0].boxscores = []
        request(options, async (error, response, body) => {
          try {
              stats[0].spanSchedule = body
              console.log(`Got Time Span Games for ${spanDate}`)
          } catch(e) {
            console.log(colors.fg.red+`Error: ${sport} Span Games ${spanDate}`, e, colors.reset)
          }
          if (body.games != null) {
            forkJoin(
              body.games.map(
                g => request(`${apiRoot}/${sport}/${season}/games/${g.schedule.id}/boxscore.json`, {headers},
                  async function(err, res, body) {
                    //console.log(body, 'lineup')
                    //await sleep(10)
                    try {
                      let data = await JSON.parse(body)
                      stats[0].boxscores.push(data)
                    } catch(e) {
                      console.log(colors.fg.red+'Error: getting Boxscore : Span Games', e, body, colors.reset)
                    }
                  })
              )
            )
          } else {
            console.log('Something went wrong getting Boxscores')
          }
          await sleep(2000)
          console.log(colors.fg.green+'Waited 2 seconds for boxscores, Resolve', colors.reset)
          resolve('done')
        })
       }) 
       let result = await secondPromise
       //console.log(stats[0], 'info resolved')
       return stats[0]
    }  
  }

export const api = {data: methods}