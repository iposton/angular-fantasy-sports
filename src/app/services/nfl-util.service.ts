import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BEFORE_APP_SERIALIZED } from '@angular/platform-server'
let nflImageRoot = 'https://static.www.nfl.com/image/private/t_player_profile_landscape_2x/f_auto/league/'
let newNflImageRoot = `https://static.www.nfl.com/image/upload/t_headshot_desktop_2x/f_auto/league/`;
let nextYear = `2025 00:00:00 GMT-0700 (Pacific Daylight Time)`
let nflYear = `2024 00:00:00 GMT-0700 (Pacific Daylight Time)`

@Injectable({
  providedIn: 'root'
})
export class NflUtilService {
  public nflTeams: any
  public weekTimes: Array<any> = []
  public gamesByID: Array<any> = []
  public NFLImages: any
  public notRookies: any
  public standin: number

  constructor(private http: HttpClient) {
    this.weekTimes = [
      {
        dateBeg: `Thu Sep 05 ${nflYear}`,
        dateEnd: `Thu Sep 12 ${nflYear}`,
        week: '1'
      },
      {
        dateBeg: `Thu Sep 12 ${nflYear}`,
        dateEnd: `Thu Sep 19 ${nflYear}`,
        week: '2'
      },
      {
        dateBeg: `Thu Sep 19 ${nflYear}`,
        dateEnd: `Thu Sep 26 ${nflYear}`,
        week: '3'
      },
      {
        dateBeg: `Thu Sep 26 ${nflYear}`,
        dateEnd: `Thu Oct 03 ${nflYear}`,
        week: '4'
      },
      {
        dateBeg: `Thu Oct 03 ${nflYear}`,
        dateEnd: `Thu Oct 10 ${nflYear}`,
        week: '5'
      },
      {
        dateBeg: `Thu Oct 10 ${nflYear}`,
        dateEnd: `Thu Oct 17 ${nflYear}`,
        week: '6'
      },
      {
        dateBeg: `Thu Oct 17 ${nflYear}`,
        dateEnd: `Thu Oct 24 ${nflYear}`,
        week: '7'
      },
      {
        dateBeg: `Thu Oct 24 ${nflYear}`,
        dateEnd: `Thu Oct 31 ${nflYear}`,
        week: '8'
      },
      {
        dateBeg: `Thu Oct 31 ${nflYear}`,
        dateEnd: `Thu Nov 07 ${nflYear}`,
        week: '9'
      },
      {
        dateBeg: `Thu Nov 07 ${nflYear}`,
        dateEnd: `Thu Nov 14 ${nflYear}`,
        week: '10'
      },
      {
        dateBeg: `Thu Nov 14 ${nflYear}`,
        dateEnd: `Thu Nov 21 ${nflYear}`,
        week: '11'
      },
      {
        dateBeg: `Thu Nov 21 ${nflYear}`,
        dateEnd: `Thu Nov 28 ${nflYear}`,
        week: '12'
      },
      {
        dateBeg: `Thu Nov 28 ${nflYear}`,
        dateEnd: `Thu Dec 05 ${nflYear}`,
        week: '13'
      },
      {
        dateBeg: `Thu Dec 05 ${nflYear}`,
        dateEnd: `Thu Dec 12 ${nflYear}`,
        week: '14'
      },
      {
        dateBeg: `Thu Dec 12 ${nflYear}`,
        dateEnd: `Thu Dec 19 ${nflYear}`,
        week: '15'
      },
      {
        dateBeg: `Thu Dec 19 ${nflYear}`,
        dateEnd: `Thu Dec 26 ${nflYear}`,
        week: '16'
      },
      {
        dateBeg: `Thu Dec 26 ${nflYear}`,
        dateEnd: `Thu Jan 02 ${nextYear}`,
        week: '17'
      },
      {
        dateBeg: `Thu Jan 02 ${nextYear}`,
        dateEnd: `Thu Jan 09 ${nextYear}`,
        week: '18'
      },
      {
        dateBeg: `Thu Jan 09 ${nextYear}`,
        dateEnd: `Thu Jan 16 ${nextYear}`,
        week: '19' //playoff
      },
      {
        dateBeg: `Thu Jan 16 ${nextYear}`,
        dateEnd: `Thu Jan 23 ${nextYear}`,
        week: '20' //wild card
      },
      {
        dateBeg: `Thu Jan 23 ${nextYear}`,
        dateEnd: `Thu Feb 06 ${nextYear}`,
        week: '21' //afc nfc final 4
      },
      {
        dateBeg: `Thu Feb 06 ${nextYear}`,
        dateEnd: `Thu Feb 13 ${nextYear}`,
        week: '23' //super bowl
      }
    ]

    this.nflTeams = [
      {
        id: 48,
        bye: 7,
        defenseRankLs: 11,
        offenseRankLs: 3,
        city: "Buffalo",
        name: "Bills",
        twitter: "#BillsMafia",
        abbreviation: "BUF",
        conference: "AFC East",
        teamColoursHex: [
          "#00338d",
          "#c60c30"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/giphcy6ie9mxbnldntsf"
      },
      {
        id: 49,
        bye: 11,
        defenseRankLs: 7,
        offenseRankLs: 22,
        city: "Miami",
        name: "Dolphins",
        twitter: "#FinsUp",
        abbreviation: "MIA",
        conference: "AFC East",
        teamColoursHex: [
        "#008e97",
        "#fc4c02",
        "#005778"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/lits6p8ycthy9to70bnt"
      },
      {
        id: 50,
        bye: 10,
        defenseRankLs: 17,
        offenseRankLs: 29,
        city: "New England",
        name: "Patriots",
        abbreviation: "NE",
        twitter: "#ForeverNE",
        conference: "AFC East",
        teamColoursHex: [
        "#002244",
        "#c60c30",
        "#b0b7bc"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/moyfxx3dq5pio4aiftnc"
      },
      {
        id: 51,
        bye: 10,
        defenseRankLs: 24,
        offenseRankLs: 32,
        city: "New York",
        name: "Jets",
        twitter: "#TakeFlight",
        abbreviation: "NYJ",
        conference: "AFC East",
        teamColoursHex: [
        "#125740",
        "#000000",
        "#ffffff"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ekijosiae96gektbo4iw"
      },
      {
        id: 52,
        bye: 9,
        defenseRankLs: 31,
        offenseRankLs: 19,
        city: "Dallas",
        name: "Cowboys",
        twitter: "#DallasCowboys",
        abbreviation: "DAL",
        conference: "NFC East",
        teamColoursHex: [
        "#003594",
        "#041e42",
        "#869397",
        "#7f9695",
        "#ffffff"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ieid8hoygzdlmzo0tnf6"
      },
      {
        id: 53,
        bye: 9,
        defenseRankLs: 9,
        offenseRankLs: 31,
        city: "New York",
        name: "Giants",
        twitter: "#TogetherBlue",
        abbreviation: "NYG",
        conference: "NFC East",
        teamColoursHex: [
        "#0b2265",
        "#a71930",
        "#a5acaf"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/t6mhdmgizi6qhndh8b9p"
      },
      {
        id: 54,
        bye: 7,
        defenseRankLs: 21,
        offenseRankLs: 24,
        city: "Philadelphia",
        name: "Eagles",
        twitter: "#FlyEaglesFly",
        abbreviation: "PHI",
        conference: "NFC East",
        teamColoursHex: [
        "#004c54",
        "#a5acaf",
        "#acc0c6",
        "#000000",
        "#565a5c"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/puhrqgj71gobgdkdo6uq"
      },
      {
        id: 55,
        bye: 14,
        defenseRankLs: 4,
        offenseRankLs: 28,
        city: "Washington",
        name: "Commanders",
        twitter: "#WashingtonFootball",
        abbreviation: "WAS",
        conference: "NFC East",
        teamColoursHex: [
        "#773141",
        "#ffb612"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/f_auto/league/ywoi3t4jja8fokqpyegk"
      },
      {
        id: 56,
        bye: 10,
        defenseRankLs: 6,
        offenseRankLs: 14,
        city: "Baltimore",
        name: "Ravens",
        twitter: "#RavensFlock",
        abbreviation: "BAL",
        conference: "AFC North",
        teamColoursHex: [
        "#241773",
        "#000000",
        "#9e7c0c",
        "#c60c30"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ucsdijmddsqcj1i9tddd"
      },
      {
        id: 57,
        bye: 10,
        defenseRankLs: 20,
        offenseRankLs: 30,
        city: "Cincinnati",
        name: "Bengals",
        twitter: "#RuleTheJungle",
        abbreviation: "CIN",
        conference: "AFC North",
        teamColoursHex: [
        "#fb4f14",
        "#000000"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/okxpteoliyayufypqalq"
      },
      {
        id: 58,
        bye: 9,
        defenseRankLs: 17,
        offenseRankLs: 13,
        city: "Cleveland",
        name: "Browns",
        twitter: "#DawgPound",
        abbreviation: "CLE",
        conference: "AFC North",
        teamColoursHex: [
        "#311d00",
        "#ff3c00",
        "#ffffff"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/grxy59mqoflnksp2kocc"
      },
      {
        id: 59,
        bye: 9,
        defenseRankLs: 1,
        offenseRankLs: 21,
        city: "Pittsburgh",
        name: "Steelers",
        twitter: "#HereWeGo",
        abbreviation: "PIT",
        conference: "AFC North",
        teamColoursHex: [
        "#ffb612",
        "#101820",
        "#003087",
        "#c60c30",
        "#a5acaf"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/xujg9t3t4u5nmjgr54wx"
      },
      {
        id: 60,
        bye: 14,
        defenseRankLs: 16,
        offenseRankLs: 25,
        city: "Chicago",
        name: "Bears",
        twitter: "#DaBears",
        abbreviation: "CHI",
        conference: "NFC North",
        teamColoursHex: [
        "#0b162a",
        "#c83803"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ra0poq2ivwyahbaq86d2"
      },
      {
        id: 61,
        bye: 6,
        defenseRankLs: 32,
        offenseRankLs: 18,
        city: "Detroit",
        name: "Lions",
        twitter: "#OnePride",
        abbreviation: "DET",
        conference: "NFC North",
        teamColoursHex: [
        "#0076b6",
        "#b0b7bc",
        "#000000",
        "#ffffff"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ocvxwnapdvwevupe4tpr"
      },
      {
        id: 62,
        bye: 14,
        defenseRankLs: 15,
        offenseRankLs: 2,
        city: "Green Bay",
        name: "Packers",
        abbreviation: "GB",
        twitter: "#GoPackGo",
        conference: "NFC North",
        teamColoursHex: [
        "#203731",
        "#ffb612"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/gppfvr7n8gljgjaqux2x"
      },
      {
        id: 63,
        bye: 7,
        defenseRankLs: 30,
        offenseRankLs: 6,
        city: "Minnesota",
        name: "Vikings",
        twitter: "#Skol",
        abbreviation: "MIN",
        conference: "NFC North",
        teamColoursHex: [
        "#4f2683",
        "#ffc62f"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/teguylrnqqmfcwxvcmmz"
      },
      {
        id: 64,
        bye: 6,
        defenseRankLs: 28,
        offenseRankLs: 16,
        city: "Houston",
        name: "Texans",
        twitter: "#WeAreTexans",
        abbreviation: "HOU",
        conference: "AFC South",
        teamColoursHex: [
        "#03202f",
        "#a71930"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/bpx88i8nw4nnabuq0oob"
      },
      {
        id: 65,
        bye: 14,
        defenseRankLs: 10,
        offenseRankLs: 11,
        city: "Indianapolis",
        name: "Colts",
        twitter: "#ForTheShoe",
        abbreviation: "IND",
        conference: "AFC South",
        teamColoursHex: [
        "#002c5f",
        "#a2aaad"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ketwqeuschqzjsllbid5"
      },
      {
        id: 66,
        bye: 11,
        defenseRankLs: 29,
        offenseRankLs: 27,
        city: "Jacksonville",
        name: "Jaguars",
        twitter: "#DUUUVAL",
        abbreviation: "JAX",
        homeVenue: {
        id: 57,
        name: "TIAA Bank Field"
        },
        conference: "AFC South",
        teamColoursHex: [
        "#101820",
        "#d7a22a",
        "#9f792c",
        "#006778"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/qycbib6ivrm9dqaexryk"
      },
      {
        id: 67,
        bye: 6,
        defenseRankLs: 23,
        offenseRankLs: 1,
        city: "Tennessee",
        name: "Titans",
        twitter: "#Titans",
        abbreviation: "TEN",
        conference: "AFC South",
        teamColoursHex: [
        "#0c2340",
        "#418fde",
        "#c8102e",
        "#8a8d8f",
        "#a2aaad",
        "#54585a"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/pln44vuzugjgipyidsre"
      },
      {
        id: 68,
        bye: 14,
        defenseRankLs: 22,
        offenseRankLs: 20,
        city: "Atlanta",
        name: "Falcons",
        twitter: " #DirtyBirds",
        abbreviation: "ATL",
        conference: "NFC South",
        teamColoursHex: [
        "#a71930",
        "#000000",
        "#a5acaf"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/d8m7hzpsbrl6pnqht8op"
      },
      {
        id: 69,
        bye: 13,
        defenseRankLs: 25,
        offenseRankLs: 23,
        city: "Carolina",
        name: "Panthers",
        twitter: "#KeepPounding",
        abbreviation: "CAR",
        homeVenue: {
        id: 47,
        name: "Bank of America Stadium"
        },
        conference: "NFC South",
        teamColoursHex: [
        "#0085ca",
        "#101820",
        "#bfc0bf"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ervfzgrqdpnc7lh5gqwq"
      },
      {
        id: 70,
        bye: 14,
        defenseRankLs: 3,
        offenseRankLs: 8,
        city: "New Orleans",
        name: "Saints",
        abbreviation: "NO",
        twitter: "#Saints",
        conference: "NFC South",
        teamColoursHex: [
        "#d3bc8d",
        "#101820"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/grhjkahghjkk17v43hdx"
      },
      {
        id: 71,
        bye: 11,
        defenseRankLs: 5,
        offenseRankLs: 5,
        city: "Tampa Bay",
        name: "Buccaneers",
        abbreviation: "TB",
        twitter: "#GoBucs",
        conference: "NFC South",
        teamColoursHex: [
        "#d50a0a",
        "#ff7900",
        "#0a0a08",
        "#b1babf",
        "#34302b"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/szwmxcasfizlkkfn5zwq"
      },
      {
        id: 72,
        bye: 9,
        defenseRankLs: 18,
        offenseRankLs: 26,
        city: "Denver",
        name: "Broncos",
        twitter: "#BroncosCountry",
        abbreviation: "DEN",
        conference: "AFC West",
        teamColoursHex: [
        "#fb4f14",
        "#002244"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/t0p7m5cjdjy18rnzzqbx"
      },
      {
        id: 73,
        bye: 8,
        defenseRankLs: 13,
        offenseRankLs: 12,
        city: "Kansas City",
        name: "Chiefs",
        abbreviation: "KC",
        twitter: "#ChiefsKingdom",
        conference: "AFC West",
        teamColoursHex: [
        "#e31837",
        "#ffb81c"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ujshjqvmnxce8m4obmvs"
      },
      {
        id: 74,
        bye: 6,
        defenseRankLs: 27,
        offenseRankLs: 9,
        city: "Las Vegas",
        name: "Raiders",
        abbreviation: "LV",
        twitter: "#RaiderNation",
        conference: "AFC West",
        teamColoursHex: [
        "#000000",
        "#a5acaf"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/gzcojbzcyjgubgyb6xf2"
      },
      {
        id: 75,
        bye: 8,
        defenseRankLs: 26,
        offenseRankLs: 12,
        city: "Los Angeles",
        name: "Chargers",
        twitter: "#BoltUp",
        abbreviation: "LAC",
        conference: "AFC West",
        teamColoursHex: [
        "#002a5e",
        "#ffc20e",
        "#0080c6"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/lu22ddatqbdknq4wuazd"
      },
      {
        id: 76,
        bye: 13,
        defenseRankLs: 12,
        offenseRankLs: 7,
        city: "Arizona",
        name: "Cardinals",
        twitter: "#RedSea",
        abbreviation: "ARI",
        conference: "NFC West",
        teamColoursHex: [
        "#97233f",
        "#000000",
        "#ffb612"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/u9fltoslqdsyao8cpm0k"
      },
      {
        id: 77,
        bye: 7,
        defenseRankLs: 2,
        offenseRankLs: 17,
        city: "Los Angeles",
        name: "Rams",
        abbreviation: "LA",
        twitter: "#RamsHouse",
        conference: "NFC West",
        teamColoursHex: [
        "#002244",
        "#866d4b",
        "#ffffff"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/rvmujtvvqlhlviuwafzg"
      },
      {
        id: 78,
        bye: 9,
        defenseRankLs: 19,
        offenseRankLs: 15,
        city: "San Francisco",
        name: "49ers",
        abbreviation: "SF",
        twitter: "#FTTB",
        conference: "NFC West",
        teamColoursHex: [
        "#aa0000",
        "#b3995d"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/dxibuyxbk0b9ua5ih9hn"
      },
        {
          id: 79,
          bye: 11,
          defenseRankLs: 13,
          offenseRankLs: 10,
          city: "Seattle",
          name: "Seahawks",
          twitter: "#Seahawks",
          abbreviation: "SEA",
          conference: "NFC West",
          teamColoursHex: [
          "#002244",
          "#69be28",
          "#a5acaf"
          ],
          officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/gcytzwpjdzbpwnwxincg"
        }
      ]

      this.NFLImages = {
        "8195" : {
          rookie: false,
          image: nflImageRoot+"en0ul7l1m9aqf7wffufg"
        },
        "7549" : {
          rookie: false,
          image: nflImageRoot+"sfehmfwtg9i5gdcpqzgf"
        },
        "8190" : {
          rookie: false,
          image: nflImageRoot+"voakyrtj34sghkwxaxxf"
        },
        "8469" : {
          rookie: false,
          image: nflImageRoot+"ym7oprwel3dxbab0k7x9"
        },
        "5940" : {
          rookie: false,
          image: nflImageRoot+"xhkqvvkq3awveyhv0x4e"
        },
        "8272" : {
          rookie: false,
          image: nflImageRoot+"ttuzsfycx9n3wie83dsw"
        },
        "8463" : {
          rookie: false,
          image: nflImageRoot+"qnt1kn2mouanpxvdvzvh"
        },
        "8305" : {
          rookie: false,
          image: nflImageRoot+"iwwyf70p2gckryfv7cyn"
        },
        "7888" : {
          rookie: false,
          image: nflImageRoot+"dindmtqwwvrzgkfsqfdb"
        },
        "16858" : {
          rookie: false,
          image: nflImageRoot+"htlt0h1p8gmpgrrbjyyj"
        },
        "18672" : {
          rookie: false,
          image: nflImageRoot+"zxk0jfinayjjhguk83gw"  
        },
        "6114" : {
          rookie: false,
          image: nflImageRoot+"ublljy2omv3mulxf7kkp"
        },
        "18624" : {
          rookie: false,
          image: nflImageRoot+"qgyu27brqcvyquh7btov"
        },
        "18578" : {
          rookie: false,
          image: nflImageRoot+"xcymtg1vdkbntbzlmbrw"
        },
        "19375" : {
          rookie: false,
          image: nflImageRoot+"m6btiz85brkj9bwim4yv"
        },
        "18732" : {
          rookie: false,
          image: nflImageRoot+"kfdhebiaodlh02eikayl"
        },
        "13028" : {
          rookie: false,
          image: nflImageRoot+"lplwsbpisofrdfyvtvfh"
        },
        "18650" : {
          rookie: false,
          image: nflImageRoot+"ijwidkupub1xzub4qiyb"
        },
        "18570" : {
          rookie: false,
          image: nflImageRoot+"kf5z3ytx4oh53xy8fudq"
        },
        "17040" : {
          rookie: false,
          image: nflImageRoot+"hzjeyplhs0f0koeqvgrm"
        },
        "8441" : {
          rookie: false,
          image: nflImageRoot+"gytzk7llt9p0qw22iayb"
        },
        "13210" : {
          rookie: false,
          image: nflImageRoot+"u3eeqbzyiguwoqdkz4fb"
        },
        "15006" : {
          rookie: false,
          image: nflImageRoot+"ledqnhfinzff3i0j7vni"
        },
        "18575" : {
          rookie: false,
          image: nflImageRoot+"ow7mjmmy8xw7mmwlllzl"
        },
        "14988" : {
          rookie: false,
          image: nflImageRoot+"pjdiyojbnf8ywt3jg36u"
        },
        "13276" : {
          rookie: false,
          image: nflImageRoot+"vwrzeanheawwjrqabvcj"
        },
        "18566" : {
          rookie: false,
          image: nflImageRoot+"p0149bnhdc9orxsoiyvl"
        },
        "18683" : {
          rookie: false,
          image: nflImageRoot+"ocmacwswn8i1il9j6afp"
        },
        "18595" : {
          rookie: false,
          image: nflImageRoot+"tw68tp2j7yceuwip6trq"
        },
        "14513" : {
          rookie: false,
          image: nflImageRoot+"o2e4hfh4ttdcuzm62qrg"
        },
        "7075" : {
          rookie: false,
          image: nflImageRoot+"caovj6onwsoepaen8tjc"
        },
        "9923" : {
          rookie: false,
          image: nflImageRoot+"iecbkdfdgjbj0kegxftw"
        },
        "9911" : {
          rookie: false,
          image: nflImageRoot+"zcumaps42lo5sskklxcb"
        },
        "7965" : {
          rookie: false,
          image: nflImageRoot+"hl3rjmdutfmecf7bsibt"
        },
        "6891" : {
          rookie: false,
          image: nflImageRoot+"xqdutjfczs0x2c4bxkq8"
        },
        "18689" : {
          rookie: false,
          image: nflImageRoot+"dlqzehvv4dqmq3q8vt7q"
        },
        "6627" : {
          rookie: false,
          image: nflImageRoot+"qf8blphaa8cjoad9l3iq"
        },
        "18748" : {
          rookie: false,
          image: nflImageRoot+"ojaldunm4wsqio8ecyzl"
        },
        "6366" : {
          rookie: false,
          image: nflImageRoot+"npiwam7wg49no1d5bcfu"
        },
        "8086" : {
          rookie: false,
          image: nflImageRoot+"mjxi12jh15analtvesbl"
        },
        "5936" : {
          rookie: false,
          image: nflImageRoot+"rdtcovvvxsmag3er42um"
        },
        "7543" : {
          rookie: false,
          image: nflImageRoot+"siupf4yvtt6m2vo8eed9"
        },
        "6879" : {
          rookie: false,
          image: nflImageRoot+"z8mv5hn5s8kkxau1ynup"
        },
        "7630" : {
          rookie: false,
          image: nflImageRoot+"wdo99sm5z6hbtsna0scf"
        },
        "6629" : {
          rookie: false,
          image: nflImageRoot+"omwvlsalhbvn4mshgfcf"
        },
        "17114" : {
          rookie: false,
          image: nflImageRoot+"dlej3m2xoj81yretkm3r"
        },
        "6335" : {
          rookie: false,
          image: nflImageRoot+"hsj22mncpaqynxmt3xni"
        },
        "9945" : {
          rookie: false,
          image: nflImageRoot+"xv2vjalzhb6z9bevj0z9"
        },
        "14877" : {
          rookie: false,
          image: nflImageRoot+"qba2lspodqxe1uuttgz7"
        },
        "9834" : {
          rookie: false,
          image: nflImageRoot+"jpdzcfis6a3qmwyn7mbu"
        },
        "7013" : {
          rookie: false,
          image: newNflImageRoot+"mcoovpx81ao3cdn0igbj"
        },
        "6486" : {
          rookie: false,
          image: nflImageRoot+"sextvbehmeu7ydutxtsu"
        },
        "18561" : {
          rookie: false,
          image: nflImageRoot+"tr3yxhybdwehibl6maqy"
        },
        "19043" : {
          rookie: false,
          image: nflImageRoot+"ydu8lvszgayayddtnt44"
        },
        "18785" : {
          rookie: false,
          image: nflImageRoot+"bgflcfmqggmnfp35wvoi"
        },
        "18769" : {
          rookie: false,
          image: nflImageRoot+"dxtherbqeeqm21shpweo"
        },
        "18576" : {
          rookie: false,
          image: nflImageRoot+"dpo09k2ilcdrqbybirpa"
        },
        "18979" : {
          rookie: false,
          image: nflImageRoot+"rwyeph1ojfmkryt2egzk"
        },
        "18985" : {
          rookie: false,
          image: nflImageRoot+"jpy9l8osfm3yhvjwunur"
        },
        "18771" : {
          rookie: false,
          image: nflImageRoot+"z2clh7yjqbdklh5wsde6"
        },
        "6939" : {
          rookie: false,
          image: nflImageRoot+"hylws51towgdgtb3xuue"
        },
        "18641" : {
          rookie: false,
          image: nflImageRoot+"itfqdvyumc77u8clmczy"
        },
        "18774" : {
          rookie: false,
          image: nflImageRoot+"sz8fxixdgfp0v2urdpgt"
        },
        "16080" : {
          rookie: false,
          image: nflImageRoot+"sy4vnmwmotj4azsybhyt"
        },
        "14510" : {
          rookie: false,
          image: nflImageRoot+"ichrbyxroayfplnyshr4"
        },
        "18586" : {
          rookie: false,
          image: nflImageRoot+"hcuzgs2nio1jkprrxb8d"
        },
        "9832" : {
          rookie: false,
          image: nflImageRoot+"jqwqm12gfrwvnljq3zpz"
        },
        "18757" : {
          rookie: false,
          image: nflImageRoot+"sxldzvwuh31gcmbiuavt"
        },
        "18843" : {
          rookie: false,
          image: nflImageRoot+"ruisuqsiiuufuwb9kzn4"
        },
        "18734" : {
          rookie: false,
          image: nflImageRoot+"gsci852t9zgfxblq9ukz"
        },
        "7609" : {
          rookie: false,
          image: nflImageRoot+"rnlbvr1luxvujvilpsja"
        },
        "10034" : {
          rookie: false,
          image: nflImageRoot+"fp5olqsgdbv5malqazzu"
        },
        "15416" : {
          rookie: false,
          image: nflImageRoot+"hj1o1fa6klumb7yozntc"
        },
        "13224" : {
          rookie: false,
          image: nflImageRoot+"oipjjzgdjyc5qstoo9zv"
        },
        "8544" : {
          rookie: false,
          image: nflImageRoot+"lazoen3ty3exj44grxbg"
        },
        "13386" : {
          rookie: false,
          image: nflImageRoot+"abkoyjrdrec9eub1pmzm"
        },
        "8728" : {
          rookie: false,
          image: nflImageRoot+"nozboqae26d3qrfbiarn"
        },
        "6908" : {
          rookie: false,
          image: nflImageRoot+"dvvx2eftodxk5qlhg4rl"
        },
        "9961" : {
          rookie: false,
          image: nflImageRoot+"ew3fzelndoialgn6a2ra"
        },
        "9743" : {
          rookie: false,
          image: nflImageRoot+"zi77vkqwrmklt5ic6lc6"
        },
        "9849" : {
          rookie: false,
          image: nflImageRoot+"n4tprmtnsgpc8cmvppvm"
        },
        "18593" : {
          rookie: false,
          image: nflImageRoot+"w2zhcr5cconyonvyhhbo"
        },
        "14713" : {
          rookie: false,
          image: nflImageRoot+"iduydmfnwwumvdkafogu"
        },
        "6560" : {
          rookie: false,
          image: nflImageRoot+"yorwzg4zr1putvxgtuzc"
        },
        "19016" : {
          rookie: false,
          image: nflImageRoot+"ztytuclbblkq43gzijpz"
        },
        "18613" : {
          rookie: false,
          image: nflImageRoot+"znpc5vhgni4lqh2sgrpg"
        },
        "16650" : {
          rookie: false,
          image: nflImageRoot+"zish1d1wbrhziswhsssd"
        },
        "18655" : {
          rookie: false,
          image: nflImageRoot+"ydp2awxxygyc17ugtmj3"
        },
        "6351" : {
          rookie: false,
          image: nflImageRoot+"u8glt8o1ugdzymmbkafr"
        },
        "9788" : {
          rookie: false,
          image: nflImageRoot+"i8be288cf78xhlwbawsm"
        },
        "18677" : {
          rookie: false,
          image: nflImageRoot+"bre8ysydjkevbfjzrs61"
        },
        "8240" : {
          rookie: false,
          image: nflImageRoot+"dhettmtaamsu9qlepzzf"
        },
        "18652" : {
          rookie: false,
          image: nflImageRoot+"spnfy71tflcjc2vq3bnm"
        },
        "8550" : {
          rookie: false,
          image: nflImageRoot+"jwljhx516yyxd8lz0hdd"
        },
        "17113" : {
          rookie: false,
          image: nflImageRoot+"rhtskdfdsdkbhm8zn6pa"
        },
        "9572" : {
          rookie: false,
          image: nflImageRoot+"hkb5vin1uzghnf60njhm"
        },
        "12847" : {
          rookie: false,
          image: nflImageRoot+"uilaivgdhm6fgyz4ruwj"
        },
        "18643" : {
          rookie: false,
          image: nflImageRoot+"qatisluh7jkk6gbhz7hj"
        },
        "18668" : {
          rookie: false,
          image: nflImageRoot+"gpz9zs474snz3jntrpbd"
        },
        "18670" : {
          rookie: false,
          image: nflImageRoot+"pfzlwlua7rh1kf3wv8iq"
        },
        "12606" : {
          rookie: false,
          image: nflImageRoot+"quvoqaapbnebbllg3jwl"
        },
        "18623": {
          rookie: false,
          firstName: "Clyde",
          lastName: "Edwards-Helaire",
          image: nflImageRoot+"ldgjalogqzti76pmqbw1"
        },
        "18688": {
          rookie: false,
          firstName: "Antonio",
          lastName: "Gibson",
          image: nflImageRoot+"cvmwtpfzdt0ibauqifup"
        },
        "18577": {
          rookie: false,
          firstName: "Joe",
          lastName: "Burrow",
          image: nflImageRoot+"alhbhd5ega2doxogh0dg"
        },
        "18640": {
          rookie: false,
          firstName: "Cam",
          lastName: "Akers",
          image: nflImageRoot+"zeh3myk7tc0yzp6qbudr"
        },
        "18603": {
          rookie: false,
          firstName: "D'Andre",
          lastName: "Swift",
          image: nflImageRoot+"qehlr75ike82kyxy8j9a"
        },
        "18849": {
          rookie: false,
          firstName: "James",
          lastName: "Robinson",
          image: nflImageRoot+"lxzbao36eeratekmnxeb"
        }, 
        "7575": {
          rookie: false,
          firstName: "Rob",
          lastName: "Gronkowski",
          image: nflImageRoot+"ldajm3cj1rs1sfwykyyk"
        }, 
        "18568": {
          rookie: false,
          firstName: "Zack",
          lastName: "Moss",
          image: nflImageRoot+"lhsxp1czwfg0thucvhtf"
        },
        "18895": {
          rookie: false,
          firstName: "Jordan",
          lastName: "Fuller",
          image: nflImageRoot+"krqfhhry1lbtx2acscmj"
        }, 
        "13411": {
          rookie: false,
          firstName: "John",
          lastName: "Johnson",
          image: nflImageRoot+"xwzn5lh2mhktocqcougu"
        },
        "18615": {
          rookie: false,
          firstName: "Jonathan",
          lastName: "Taylor",
          image: nflImageRoot+"mx6ptr3jbhx0wxo3848u"
        },
        "18631": {
          rookie: false,
          firstName: "Justin",
          lastName: "Herbert",
          image: nflImageRoot+"lrn52vly8xrfapbhw1ft"
        },
        "18594": {
          rookie: false,
          firstName: "Jerry",
          lastName: "Jeudy",
          image: newNflImageRoot+"szca1v9butuqkjs7ekpm"
        },
        "17023": {
          rookie: false,
          firstName: "Joey",
          lastName: "Slye",
          image: nflImageRoot+"xzlrapymjhwbanjcivlk"
        },
        "18588": {
          rookie: false,
          firstName: "CeeDee",
          lastName: "Lamb",
          image: nflImageRoot+"e8ftgnyivmkwtffd6tcr"
        },
        "18819": {
          rookie: false,
          firstName: "Rodrigo",
          lastName: "Blankenship",
          image: nflImageRoot+"j2z6mdwlye2gc4zhmc3g"
        },
        "18882": {
          rookie: false,
          firstName: "Joshua",
          lastName: "Kelley",
          image: nflImageRoot+"pkqsegmcbmbjlvwfzzl2"
        },
        "16038": {
          rookie: false,
          firstName: "Darrell",
          lastName: "Henderson",
          image: nflImageRoot+"nyjvyjkx6cb2a7lfxevg"
        },
        "18648": {
          rookie: false,
          firstName: "Justin",
          lastName: "Jefferson",
          image: nflImageRoot+"rbpfxph4wwkxnhphoat6"
        },
        "16254": {
          rookie: false,
          firstName: "Scott",
          lastName: "Miller",
          image: nflImageRoot+"knmpvvmftnvmqtx5g8me"
        },
        "18675": {
          rookie: false,
          firstName: "Brandon",
          lastName: "Aiyuk",
          image: nflImageRoot+"crkz9pxkba4o1zsmiazt"
        },
        "18635": {
          rookie: false,
          firstName: "Van",
          lastName: "Jefferson",
          image: newNflImageRoot+"v2vkt9htky3xawu8yskx"
        },
        "30425": {
          rookie: false,
          firstName: "Trevor",
          lastName: "Lawrence",
          image: nflImageRoot+"nyagacdtgj26vf4evn7w"
        },
        "30430": {
          rookie: false,
          firstName: "Zach",
          lastName: "Wilson",
          image: nflImageRoot+"u9t7qn55molsifoee2sr"
        },
        "30439": {
          rookie: false,
          firstName: "Justin",
          lastName: "Fields",
          image: nflImageRoot+"ohjocm3hzbdvvycmm3yf"
        },
        "30443": {
          rookie: false,
          firstName: "Mac",
          lastName: "Jones",
          image: nflImageRoot+"yucu9hddoj4x9w9ifiod"
        },
        "30431": {
          rookie: false,
          firstName: "Trey",
          lastName: "Lance",
          image: nflImageRoot+"wyd6t28jc7wwg5vyseoc"
        },
        "30434": {
          rookie: false,
          firstName: "Jaylen",
          lastName: "Waddle",
          image: nflImageRoot+"hkwyhd9w8pouxwhqn6ly"
        },
        "30433": {
          rookie: false,
          firstName: "Ja'Marr",
          lastName: "Chase",
          image: nflImageRoot+"fxclfdx8fz5cbuep6ngd"
        },
        "30432": {
          rookie: false,
          firstName: "Kyle",
          lastName: "Pitts",
          image: nflImageRoot+"ck6bpvk71ancovvtomdg"
        },
        "13433": {
          rookie: false,
          firstName: "Najee",
          lastName: "Harris",
          image: nflImageRoot+"lwcct10u7lfzsgtaoqce"
        },
        "18627": {
          rookie: false,
          firstName: "Bryan",
          lastName: "Edwards",
          image: nflImageRoot+"aqic7l7pnw9x5ukh6iqr"
        },
        "30438": {
          rookie: false,
          firstName: "DeVonta",
          lastName: "Smith",
          image: nflImageRoot+"hol7dluumxi1cqxyagg3"
        },
        "30817": {
          rookie: false,
          firstName: "Elijah",
          lastName: "Moore",
          image: nflImageRoot+"bhwvzckfhhcqhb7zdqyj"
        },
        "30931": {
          rookie: false,
          firstName: "Rondale",
          lastName: "Moore",
          image: nflImageRoot+"qwcd3lglkknslsavcvr7"
        },
        "18940": {
          rookie: false,
          firstName: "K.J.",
          lastName: "Osburn",
          image: nflImageRoot+"p44nhjopxr4mwncbdx5l"
        },
        "9919": {
          rookie: false,
          firstName: "Jared",
          lastName: "Goff",
          image: nflImageRoot+"mxwxbwae3dsmth9dvta2"
        },
        "6825": {
          rookie: false,
          firstName: "Matt",
          lastName: "Stafford",
          image: nflImageRoot+"pxll35kun2cq2aeluaav"
        },
        "6205": {
          rookie: false,
          firstName: "Tyrod",
          lastName: "Taylor",
          image: nflImageRoot+"c8dbt9tuux5oatihnwkz"
        },
        "7457": {
          rookie: false,
          firstName: "Teddy",
          lastName: "Bridgewater",
          image: nflImageRoot+"q5p8afhezmpvc1xbwibf"
        },
        "14494": {
          rookie: false,
          firstName: "Sam",
          lastName: "Darnold",
          image: nflImageRoot+"izcmywlqedam7djfuayc"
        },
        "6464": {
          rookie: false,
          firstName: "Andy",
          lastName: "Dalton",
          image: nflImageRoot+"xrwmjyexhhwpoxhtrhl2"
        },
        "7647": {
          rookie: false,
          firstName: "Mark",
          lastName: "Ingram",
          image: nflImageRoot+"qyju9wutyssrf0b26ran"
        },
        "6038": {
          rookie: false,
          firstName: "Julio",
          lastName: "Jones",
          image: nflImageRoot+"zr7o7ow6cdb3ata0errd"
        },
        "6027": {
          rookie: false,
          firstName: "Tevin",
          lastName: "Coleman",
          image: nflImageRoot+"cy80drx21ucuyagaochk"
        },
        "8487": {
          rookie: false,
          firstName: "Jared",
          lastName: "Cook",
          image: nflImageRoot+"cthoenebptadlu4g928v"
        },
        "9999": {
          rookie: false,
          firstName: "Hunter",
          lastName: "Henry",
          image: nflImageRoot+"ldzlkisbxebv2pzup9qd"
        },
        "12943": {
          rookie: false,
          firstName: "Kenny",
          lastName: "Golladay",
          image: nflImageRoot+"gdihhyi6bpsvyljtenua"
        },
        "7485": {
          rookie: false,
          firstName: "Kyle",
          lastName: "Rudolph",
          image: nflImageRoot+"lvve7xyvlupkydsgma0q"
        },
        "30306": {
          rookie: false,
          firstName: "Dyami",
          lastName: "Brown",
          image: nflImageRoot+"ok8mvanlgwi5cfqndl0n"
        },
        "7459": {
          rookie: false,
          firstName: "Taylor",
          lastName: "Heinicke",
          image: nflImageRoot+"hik6marceggrf4cmukci"
        },
        "27502": {
          rookie: false,
          firstName: "Ty'Son",
          lastName: "Williams",
          image: nflImageRoot+"ucxy1zbyppgm62iyvrdr"
        },
        "6477": {
          rookie: false,
          firstName: "A.J.",
          lastName: "Green",
          image: nflImageRoot+"ibugzfv4xaeq9y4xurmj"
        },
        "30193": {
          rookie: false,
          firstName: "Eli",
          lastName: "Mitchell",
          image: nflImageRoot+"csra0oiqwh6i2utjdlud"
        },
        "13529": {
          rookie: false,
          firstName: "Jonnu",
          lastName: "Smith",
          image: nflImageRoot+"uqux8vr24dx5tvqf97hb"
        },
        "18657": {
          rookie: false,
          firstName: "Adam",
          lastName: "Trautman",
          image: nflImageRoot+"zdzicjvlqk43ssjhupwy"
        },
        "8019": {
          rookie: false,
          firstName: "Nelson",
          lastName: "Aghgolor",
          image: nflImageRoot+"cym6r5v9z8uizic8ak5i"
        },
        "8565": {
          rookie: false,
          firstName: "Adam",
          lastName: "Humphries",
          image: nflImageRoot+"l56ywjejfpraigzs4qia"
        },
        "12670": {
          rookie: false,
          firstName: "Corey",
          lastName: "Davis",
          image: nflImageRoot+"e96ltr3bnrq6bs4o0gvx"
        },
        "6756": {
          rookie: false,
          firstName: "Emmanuel",
          lastName: "Sanders",
          image: nflImageRoot+"potkibjtm855tsawozs0"
        },
        "6479": {
          rookie: false,
          firstName: "Marvin",
          lastName: "Jones Jr.",
          image: nflImageRoot+"ciy9sxefmcnwjw7ln3h2"
        },
        "7287": {
          rookie: false,
          firstName: "Chris",
          lastName: "Conley",
          image: nflImageRoot+"capkuyfgpghldch9dzl7"
        },
        "8208": {
          rookie: false,
          firstName: "Tyrell",
          lastName: "Williams",
          image: nflImageRoot+"qixhze7yidydtc1vyeih"
        },
        "11501": {
          rookie: false,
          firstName: "Kalif",
          lastName: "Raymond",
          image: nflImageRoot+"v5tzzalsktjaeeepc59o"
        },
        "8377": {
          rookie: false,
          firstName: "Mike",
          lastName: "Davis",
          image: nflImageRoot+"a12intlc15po42xebdxv"
        },
        "6845": {
          rookie: false,
          firstName: "Eric",
          lastName: "Ebron",
          image: nflImageRoot+"uaxsxymncppase7ihczd"
        },
        "18562": {
          rookie: false,
          firstName: "Devin",
          lastName: "Duvernay",
          image: nflImageRoot+"kcfjuebtxvkg9kapy71o"
        },
        "6671": {
          rookie: false,
          firstName: "Geoff",
          lastName: "Swaim",
          image: nflImageRoot+"zkurufp1suswhdb611hs"
        },
        "9694": {
          rookie: false,
          firstName: "Kenyan",
          lastName: "Drake",
          image: nflImageRoot+"zrdr9i5rjxr5z8xilqdd"
        },
        "30693": {
          rookie: false,
          firstName: "Pat",
          lastName: "Freiermuth",
          image: nflImageRoot+"mcmq0fne7lzmd4ymuonx"
        },
        "12999": {
          rookie: false,
          firstName: "Jamaal",
          lastName: "Williams",
          image: nflImageRoot+"qerbr9qnhpn27cyogu4x"
        },
        "30242": {
          rookie: false,
          firstName: "Nico",
          lastName: "Collins",
          image: nflImageRoot+"qls2a7h4ujxn7m4fj05y"
        },
        "30689": {
          rookie: false,
          firstName: "Davis",
          lastName: "Mills",
          image: nflImageRoot+"zzk8nhal2wi51xdbw7bm"
        },
        "22228": {
          rookie: false,
          firstName: "Quez",
          lastName: "Watkins",
          image: nflImageRoot+"gwow6ytckqv1ukrbrl5l"
        },
        "14665": {
          rookie: false,
          firstName: "Anthony",
          lastName: "Miller",
          image: nflImageRoot+"u3xq3snkesclrrqulagk"
        },
        "30978": {
          rookie: false,
          firstName: "Tommy",
          lastName: "Tremble",
          image: nflImageRoot+"tvqixry9ad1tnsy9xdor"
        },
        "9878": {
          rookie: false,
          firstName: "Blake",
          lastName: "Martinez",
          image: nflImageRoot+"cryuvmmnkryxlgjfgziw"
        },
        "18787": {
          rookie: false,
          firstName: "Quintez",
          lastName: "Cephus",
          image: nflImageRoot+"i8qrouusz4vbkmhcg0ks"
        },
        "30122": {
          rookie: false,
          firstName: "Micheal",
          lastName: "Carter II",
          image: nflImageRoot+"admwfoo0pgl2z2zvqcp2"
        },
        "30935": {
          rookie: false,
          firstName: "Trey",
          lastName: "Sermon",
          image: nflImageRoot+"v2igdor3vf1ijb0qyyp1"
        },
        "14522": {
          rookie: false,
          firstName: "Sony",
          lastName: "Michel",
          image: nflImageRoot+"sge9qla3wyhfzemqaq5f"
        },
        "18679": {
          rookie: false,
          firstName: "Jordyn",
          lastName: "Brooks",
          image: nflImageRoot+"kaivb20gkmzo2mfmkvxq"
        },
        "31891": {
          rookie: false,
          firstName: "Nick",
          lastName: "Bolton",
          image: nflImageRoot+"q2jqgcnnnv3d7zdd3u0v"
        },
        "18630": {
          rookie: false,
          firstName: "Kenneth",
          lastName: "Murray",
          image: nflImageRoot+"dfh0z6h7s3pkb4excc3k"
        },
        "13246": {
          rookie: false,
          firstName: "Alex",
          lastName: "Anzalone",
          image: nflImageRoot+"fcsmqw0nq4mw1wvji2z4"
        },
        "30221": {
          rookie: false,
          firstName: "Rashod",
          lastName: "Bateman",
          image: nflImageRoot+"vpcmsc93xuzhv4bupbzu"
        },
        "18555": {
          rookie: false,
          firstName: "Isaiah",
          lastName: "Simmons",
          image: nflImageRoot+"o0xgwhoevo1fpjrowgpq"
        },
        "18581": {
          rookie: false,
          firstName: "Logan",
          lastName: "Wilson",
          image: nflImageRoot+"s3g0kgjmwhvw69jewwyr"
        },
        "23257": {
          rookie: false,
          firstName: "Nick",
          lastName: "Westbrook",
          image: nflImageRoot+"qkfbmmwufx3fmqd9cth9"
        },
        "7477": {
          rookie: false,
          firstName: "Cordarrelle",
          lastName: "Patterson",
          image: nflImageRoot+"jnj4vueqtpbhjuqjrakr"
        },
        "5956": {
          rookie: false,
          firstName: "Darren",
          lastName: "Fells",
          image: nflImageRoot+"eh0rbweg4wbzgzpvprnv"
        },
        "13188": {
          rookie: false,
          firstName: "James",
          lastName: "Conner",
          image: nflImageRoot+"nq7mtvvxmgc2vukwwcpo"
        },
        "30925": {
          rookie: false,
          firstName: "Javonte",
          lastName: "Williams",
          image: nflImageRoot+"i00p0fbwvrap6lq1hojw"
        },
        "30208": {
          rookie: false,
          firstName: "Chuba",
          lastName: "Hubbard",
          image: nflImageRoot+"nkitu0vqly1r1vreldfn"
        },
        "30597": {
          rookie: false,
          firstName: "Kenneth",
          lastName: "Gainwell",
          image: nflImageRoot+"s8prgy9fa6ldmp7apoeb"
        },
        "30929": {
          rookie: false,
          firstName: "Larry",
          lastName: "Rountree III",
          image: nflImageRoot+"yaunqhefdc1u79oegpsp"
        },
        "30351": {
          rookie: false,
          firstName: "Kylin",
          lastName: "Hill",
          image: nflImageRoot+"gxrbyvfiqgip3jyrraj0"
        },
        "30726": {
          rookie: false,
          firstName: "Demetric",
          lastName: "Felton",
          image: nflImageRoot+"n1rwkkcuaq90iv8bhqj9"
        },
        "30920": {
          rookie: false,
          firstName: "Anthony",
          lastName: "Schwartz",
          image: nflImageRoot+"ipvvq2xasootlkeco3ne"
        },
        "30926": {
          rookie: false,
          firstName: "Josh",
          lastName: "Palmer",
          image: nflImageRoot+"x2gobzerrjxzgpxij4ac"
        },
        "30703": {
          rookie: false,
          firstName: "Luke",
          lastName: "Farrell",
          image: nflImageRoot+"nfuvxexlyqkcfr4ug9ng"
        },
        "13356": {
          rookie: false,
          firstName: "Keelan",
          lastName: "Cole",
          image: nflImageRoot+"boajq2m1njwe88c23lpd"
        },
        "30447": {
          rookie: false,
          firstName: "Kadarius",
          lastName: "Toney",
          image: nflImageRoot+"sptr6q2brsttjjg4zkov"
        },
        "8466": {
          rookie: false,
          firstName: "Malcom",
          lastName: "Brown",
          image: nflImageRoot+"zxnjheichwlnvvu5qdyl"
        },
        "30609": {
          rookie: false,
          firstName: "Pete",
          lastName: "Warner",
          image: nflImageRoot+"odhi45hkqjbxr5xqxctg"
        },
        "14521": {
          rookie: false,
          firstName: "Mike",
          lastName: "Hughes",
          image: nflImageRoot+"ohydfhzyltb4qbnqz1ti"
        },
        "8715": {
          rookie: false,
          firstName: "Jason",
          lastName: "McCourty",
          image: nflImageRoot+"myk5ccdezt1lhjc8szbm"
        },
        "9753": {
          rookie: false,
          firstName: "Matt",
          lastName: "Judon",
          image: nflImageRoot+"gzqaca6m73uzgwczrw7z"
        },
        "18961": {
          rookie: false,
          firstName: "Tae",
          lastName: "Crowder",
          image: nflImageRoot+"kzdlpqta1ngescib3es0"
        },
        "17072": {
          rookie: false,
          firstName: "Jalen",
          lastName: "Thompson",
          image: nflImageRoot+"ldeja3lkrjadp11cz1jo"
        },
        "6371": {
          rookie: false,
          firstName: "Graham",
          lastName: "Gano",
          image: nflImageRoot+"kibotlfb4ipuxdirxzp0"
        },
        "16066": {
          rookie: false,
          firstName: "Chase",
          lastName: "McLaughlin",
          image: nflImageRoot+"kehs9z6fpllcdqzdkvmo"
        },
        "10014": {
          rookie: false,
          firstName: "Alex",
          lastName: "Collins",
          image: nflImageRoot+"ddlhbm7zsi5o69wh6z5o"
        },
        "12705": {
          rookie: false,
          firstName: "Ricky",
          lastName: "Seals-Jones",
          image: nflImageRoot+"qodkouwmexklezoqmcg6"
        },
        "7373": {
          rookie: false,
          firstName: "Damien",
          lastName: "Williams",
          image: nflImageRoot+"n8s6juvkggzwt8ejry63"
        },
        "8109": {
          rookie: false,
          firstName: "Antonio",
          lastName: "Brown",
          image: nflImageRoot+"ecxsx9t7bfg42bgfwj3v"
        },
        "8548": {
          rookie: false,
          firstName: "Mike",
          lastName: "Glennon",
          image: nflImageRoot+"mubobrjbeudtezxv0t0p"
        },
        "13281": {
          rookie: false,
          firstName: "Marcus",
          lastName: "Johnson",
          image: nflImageRoot+"zliegu0pfjyehqw1ozzh"
        },
        "30440": {
          rookie: false,
          firstName: "Micah",
          lastName: "Parsons",
          image: nflImageRoot+"u6uanv3mp0skqysqv5wx"
        },
        "12688": {
          rookie: false,
          firstName: "Haason",
          lastName: "Reddick",
          image: nflImageRoot+"ug4cbgz6sttovqkzqgkm"
        },
        "19276": {
          rookie: false,
          firstName: "Geno",
          lastName: "Smith",
          image: nflImageRoot+"jdkrvzqqhkbg62hstgtw"
        },
        "30593": {
          rookie: false,
          firstName: "Kahlil",
          lastName: "Herbert",
          image: nflImageRoot+"q3joomqliqwvrqs9vkmj"
        },
        "13280": {
          rookie: false,
          firstName: "Mack",
          lastName: "Hollins",
          image: nflImageRoot+"fe6e0gnullhxbgt6ohhg"
        },
        "12937": {
          rookie: false,
          firstName: "Jamal",
          lastName: "Agnew",
          image: nflImageRoot+"ekqayurhdocxuvimyjy1"
        },
        "8464": {
          rookie: false,
          firstName: "Case",
          lastName: "Keenum",
          image: nflImageRoot+"pjmiuwbl35c1wetjcszr"
        },
        "16672": {
          rookie: false,
          firstName: "Lonnie",
          lastName: "Johnson",
          image: nflImageRoot+"dc5qjoqdkt4craiuem8k"
        },
        "15377": {
          rookie: false,
          firstName: "Emmnauel",
          lastName: "Mosely",
          image: nflImageRoot+"mq4eglal317zmqfsple4"
        },
        "25812": {
          rookie: false,
          firstName: "Charlie",
          lastName: "Woerner",
          image: nflImageRoot+"v811mn47vy4yym5qefhd"
        },
        "14675": {
          rookie: false,
          firstName: "Mike",
          lastName: "White",
          image: nflImageRoot+"uplanmusamdr4bzil0v4"
        },
        "18666": {
          rookie: false,
          firstName: "Denzel",
          lastName: "Mims",
          image: nflImageRoot+"nvoyxkpbc7pp9pjkwqbw"
        },
        "18607": {
          rookie: false,
          firstName: "Jordan",
          lastName: "Love",
          image: nflImageRoot+"tm8zrpwj62zkn2mqxef1"
        },
        "6741": {
          rookie: false,
          firstName: "Trevor",
          lastName: "Siemian",
          image: nflImageRoot+"pizeafmn2cj95emcydg3"
        }, 
        "9791": {
          rookie: false,
          firstName: "Jordan",
          lastName: "Howard",
          image: nflImageRoot+"nbvb6bsrmjupmqrrf1n4"
        },
        "18606": {
          rookie: false,
          firstName: "AJ",
          lastName: "Dillon",
          image: nflImageRoot+"jpowpgjn6nm6umrls2px"
        },
        "6294" : {
          rookie: false,
          firstName: "Cam",
          lastName: "Newton",
          image: nflImageRoot+"zwmgw2gmnn2kch4nquft"
        },
        "30304" : {
          rookie: false,
          firstName: "John",
          lastName: "Bates",
          image: nflImageRoot+"uhuncx8qb6b3grbfztg8"
        },
        "14910" : {
          rookie: false,
          firstName: "Tim",
          lastName: "Boyle",
          image: nflImageRoot+"bzzq8cwpttjtatcclfea"
        },
        "18726" : {
          rookie: false,
          firstName: "Tyler",
          lastName: "Huntley",
          image: nflImageRoot+"o75lst87can47rzetd1p"
        },
        "6216" : {
          rookie: false,
          firstName: "Marquisse",
          lastName: "Goodwin",
          image: nflImageRoot+"mq9ih2olutji2nufwbvj"
        },
        "8749" : {
          rookie: false,
          firstName: "Tony",
          lastName: "Jones",
          image: nflImageRoot+"zotzkoxxn358hpgmesdv"
        },
        "30625" : {
          rookie: false,
          firstName: "Amon",
          lastName: "St. Brown",
          image: nflImageRoot+"wriyln01fppggo6jwvc0"
        },
        "18605" : {
          rookie: false,
          firstName: "Josiah",
          lastName: "Deguara",
          image: nflImageRoot+"yzw2xy9ibxvwfogeywcx"
        }, 
        "14678" : {
          rookie: false,
          firstName: "Ced",
          lastName: "Wilson",
          image: nflImageRoot+"mqx2ue8p1i49rsft8lrx"
        }, 
        "8748" : {
          rookie: false,
          firstName: "DeSean",
          lastName: "Jackson",
          image: nflImageRoot+"pr5m864fqvnoozihylrh"
        },
        "30717" : {
          rookie: false,
          firstName: "Dez",
          lastName: "Fitzpatrick",
          image: nflImageRoot+"unxs3jdj0qphnyh6i0jm"
        },
        "16736" : {
          rookie: false,
          firstName: "Gardner",
          lastName: "Minshew",
          image: newNflImageRoot+"zn2kvriijuixffqfx7ob"
        },
        "16593" : {
          rookie: false,
          firstName: "Jalen",
          lastName: "Guyton",
          image: nflImageRoot+"bbvqbvctga7wrtnt9b4h"
        },
        "13009" : {
          rookie: false,
          firstName: "Donta",
          lastName: "Foreman",
          image: nflImageRoot+"fhxviqgdrngc8gvvhnor"
        },
        "7746" : {
          rookie: false,
          firstName: "Odell",
          lastName: "Beckham",
          image: nflImageRoot+"etl34lkiscs2lpc4to2f"
        },
        "8032" : {
          rookie: false,
          firstName: "Zach",
          lastName: "Ertz",
          image: nflImageRoot+"y4cua1auc75ybocf2ijz"
        },
        "30381" : {
          rookie: false,
          firstName: "Jermar",
          lastName: "Jefferson",
          image: nflImageRoot+"snmaivk9ikcatxwexvku"
        },
        "12769" : {
          rookie: false,
          firstName: "Zay",
          lastName: "Jones",
          image: nflImageRoot+"ayvki2sfnzxn2yqssrws"
        },
        "19027" : {
          rookie: false,
          firstName: "Tyler",
          lastName: "Johnson",
          image: nflImageRoot+"d6e5mwllmmwixl01o93g"
        },
        "18682" : {
          rookie: false,
          firstName: "Keshawn",
          lastName: "Vaughn",
          image: nflImageRoot+"to1j3eftgyobffvygini"
        },
        "39082" : {
          rookie: false,
          firstName: "Drake",
          lastName: "London",
          image: nflImageRoot+"rrwzcsvsfqq9xptp8o48"
        },
        "39129" : {
          rookie: false,
          firstName: "Trey",
          lastName: "McBride",
          image: nflImageRoot+"qawwcnmfggwgsemqwwki"
        },
        "7380" : {
          rookie: false,
          firstName: "Jarvis",
          lastName: "Landry",
          image: nflImageRoot+"w2q9uwsjvgadwyvnvopb"
        },
        "9910" : {
          rookie: false,
          firstName: "Tyreke",
          lastName: "Hill",
          image: nflImageRoot+"lsszbdnkusxc7mduw5be"
        },
        "6025" : {
          rookie: false,
          firstName: "Matt",
          lastName: "Ryan",
          image: nflImageRoot+"s6zam4ekrrnonsck6vak"
        },
        "14492" : {
          rookie: false,
          firstName: "Baker",
          lastName: "Mayfield",
          image: nflImageRoot+"haglbmidyaxtimhctzlp"
        },
        "39127" : {
          rookie: false,
          firstName: "Alec",
          lastName: "Pierce",
          image: nflImageRoot+"em0lm1sfdslmnfyu8ykh"
        },
        "43341" : {
          rookie: false,
          firstName: "Damien",
          lastName: "Pierce",
          image: nflImageRoot+"ha8dflxsj1egza1sxbzb"
        },
        "39126" : {
          rookie: false,
          firstName: "George",
          lastName: "Pickens",
          image: nflImageRoot+"weaecvrxrfflsqm8kvpt"
        },
        "6225" : {
          rookie: false,
          firstName: "Robert",
          lastName: "Woods",
          image: nflImageRoot+"ksw0cui3nmzzaxwnkstl"
        },
        "9937" : {
          rookie: false,
          firstName: "Jacoby",
          lastName: "Brissett",
          image: nflImageRoot+"z12an2n54jj6ycouwg9h"
        },
        "8283" : {
          rookie: false,
          firstName: "Russell",
          lastName: "Wilson",
          image: newNflImageRoot+"u36rhg0md8ey3b4khbre"
        },
        "9712" : {
          rookie: false,
          firstName: "Carson",
          lastName: "Wentz",
          image: nflImageRoot+"indtay8ngoq8ubhhydbp"
        },
        "16931" : {
          rookie: false,
          firstName: "Hollywood",
          lastName: "Brown",
          image: nflImageRoot+"oytg4uatpjzmfrrhmt0r"
        },
        "14654" : {
          rookie: false,
          firstName: "Christian",
          lastName: "Kirk",
          image: nflImageRoot+"illjppjxpfa4joefmpd0"
        },
        "13203" : {
          rookie: false,
          firstName: "Juju",
          lastName: "Smith-Schuster",
          image: nflImageRoot+"ypoituliieghtndjrzaz"
        },
        "16185" : {
          rookie: false,
          firstName: "Greg",
          lastName: "Dortch",
          image: nflImageRoot+"j5xmpo01eea118axwwaj"
        },
        "6924" : {
          rookie: false,
          firstName: "Devante",
          lastName: "Adams",
          image: nflImageRoot+"jmojceirzhgctrcfi4aw"
        },
        "14874" : {
          rookie: false,
          firstName: "Chase",
          lastName: "Edmonds",
          image: nflImageRoot+"ya7hnoqk5r2zemgknwpm"
        },
        "7384" : {
          rookie: false,
          firstName: "DeVante",
          lastName: "Parker",
          image: nflImageRoot+"cgbhrfcqdoe3yvpsic04"
        },
        "7198" : {
          rookie: false,
          firstName: "Allen",
          lastName: "Robinson",
          image: nflImageRoot+"tucplhxtb3c626iekuzv"
        },
        "8640" : {
          rookie: false,
          firstName: "Marcus",
          lastName: "Mariota",
          image: nflImageRoot+"sd59iwjj69atxaqjti1r"
        },
        "7929" : {
          rookie: false,
          firstName: "Amari",
          lastName: "Cooper",
          image: nflImageRoot+"zibbxjtein7gpu5zgcj4"
        },
        "6487" : {
          rookie: false,
          firstName: "Tyler",
          lastName: "Kroft",
          image: nflImageRoot+"qon8cgkz2g2m4ocwdlok"
        },
        "14701" : {
          rookie: false,
          firstName: "D.J.",
          lastName: "Chark jr.",
          image: nflImageRoot+"bn5lxiv1cyyidlhkth84"
        },
        "14516" : {
          rookie: false,
          firstName: "Hayden",
          lastName: "Hurst",
          image: nflImageRoot+"evevkgcgy0suudtprryp"
        },
        "13094" : {
          rookie: false,
          firstName: "Evan",
          lastName: "Engram",
          image: nflImageRoot+"adr65rbw956sxntlph8a"
        },
        "39090" : {
          rookie: false,
          firstName: "Jahan",
          lastName: "Dotson",
          image: nflImageRoot+"ejqlekhhbiox5x2767hp"
        },
        "39108" : {
          rookie: false,
          firstName: "Christian",
          lastName: "Watson",
          image: nflImageRoot+"gvusv3krvdk69c1zyac9"
        },
        "14689" : {
          rookie: false,
          firstName: "E",
          lastName: "St. Brown",
          image: nflImageRoot+"utyhdvj2rjwpnr4ppjly"
        },
        "13409" : {
          rookie: false,
          firstName: "Gerald",
          lastName: "Everett",
          image: nflImageRoot+"ovlnn7uuj2335ublzb6o"
        },
        "14688" : {
          rookie: false,
          firstName: "Marquez",
          lastName: "Valdez-Scantling",
          image: nflImageRoot+"dvzluuxi81gwt3e8eixo"
        },
        "14710" : {
          rookie: false,
          firstName: "Tyler",
          lastName: "Conklin",
          image: nflImageRoot+"fx3sjul1xvi4tuag57bn"
        },
        "16079" : {
          rookie: false,
          firstName: "Chris",
          lastName: "Myarick",
          image: nflImageRoot+"p4wveksckzn0nuept8zw"
        },
        "16705" : {
          rookie: false,
          firstName: "Noah",
          lastName: "Fant",
          image: nflImageRoot+"w1gqasldrg3jumzdqjvy"
        },
        "6224" : {
          rookie: false,
          firstName: "Sammy",
          lastName: "Watkins",
          image: nflImageRoot+"nkqk4ac4uncxocqlgp2k"
        },
        "39293" : {
          rookie: false,
          firstName: "Romeo",
          lastName: "Doubs",
          image: nflImageRoot+"wciz0bsjd4bedpiwggog"
        },
        "12651" : {
          rookie: false,
          firstName: "Johnny",
          lastName: "Mundt",
          image: nflImageRoot+"sjglruhtgs3eeea6zd3i"
        },
        "14973" : {
          rookie: false,
          firstName: "DeAndre",
          lastName: "Carter",
          image: nflImageRoot+"fgkf5m167nupk3jv3w5w"
        },
        "39084" : {
          rookie: false,
          firstName: "Garrett",
          lastName: "Wilson",
          image: nflImageRoot+"gqdfigo9nzji4e6nshpk"
        },
        "39085" : {
          rookie: false,
          firstName: "Chris",
          lastName: "Olave",
          image: nflImageRoot+"fh4mzrgbiqemhomzpukt"
        },
        "39092" : {
          rookie: false,
          firstName: "Treylon",
          lastName: "Burks",
          image: nflImageRoot+"lg8k1ii67cspylp6przv"
        },
        "13573" : {
          rookie: false,
          firstName: "Josh",
          lastName: "Reynolds",
          image: nflImageRoot+"khqejrdwhxxjzvbco3nv"
        },
        "6926" : {
          rookie: false,
          firstName: "Randall",
          lastName: "Cobb",
          image: nflImageRoot+"wphqc5wstbm0wji2bpxk"
        },
        "12811" : {
          rookie: false,
          firstName: "Curtis",
          lastName: "Samuel",
          image: nflImageRoot+"sua7hikhhqlmqsqu0kk7"
        },
        "31103" : {
          rookie: false,
          firstName: "Rhamandre",
          lastName: "Stevenson",
          image: nflImageRoot+"ro2fqabc4qndtnxykvm7"
        },
        "14729" : {
          rookie: false,
          firstName: "Richie",
          lastName: "James",
          image: nflImageRoot+"iuxz1y4skvu6cqcqjhag"
        },
        "43347" : {
          rookie: false,
          firstName: "Dan",
          lastName: "Bellinger",
          image: nflImageRoot+"hqu8d9tlejqvfhexn56r"
        },
        "14734" : {
          rookie: false,
          firstName: "Justin",
          lastName: "Watson",
          image: nflImageRoot+"h54qh7pjxrhokvmbnyzt"
        },
        "30928" : {
          rookie: false,
          firstName: "Kylen",
          lastName: "Granson",
          image: nflImageRoot+"t3lbs3ss6y4mto2lkjjh"
        },
        "6130" : {
          rookie: false,
          firstName: "Breshod",
          lastName: "Perriman",
          image: nflImageRoot+"zpwov1n42bi5lsqdlxhh"
        },
        "12738" : {
          rookie: false,
          firstName: "",
          lastName: "Saubert",
          image: nflImageRoot+"u6q14gpp39btnbvlkvik"
        },
        "14905" : {
          rookie: false,
          firstName: "D",
          lastName: "Williams",
          image: nflImageRoot+"qloiwle7db59cznhqhub"
        },
        "14806" : {
          rookie: false,
          firstName: "Byron",
          lastName: "Pringle",
          image: nflImageRoot+"qgwipkdsunodvqlumsmp"
        },
        "39276" : {
          rookie: false,
          firstName: "Jalani",
          lastName: "Woods",
          image: nflImageRoot+"qij1hvr17cgbcgmgxsdm"
        },
        "47929" : {
          rookie: false,
          firstName: "",
          lastName: "Hendershot",
          image: nflImageRoot+"c4755isxqphddzmqbejm"
        },
        "39094" : {
          rookie: false,
          firstName: "Kenny",
          lastName: "Pickett",
          image: nflImageRoot+"vbabaquryx2jw1uahay2"
        },
        "39110" : {
          rookie: false,
          firstName: "Breece",
          lastName: "Hall",
          image: nflImageRoot+"xcuixhewoo00o7frboye"
        },
        "44936" : {
          rookie: false,
          firstName: "C",
          lastName: "Okonkwo",
          image: nflImageRoot+"sxuawjrgawwilhceso3d"
        },
        "30450" : {
          rookie: false,
          firstName: "Travis",
          lastName: "Etienne",
          image: nflImageRoot+"d8xhoicgjybtyvttcxhu"
        },
        "39810" : {
          rookie: false,
          firstName: "Bailey",
          lastName: "Zappe",
          image: nflImageRoot+"iwpeibkv4p0ad6mxgjrq"
        },
        "39128" : {
          rookie: false,
          firstName: "Skyy",
          lastName: "Moore",
          image: nflImageRoot+"nkvb3cfmw6kzzwvu5egh"
        },
        "43337" : {
          rookie: false,
          firstName: "Tyler",
          lastName: "Allgeier",
          image: nflImageRoot+"osk8e6vpyxuzkrsalopb"
        },
        "43343" : {
          rookie: false,
          firstName: "I",
          lastName: "Pacheco",
          image: nflImageRoot+"s9suhdxobh0p5nbwxq8t"
        },
        "30140" : {
          rookie: false,
          firstName: "Deon",
          lastName: "Jackson",
          image: nflImageRoot+"baws2kukxj8wwdoskidg"
        },
        "43338" : {
          rookie: false,
          firstName: "Khalil",
          lastName: "Shakir",
          image: nflImageRoot+"qoltpowkukxjs5xtpn8a"
        },
        "44961" : {
          rookie: false,
          firstName: "Skylar",
          lastName: "Thompson",
          image: nflImageRoot+"kpyt5qpi4rh9bguzuorm"
        },
        "43374" : {
          rookie: false,
          firstName: "Chris",
          lastName: "Otton",
          image: nflImageRoot+"hqxroxrpcxjttwnuuqw7"
        },
        "32265" : {
          rookie: false,
          firstName: "Ben",
          lastName: "Skowronek",
          image: nflImageRoot+"hud5c4tf8corgoehrvc1"
        },
        "43350" : {
          rookie: false,
          firstName: "Rachaad",
          lastName: "White",
          image: nflImageRoot+"hls9krnjkudneprlkqxh"
        },
        "18691" : {
          rookie: false,
          firstName: "Eno",
          lastName: "Benjamin",
          image: nflImageRoot+"xvtbawgh0kycl6caxrb5"
        },
        "39115" : {
          rookie: false,
          firstName: "Kenneth",
          lastName: "Walker",
          image: nflImageRoot+"rwdj1bljth8fyojof5dp"
        },
        "39253" : {
          rookie: false,
          firstName: "Jaylen",
          lastName: "Warren",
          image: nflImageRoot+"q6zstqy99al3sghrufey"
        },
        "39137" : {
          rookie: false,
          firstName: "James",
          lastName: "Cook",
          image: nflImageRoot+"hh0bnf0lr6lzwyceorwj"
        },
        "43352" : {
          rookie: false,
          firstName: "Brian",
          lastName: "Robinson",
          image: nflImageRoot+"gxcfbuvmooytbn45kvxf"
        },
        "14728" : {
          rookie: false,
          firstName: "Dante",
          lastName: "Pettis",
          image: nflImageRoot+"j35nhxhisutf6pz38fzs"
        },
        "16333" : {
          rookie: false,
          firstName: "O",
          lastName: "Zaccheaus",
          image: nflImageRoot+"bzetcp5jlpis9ueb1kfk"
        },    
        "39124" : {
          rookie: false,
          firstName: "Tyquan",
          lastName: "Thornton",
          image: nflImageRoot+"bcmm5vukl8h6ow6ioemv"
        },
        "55455" : {
          rookie: false,
          firstName: "",
          lastName: "Shaheed",
          image: nflImageRoot+"rjgvutxutdp8l4jgfofo"
        },
        "39117" : {
          rookie: false,
          firstName: "WanDale",
          lastName: "Robinson",
          image: nflImageRoot+"znfhw1ep920xdrmiwy5t"
        },
        "44941" : {
          rookie: false,
          firstName: "Jake",
          lastName: "Ferguson",
          image: nflImageRoot+"i4rpp2rgrajl3az3j2kz"
        },
        "43340" : {
          rookie: false,
          firstName: "",
          lastName: "Dulcich",
          image: nflImageRoot+"jtnydhekjp1aznekq0cq"
        },
        "24446" : {
          rookie: false,
          firstName: "Juwan",
          lastName: "JOhnson",
          image: nflImageRoot+"kew8v8rgrtbefvnxpl0a"
        },
        "44949" : {
          rookie: false,
          firstName: "K",
          lastName: "Ingram",
          image: nflImageRoot+"bgdtcid9jk1tcnu9zylb"
        },
        "30210" : {
          rookie: false,
          firstName: "Shi",
          lastName: "Smith",
          image: nflImageRoot+"dreb8ikx3agnwicj9woi"
        },
        "13056" : {
          rookie: false,
          firstName: "PJ",
          lastName: "Walker",
          image: nflImageRoot+"cmuf0gtzectijxrktpg2"
        },
        "9772" : {
          rookie: false,
          firstName: "D",
          lastName: "Byrd",
          image: nflImageRoot+"splgnoyutrevuihhzszl"
        },
        "16101" : {
          rookie: false,
          firstName: "J",
          lastName: "Meyers",
          image: nflImageRoot+"lhfd2xsufgep72sfkacg"
        },
        "39757" : {
          rookie: false,
          firstName: "I",
          lastName: "Likely",
          image: nflImageRoot+"yim14kgskufmu8sfowvg"
        },
        "30933" : {
          rookie: false,
          firstName: "Terrace",
          lastName: "Marshall",
          image: nflImageRoot+"azlfs3xbnfr3deksqvua"
        },
        "30267" : {
          rookie: false,
          firstName: "Caleb",
          lastName: "Huntley",
          image: nflImageRoot+"xzzb2fcp1ovzekumnjga"
        },
        "8015" : {
          rookie: false,
          firstName: "R",
          lastName: "Mostert",
          image: nflImageRoot+"g6j057yduej7p98lk1br"
        },
        "14816" : {
          rookie: false,
          firstName: "D",
          lastName: "Hilliard",
          image: nflImageRoot+"ukhyslngeuojxkjqfq9f"
        },
        "12807" : {
          rookie: false,
          firstName: "Christian",
          lastName: "McCaffrey",
          image: nflImageRoot+"navqer4chxxut5povzzw"
        },
        "44956" : {
          rookie: false,
          firstName: "Malik",
          lastName: "Willis",
          image: nflImageRoot+"mbxvnzx6azveir76pbbu"
        },
        "7104" : {
          rookie: false,
          firstName: "Phillip",
          lastName: "Dorsett",
          image: nflImageRoot+"wta1whv8pvjhmndkrnxy"
        },
        "32247" : {
          rookie: false,
          firstName: "Sam",
          lastName: "Ehlinger",
          image: nflImageRoot+"vxk188efnro9zonnihdo"
        },
        "16786" : {
          rookie: false,
          firstName: "AJ",
          lastName: "Brown",
          image: nflImageRoot+"sb8stxfvnkedmhs6c1fx"
        },
        "13378" : {
          rookie: false,
          firstName: "A",
          lastName: "Ekeler",
          image: nflImageRoot+"tl0nhc7kyf4aumbyzs5b"
        },
        "6914" : {
          rookie: false,
          firstName: "A",
          lastName: "Rodgers",
          image: nflImageRoot+"gnta8ufi2vdp967dui9e"
        },
        "14706" : {
          rookie: false,
          firstName: "",
          lastName: "Gesicki",
          image: nflImageRoot+"mpichyoi6vdnhb7qte6c"
        },
        "16039" : {
          rookie: false,
          firstName: "David",
          lastName: "Montgomery",
          image: nflImageRoot+"grd20lxzonco9jyg3ful"
        },
        "7916" : {
          rookie: false,
          firstName: "D",
          lastName: "Carr",
          image: nflImageRoot+"cffbp9sqfioxa2jk2oqf"
        },
        "14498" : {
          rookie: false,
          firstName: "Josh",
          lastName: "Allen",
          image: nflImageRoot+"btfnqtymqsqgybnv4u6n"
        },
        "14523" : {
          rookie: false,
          firstName: "L",
          lastName: "Jackson",
          image: nflImageRoot+"gylnuxkxgm3zd4j0d0ku"
        },
        "13349" : {
          rookie: false,
          firstName: "Patrick",
          lastName: "Mahomes",
          image: nflImageRoot+"vs40h82nvqaqvyephwwu"
        },
        "10043" : {
          rookie: false,
          firstName: "D",
          lastName: "Henry",
          image: newNflImageRoot+"m7bv3lv9puapabltvykk"
        },
        "13255" : {
          rookie: false,
          firstName: "A",
          lastName: "Kamara",
          image: nflImageRoot+"uulstglrpmhqsvqyr5v3"
        },
        "7299" : {
          rookie: false,
          firstName: "T",
          lastName: "Kelce",
          image: nflImageRoot+"gorkhvipsk0gdqb6bo34"
        },
        "16035" : {
          rookie: false,
          firstName: "Miles",
          lastName: "Sanders",
          image: nflImageRoot+"vzctez3oxwdttiyukq18"
        },
        "12843" : {
          rookie: false,
          firstName: "Joe",
          lastName: "Mixon",
          image: nflImageRoot+"rd210pq6ch22vpoygtfn"
        },
        "12978" : {
          rookie: false,
          firstName: "Aaron",
          lastName: "Jones",
          image: nflImageRoot+"oo8yixhsahh4gznox7th"
        },
        "16034" : {
          rookie: false,
          firstName: "Josh",
          lastName: "Jacobs",
          image: newNflImageRoot+"ksdusqxnwqtnph0htcfx"
        },
        "13412" : {
          rookie: false,
          firstName: "Cooper",
          lastName: "Kupp",
          image: nflImageRoot+"tojsgl1ttwjkvo6x7wgy"
        },
        "8731" : {
          rookie: false,
          firstName: "K",
          lastName: "Cousins",
          image: newNflImageRoot+"yt6n07jezvfmcsoq0j13"
        },
        "16123" : {
          rookie: false,
          firstName: "DK",
          lastName: "Metcalf",
          image: nflImageRoot+"oa43ir8zoaiofwbupkrt"
        },
        "8296" : {
          rookie: false,
          firstName: "T",
          lastName: "Lockett",
          image: nflImageRoot+"kzytmhxcdxrakzklb6hw"
        }, 
        "16490" : {
          rookie: false,
          firstName: "Terry",
          lastName: "McLaurin",
          image: nflImageRoot+"bxkrzih9phr5abgabo7v"
        },
        "16226" : {
          rookie: false,
          firstName: "K",
          lastName: "Murray",
          image: nflImageRoot+"nkb9x92lbea6ayknzoba"
        },
        "13493" : {
          rookie: false,
          firstName: "C",
          lastName: "Godwin",
          image: nflImageRoot+"knfx1v1e3suxbuh9vlmj"
        },
        "8562" : {
          rookie: false,
          firstName: "M",
          lastName: "Evans",
          image: nflImageRoot+"pyilrqdmfvv1zceem1cg"
        },
        "13132" : {
          rookie: false,
          firstName: "Dalvin",
          lastName: "Cook",
          image: nflImageRoot+"gfwvqolvz9vegp1amhf3"
        },
        "14672" : {
          rookie: false,
          firstName: "Nick",
          lastName: "Chubb",
          image: nflImageRoot+"a8ib0haur75wrhqrbtyo"
        },
        "14493" : {
          rookie: false,
          firstName: "",
          lastName: "Barkley",
          image: newNflImageRoot+"ugiuanl8bf6uoya5mgid"
        },
        "16040" : {
          rookie: false,
          firstName: "",
          lastName: "Singletary",
          image: nflImageRoot+"d9ifpvw57zivczxlpxdh"
        },
        "16603" : {
          rookie: false,
          firstName: "D",
          lastName: "Jones",
          image: nflImageRoot+"af6nbjqa6qubnu8oi4ms"
        },
        "7551" : {
          rookie: false,
          firstName: "",
          lastName: "Garoppolo",
          image: nflImageRoot+"dielobmypljj7e27eiob"
        }, 
        "9845" : {
          rookie: false,
          firstName: "",
          lastName: "Prescott",
          image: nflImageRoot+"ofhu8bvafse5folcjzyu"
        },
        "16765" : {
          rookie: false,
          firstName: "",
          lastName: "Hardman",
          image: nflImageRoot+"s1lhxffk9f4e4lo201is"
        },
        "14515" : {
          rookie: false,
          firstName: "DJ",
          lastName: "Moore",
          image: nflImageRoot+"fuhd1intilojmnbx7wjq"
        },
        "16435" : {
          rookie: false,
          firstName: "",
          lastName: "Hockenson",
          image: nflImageRoot+"g4imuwyk1t2bfh4uuxtg"
        },
        "14846" : {
          rookie: false,
          firstName: "Jeff",
          lastName: "Wilson",
          image: nflImageRoot+"rq7a1zluwjhoxrsuhpgi"
        },
        "16600" : {
          rookie: false,
          firstName: "",
          lastName: "Slayton",
          image: nflImageRoot+"kmarbnrywxftriufi7m8"
        },
        "16843" : {
          rookie: false,
          firstName: "D",
          lastName: "Johnson",
          image: newNflImageRoot+"syk5xhvwikwmbaplpm8k"
        },
        "16143" : {
          rookie: false,
          firstName: "D",
          lastName: "Samuel",
          image: nflImageRoot+"ciwaktyqewczcquks4wy"
        },
        "14682" : {
          rookie: false,
          firstName: "",
          lastName: "Sutton",
          image: nflImageRoot+"wgjxc2paepihkvl4u9a3"
        },
        "18619" : {
          rookie: false,
          firstName: "L",
          lastName: "Shenault",
          image: nflImageRoot+"yohlrvcnnibrtfsc15t5"
        },
        "7478" : {
          rookie: false,
          firstName: "Adam",
          lastName: "Thielen",
          image: nflImageRoot+"kmldtl8p9h7h5dzvkwsw"
        },
        "16668" : {
          rookie: false,
          firstName: "P",
          lastName: "Campbell",
          image: nflImageRoot+"wwe99bwwendcfycnryyn"
        },
        "7368" : {
          rookie: false,
          firstName: "",
          lastName: "Tannehill",
          image: nflImageRoot+"ns30g7th6gkhjaeoivgj"
        },
        "14826" : {
          rookie: false,
          firstName: "",
          lastName: "Lazard",
          image: nflImageRoot+"blrzk3bfnpneuyhsqiqg"
        },
        "16054" : {
          rookie: false,
          firstName: "",
          lastName: "Knox",
          image: nflImageRoot+"ip13rlibbh1y7lejzj6t"
        },
        "13457" : {
          rookie: false,
          firstName: "",
          lastName: "Kittle",
          image: nflImageRoot+"znlqhc55l9zwi0euf1mk"
        },
        "16589" : {
          rookie: false,
          firstName: "T",
          lastName: "Pollard",
          image: nflImageRoot+"rvesbybzmlucxce3hkwf"
        },
        "14486" : {
          rookie: false,
          firstName: "M",
          lastName: "Andrews",
          image: nflImageRoot+"m1fmyihulvtdiav4bwxm"
        },
        "9839" : {
          rookie: false,
          firstName: "E",
          lastName: "Elliott",
          image: nflImageRoot+"eazag7iwciy9ari8hoju"
        },
        "13175" : {
          rookie: false,
          firstName: "S",
          lastName: "Perine",
          image: nflImageRoot+"zxgkgfxxsukpdfwyeauw"
        },
        "8199" : {
          rookie: false,
          firstName: "K",
          lastName: "Allen",
          image: nflImageRoot+"i1fgxnhxvwdusljchnsv"
        },
        "9922" : {
          rookie: false,
          firstName: "",
          lastName: "Higbee",
          image: nflImageRoot+"b6kn7vqe0iplpkgmzzv1"
        },
        "19009" : {
          rookie: false,
          firstName: "J",
          lastName: "Hasty",
          image: nflImageRoot+"qtjp84utne7uhgbtx0o5"
        },
        "12923" : {
          rookie: false,
          firstName: "",
          lastName: "McKenzie",
          image: nflImageRoot+"sm2btbgkg6s1r1hvi931"
        },
        "14679" : {
          rookie: false,
          firstName: "D",
          lastName: "Schultz",
          image: newNflImageRoot+"ooatvpu1knzypdmjljo9"
        },
        "18781" : {
          rookie: false,
          firstName: "",
          lastName: "Hinton",
          image: nflImageRoot+"jfkiipuusxstakvm94nw"
        },
        "12875" : {
          rookie: false,
          firstName: "",
          lastName: "Njoku",
          image: nflImageRoot+"bcecxpc9nciff80xhipd"
        },
        "9797" : {
          rookie: false,
          firstName: "T",
          lastName: "Boyd",
          image: nflImageRoot+"kzzhrm9gbefdpobngtzq"
        },
        "16624" : {
          rookie: false,
          firstName: "F",
          lastName: "Moreau",
          image: nflImageRoot+"sa6jfe7xjslhihldbiiy"
        },
        "39438" : {
          rookie: false,
          firstName: "B",
          lastName: "Purdy",
          image: nflImageRoot+"hdwbdlyiose4znenx5ed"
        },
        "12885" : {
          rookie: false,
          firstName: "N",
          lastName: "Brown",
          image: nflImageRoot+"mo0v6bxy9vpxtzndba7r"
        },
        "14680" : {
          rookie: false,
          firstName: "Royce",
          lastName: "Freeman",
          image: nflImageRoot+"omv74ajxzfk50f5te1mp"
        },
        "16697" : {
          rookie: false,
          firstName: "",
          lastName: "Rypien",
          image: nflImageRoot+"dk9b6nlydrbexyyoknoi"
        },
        "9914" : {
          rookie: false,
          firstName: "D",
          lastName: "Robinson",
          image: nflImageRoot+"ceqqkylismka583qo9kk"
        },
        "13027" : {
          rookie: false,
          firstName: "D",
          lastName: "Watson",
          image: nflImageRoot+"otfs2docj6eahaebo5xn"
        },

        "6133" : {
          rookie: false,
          firstName: "",
          lastName: "Waller",
          image: nflImageRoot+"qqzht46a66zbi9xyylf4"
        },
        "13398" : {
          rookie: false,
          firstName: "Mike",
          lastName: "Williams",
          image: newNflImageRoot+"g38aikrr9weo8h1xpehu"
        },
        "47386" : {
          rookie: false,
          firstName: "Bam",
          lastName: "Knight",
          image: nflImageRoot+"r035yqzubidox8tyvjwo"
        },
        "12831" : {
          rookie: false,
          firstName: "M",
          lastName: "Trubisky",
          image: nflImageRoot+"wx17o0eu4hffytrbdjgl"
        },
        "43384" : {
          rookie: false,
          firstName: "D",
          lastName: "Ridder",
          image: nflImageRoot+"ecsb4rwmhlotdjjhyaoq"
        },
        "30930" : {
          rookie: false,
          firstName: "Noah",
          lastName: "Gray",
          image: nflImageRoot+"bfwc5wzyawwhpwphz2hv"
        },
        "14725" : {
          rookie: false,
          firstName: "Dallas",
          lastName: "Goedert",
          image: nflImageRoot+"flzasty1ea7iswbtd0e5"
        },
        "7656" : {
          rookie: false,
          firstName: "",
          lastName: "Cooks",
          image: nflImageRoot+"wy6qidqm8jjp6buvu3lp"
        },
        "16042" : {
          rookie: false,
          firstName: "Alex",
          lastName: "Mattison",
          image: nflImageRoot+"kn3cwf59lqoyauoqmghm"
        },
        "9741" : {
          rookie: false,
          firstName: "A",
          lastName: "Hooper",
          image: nflImageRoot+"jp2z8s6pcanbitupycwc"
        },
        "39186" : {
          rookie: false,
          firstName: "S",
          lastName: "Howell",
          image: nflImageRoot+"inzmmlbrqwjjpjr2zsmd"
        },
        "9952" : {
          rookie: false,
          firstName: "M",
          lastName: "Thomas",
          image: nflImageRoot+"xtubqabso3s9fz5fouuj"
        },
        "14707" : {
          rookie: false,
          firstName: "",
          lastName: "Smythe",
          image: nflImageRoot+"bymp1mbuhxq4vbrwnof7"
        },
        "18736" : {
          rookie: false,
          firstName: "I",
          lastName: "Hodgins",
          image: nflImageRoot+"ae9jnxdsftbmvgwgtnug"
        },
        "13191" : {
          rookie: false,
          firstName: "Joshua",
          lastName: "Dobbs",
          image: nflImageRoot+"srtjkedldovmoxqdclaa"
        },
        "16360" : {
          rookie: false,
          firstName: "Irv",
          lastName: "Smith",
          image: nflImageRoot+"gvnnqr5kj0rtte3iw9mp"
        },
        "79772" : {
          rookie: false,
          firstName: "Sam",
          lastName: "LaPorta",
          image: nflImageRoot+"svqsmqhfemrnxcheh0ev"
        },
        "79746" : {
          rookie: false,
          firstName: "B",
          lastName: "Robinson",
          image: nflImageRoot+"gatvdlb0kch6kyhhpu4c"
        },
        "79739" : {
          rookie: false,
          firstName: "B",
          lastName: "Young",
          image: nflImageRoot+"knekunqi7nlnwgxnelb8"
        },
        "14517" : {
          rookie: false,
          firstName: "C",
          lastName: "Ridley",
          image: nflImageRoot+"jnknuowszoqaywqoopy7"
        },
        "79740" : {
          rookie: false,
          firstName: "C.J.",
          lastName: "Stroud",
          image: nflImageRoot+"u7g6u23cyjzpvayvwzhi"
        },
        "79742" : {
          rookie: false,
          firstName: "Anthony",
          lastName: "Richardson",
          image: nflImageRoot+"bqrc00wmzjbz1asoapvk"
        },
        "79817" : {
          rookie: false,
          firstName: "Josh",
          lastName: "Downs",
          image: nflImageRoot+"wdrwbumtvwv8s9te8wof"
        },
        "79788" : {
          rookie: false,
          firstName: "Jayden",
          lastName: "Reed",
          image: nflImageRoot+"hotj0rhtzqtfckgt7xue"
        },
        "79780" : {
          rookie: false,
          firstName: "Luke",
          lastName: "Musgrave",
          image: nflImageRoot+"myipiqsxzxonrcegrism"
        },
        "30936" : {
          rookie: false,
          firstName: "Tutu",
          lastName: "Atwell",
          image: nflImageRoot+"h0kk3mtoa4xwdw21lty9"
        },
        "108863" : {
          rookie: false,
          firstName: "",
          lastName: "Nacua",
          image: nflImageRoot+"br1ovzclyrebrec6q0mp"
        },
        "13467" : {
          rookie: false,
          firstName: "K",
          lastName: "Bourne",
          image: nflImageRoot+"vrovcaqql9p6xsycko83"
        },
        "79763" : {
          rookie: true,
          firstName: "D",
          lastName: "Kincaid",
          image: nflImageRoot+"gc2do3ceqflw2axa6xii"
        },
        "79750" : {
          rookie: false,
          firstName: "J",
          lastName: "Gibbs",
          image: nflImageRoot+"zv22khikt05uc5fzzby9"
        },
        "79853" : {
          rookie: false,
          firstName: "R",
          lastName: "Johnson",
          image: nflImageRoot+"oahmdtjp5ufvbk8dimws"
        },
        "39751" : {
          rookie: false,
          firstName: "K",
          lastName: "Williams",
          image: nflImageRoot+"emynpilqbr8huoh6vmhg"
        },
        "79826" : {
          rookie: false,
          firstName: "Tank",
          lastName: "Bigsby",
          image: nflImageRoot+"yndvsfcpy4ejgx9cnms3"
        },
        "79761" : {
          rookie: false,
          firstName: "Jordan",
          lastName: "Addison",
          image: nflImageRoot+"zhyhkz6wzwhioemhqgbk"
        },
        "79801" : {
          rookie: false,
          firstName: "Mar",
          lastName: "Mims Jr.",
          image: nflImageRoot+"ipelpuqkimvisda7pqem"
        },
        "79760" : {
          rookie: false,
          firstName: "Z",
          lastName: "Flowers",
          image: nflImageRoot+"zvstl5cycvmbbqczemau"
        },
        "112027" : {
          rookie: false,
          firstName: "T",
          lastName: "Dell",
          image: nflImageRoot+"vxkqythvtp5ujzpqlvsk"
        },
        "79777" : {
          rookie: false,
          firstName: "",
          lastName: "Mingo",
          image: nflImageRoot+"ie1yo3orpq0mqemptnko"
        },
        "13466" : {
          rookie: false,
          firstName: 'Matt',
          lastName: 'Breida',
          image: nflImageRoot+"rc4m1xw0xmtsrxswd0bg"
        },
        "79822" : {
          rookie: false,
          firstName: '',
          lastName: 'Achane',
          image: nflImageRoot+"ywxugcuxwj4msieu6n25"
        },
        "44946" : {
          rookie: false,
          firstName: '',
          lastName: 'Ford',
          image: nflImageRoot+"djggmwo5v8osoboiseo2"
        },
        "14849" : {
          rookie: false,
          firstName: 'G',
          lastName: 'Edwards',
          image: nflImageRoot+"tvxpivjku1lbpf7tfafl"
        },
        "14677" : {
          rookie: false,
          firstName: 'M',
          lastName: 'Gallup',
          image: nflImageRoot+"tt9xpcg4x2z3osc1fcq6"
        },
        "79832" : {
          rookie: false,
          firstName: 'M',
          lastName: 'Wilson',
          image: nflImageRoot+"o5sshsrygioektzjsahk"
        },
        "79819" : {
          rookie: false,
          firstName: 'T',
          lastName: 'Spears',
          image: nflImageRoot+"eeh5mowhlf3godvrceym"
        },
        "13330" : {
          rookie: false,
          firstName: 'K',
          lastName: 'Hunt',
          image: nflImageRoot+"fmy9cgin9nv7ewyhsipr"
        },
        "19004" : {
          rookie: false,
          firstName: '',
          lastName: 'Ahmed',
          image: nflImageRoot+"ggkz2vamnepagqfn992j"
        },
        "79773" : {
          rookie: false,
          firstName: 'M',
          lastName: 'Mayer',
          image: nflImageRoot+"nurmjov3hnrlietcywnm"
        },
        "112076" : {
          rookie: false,
          firstName: 'J',
          lastName: 'McLaughlin',
          image: nflImageRoot+"ba28phgfwcntbca7aoyh"
        },
        "16932" : {
          rookie: false,
          firstName: 'J',
          lastName: 'Hill',
          image: nflImageRoot+"v9xufmbbfauthnlpxcrc"
        },
        "133835" : {
          rookie: true,
          firstName: 'Caleb',
          lastName: 'Williams',
          image: newNflImageRoot+"idewrhb7kngpdtrvku31"
        },
        "133846" : {
          rookie: true,
          firstName: 'Bo',
          lastName: 'Nix',
          image: newNflImageRoot+"zibtvsprpauxnytis229"
        },
        "133986" : {
          rookie: true,
          firstName: 'S',
          lastName: 'Rattler',
          image: newNflImageRoot+"xhllpfkd4hrpbwczbca6"
        },
        "133880" : {
          rookie: true,
          firstName: 'Jonathan',
          lastName: 'Brooks',
          image: newNflImageRoot+"xo4zizexs7aezh1shgsv"
        },
        "133901" : {
          rookie: true,
          firstName: 'Trey',
          lastName: 'Benson',
          image: newNflImageRoot+"iu0gbspz3kjdqlazvtkn"
        },
        "133918" : {
          rookie: true,
          firstName: 'B',
          lastName: 'Corum',
          image: newNflImageRoot+"ehpbxs9iiosm4xs7nhnl"
        },
        "133840" : {
          rookie: true,
          firstName: 'M',
          lastName: 'Nabers',
          image: newNflImageRoot+"w3edoyyuomqlovvp9ixc"
        },
        "133843" : {
          rookie: true,
          firstName: 'R',
          lastName: 'Odunze',
          image: newNflImageRoot+"labs8tstecnehvzfmrs5"
        },
        // "133857" : {
        //   rookie: true,
        //   firstName: 'Brian',
        //   lastName: 'Thomas Jr.',
        //   image: newNflImageRoot+""
        // },
        "133862" : {
          rookie: true,
          firstName: 'X',
          lastName: 'Worthy',
          image: newNflImageRoot+"fvzbx5gpiqkogglyoo1w"
        },
        "133865" : {
          rookie: true,
          firstName: 'Ricky',
          lastName: 'Pearsall',
          image: newNflImageRoot+"akwepvt6qxwbgankljmv"
        },
        "133866" : {
          rookie: true,
          firstName: 'X',
          lastName: 'Legette',
          image: newNflImageRoot+"a3etuvp3kqtwmtkioq8g"
        },
        "133867" : {
          rookie: true,
          firstName: 'K',
          lastName: 'Coleman',
          image: newNflImageRoot+"ipwpdgb0cm3xy3d8zu1l"
        },
        "79771" : {
          rookie: false,
          firstName: 'W',
          lastName: 'Levis',
          image: newNflImageRoot+"vr01ufscgtoagtuut9o4"
        },
        "133838" : {
          rookie: true,
          firstName: 'M',
          lastName: 'Harrison Jr.',
          image: newNflImageRoot+"o6hg5zeofmxvzjjpo2sf"
        },
        "43344" : {
          rookie: false,
          firstName: 'Z',
          lastName: 'White',
          image: newNflImageRoot+"jpxuggpx567die5348be"
        },
        "79793" : {
          rookie: false,
          firstName: 'R',
          lastName: 'Rice',
          image: nflImageRoot+"zjgi60dvmj5ogvanp201"
        },
        "7471" : {
          rookie: false,
          firstName: 'S',
          lastName: 'Diggs',
          image: newNflImageRoot+"to2qwuffjnjlouctglsl"
        },
 
      }
   }

   public getTeamGamelogs(gamelogs, schedules, gamesByID) {
      //TODO: add the gamelog by id, check if week already have
      console.log('getting game stats for games to save in nflTeamSchedules')
      for (let sItem of schedules) {
        for (let s of sItem.games) {
          let homeToTD = null
          let awayToTD = null

          let gameObj = { 
            gameID: null,
            awayStats: null,
            homeStats: null,
            awayToTD: null,
            homeToTD: null,
            homeTeam: null,
            awayTeam: null,
            week: null,
            belongsToID: null,
          }

          for (let [index, gItem] of gamelogs.entries()) {
            if (gItem.game.id === s.schedule.id) {
                gameObj.gameID = gItem.game.id
                gameObj.week = gItem.game.week
                gameObj.awayTeam = gItem.game.awayTeamAbbreviation
                gameObj.homeTeam = gItem.game.homeTeamAbbreviation
                gameObj.belongsToID = gItem.team.id

              if (gItem.team.id === s.schedule.awayTeam['id']) {

                awayToTD = gItem.stats.interceptions.intTD + gItem.stats.fumbles.fumTD
                gameObj.awayStats = gItem.stats
                gameObj.awayToTD = awayToTD
                
              } else if (gameObj.belongsToID != s.schedule.awayTeam['id'] && gameObj.homeTeam === s.schedule.homeTeam['abbreviation']) {
 
                homeToTD = gItem.stats.interceptions.intTD + gItem.stats.fumbles.fumTD
                gameObj.homeStats = gItem.stats
                gameObj.homeToTD = homeToTD  

              }

              if(gameObj.homeStats != null && gameObj.awayStats != null)
                gamesByID.push(gameObj)
            }
          }
        }        
      }   
   }

   public statsToSched(schedules, gamesByID) {
     console.log('apply TO stats to teams')
    if (gamesByID.length === 0) {
      console.log('gamesByID is empty')
      return
    } else {
      for (let sItem of schedules) {
        for (let [index, g] of gamesByID.entries()) {
          for(let s of sItem.games) {
            if (g.gameID === s.schedule.id) {
              if (g.awayTeam === s.schedule.awayTeam['abbreviation']) {
                s.awayStats = g.awayStats
                s.awayToTD = g.awayToTD
              }
              
              if (g.homeTeam === s.schedule.homeTeam['abbreviation']) {
                s.homeStats = g.homeStats
                s.homeToTD = g.homeToTD
              }
            }
          }
        }
      }
    }
    console.log('gamesBYID', gamesByID)
   }

   public updateTeamStats(tStats) {
    console.log('update nfl team stats')
    for (let stats of tStats) {
      for (let team of this.nflTeams) {
        if (stats.team.id === team.id) {
          stats.bye = team.bye;
          team.snaps = stats.stats.snapCounts.offenseSnaps
          team.plays = stats.stats.rushing.rushAttempts + stats.stats.passing.passAttempts
          team.passPlays = stats.stats.passing.passAttempts;
          team.runPlays = stats.stats.rushing.rushAttempts;
          stats.upDefRank = team.defenseRankLs
          stats.upOffRank = team.offenseRankLs

          team.sTeamStats = stats;
          team.seasonPY = stats.stats.passing.passNetYards;
          team.seasonRY = stats.stats.rushing.rushYards;
          team.ty = team.seasonPY + team.seasonRY;
          team.seasonPlays = stats.stats.rushing.rushAttempts + stats.stats.passing.passAttempts;
          team.seasonPassPlays = stats.stats.passing.passAttempts;
          team.seasonRunPlays = stats.stats.rushing.rushAttempts;
        }
      }
    }
   }

  public updateDefRank(tStats) {
    console.log('update def rank')
    for (let stats of tStats) {
      for (let team of this.nflTeams) {
        if (stats.team.id === team.id) {
          stats.upDefRank = team.defenseRankLs
          stats.upOffRank = team.offenseRankLs
        }
      }
    }
   }

   public updateTicker(tStats) {
    console.log('update schedule ticker def rank')
      for (let team of this.nflTeams) {
        try {
          for (let game of team?.scheduleTicker != null ? team?.scheduleTicker : []) {
            for (let stats of tStats) {
              if (stats.team.abbreviation === game.name)  {
                game['dRank'] = stats.upDefRank
                game['oRank'] = stats.upOffRank
              }
            }
          }
        } catch(e) {
          console.log(e, 'the web is having trouble defining the schedule ticker.')
        }  
      }
   }

   public updateWop(tStats) {
    console.log('update week opponent def and off rank')
      for (let team of this.nflTeams) {
        try {
          for (let game of team?.weekOpponent != null ? team?.weekOpponent : []) {
            for (let stats of tStats) {
              if (stats.team.abbreviation === game.name)  {
                game['dRank'] = stats.upDefRank
                game['oRank'] = stats.upOffRank
              }
            }
          }
        } catch(e) {
          console.log(e, 'the web is having trouble defining the week opponent.')
        }  
      }
   }

   public superUpdater(tSchedules) {
     console.log('one last super def rank update because I had to calculate pointsAgainst before I could properly rank and by doing so it screwed up my whole ranking algo which needs refactoring.')
    for (let team of tSchedules) {
      team.dToughnessRank = this.dToughness(team['schedule'], 'd', team.team)  
      team.dToughnessFhRank = this.dToughness(team['schedule'], 'dfh', team.team)
      team.dToughnessShRank = this.dToughness(team['schedule'], 'dsh', team.team)
      team.oToughnessRank = this.oToughness(team['schedule'], 'o', team.team)  
      team.oToughnessFhRank = this.oToughness(team['schedule'], 'ofh', team.team)
      team.oToughnessShRank = this.oToughness(team['schedule'], 'osh', team.team)
    }
    this.getRank(tSchedules)
   }

   public updateTeamWeek(tStats) {
    for (let stats of tStats) {
      for (let team of this.nflTeams) {
        if (stats.team.id === team.id) {
          stats.bye = team.bye;
          team.plays = stats.stats.rushing.rushAttempts + stats.stats.passing.passAttempts
          team.passPlays = stats.stats.passing.passAttempts
          team.runPlays = stats.stats.rushing.rushAttempts
        }
      }
    }
   }

  public updateBye(scheds) {
    for (let s of scheds) {
      for (let b of s.teamByeWeeks){
        if (s.gamesBelongId === b.team.id) {
         s.bye = b.byeWeeks[0]
        }
      }
    }
  }

   public winsLosses(aScore: number, hScore: number, week: number, isHome: boolean, wlObj) {

     if (aScore == null) 
       return wlObj

     if (aScore === hScore) {
      wlObj.fhT += 1
      wlObj.shT += 1
      return wlObj
     }
    
     if(!isHome) {

       if (week < 10) {
        wlObj.fhL += aScore < hScore ? 1 : 0
        wlObj.fhW += aScore > hScore ? 1 : 0
        
       } else if (week > 9) {
        wlObj.shL +=  aScore < hScore ? 1 : 0
        wlObj.shW += aScore > hScore ? 1 : 0
       }

       return wlObj
       
     } else {

       if (week < 10) {
        wlObj.fhL += aScore > hScore ? 1 : 0
        wlObj.fhW +=  aScore < hScore ? 1 : 0
        
       } else if (week > 9) {
        wlObj.shL += aScore > hScore ? 1 : 0
        wlObj.shW += aScore < hScore ? 1 : 0
      }

      return wlObj

     }
   }

   public dToughness(sched, type, mainTeam) {
    let halfwayThrough = Math.floor(sched.length / 2)
    let arrayFirstHalf = sched.slice(0, halfwayThrough)
    let arraySecondHalf = sched.slice(halfwayThrough, sched.length)

    if (type === 'd') {
      let sum = 0;
      for (let s of sched) {
        for (let t of this.nflTeams){
          if (s.schedule.awayTeam.id != mainTeam &&
            s.schedule.awayTeam.id === t.id || 
            s.schedule.homeTeam.id != mainTeam &&
            s.schedule.homeTeam.id === t.id) {
            sum += t.defenseRankLs
          }
        }
      }
      return sum
    } else if (type === 'dfh') {
      let sum = 0;
      for (let s of arrayFirstHalf) {
        for (let t of this.nflTeams){
          if (s.schedule.awayTeam.id != mainTeam &&
            s.schedule.awayTeam.id === t.id || 
            s.schedule.homeTeam.id != mainTeam &&
            s.schedule.homeTeam.id === t.id) {
            sum += t.defenseRankLs;
          }
        }
      }
      return sum
    } else if (type === 'dsh') {
      let sum = 0;
      for (let s of arraySecondHalf) {
        for (let t of this.nflTeams){
          if (s.schedule.awayTeam.id != mainTeam &&
            s.schedule.awayTeam.id === t.id || 
            s.schedule.homeTeam.id != mainTeam &&
            s.schedule.homeTeam.id === t.id) {
            sum += t.defenseRankLs;
          }
        }
      }
      return sum
    }
 }

   public oToughness(sched, type, mainTeam) {
      let halfwayThrough = Math.floor(sched.length / 2)
      let arrayFirstHalf = sched.slice(0, halfwayThrough)
      let arraySecondHalf = sched.slice(halfwayThrough, sched.length)

      if (type === 'o') {
        let sum = 0
        for (let s of sched) {
          for (let t of this.nflTeams){
            if (s.schedule.awayTeam.id != mainTeam &&
              s.schedule.awayTeam.id === t.id || 
              s.schedule.homeTeam.id != mainTeam &&
              s.schedule.homeTeam.id === t.id) {
              sum += t.offenseRankLs
            }
          }
        }
        return sum
      } else if (type === 'ofh') {
        let sum = 0;
        for (let s of arrayFirstHalf) {
          for (let t of this.nflTeams){
            if (s.schedule.awayTeam.id != mainTeam &&
              s.schedule.awayTeam.id === t.id || 
              s.schedule.homeTeam.id != mainTeam &&
              s.schedule.homeTeam.id === t.id) {
              sum += t.offenseRankLs;
            }
          }
        }
        return sum
      } else if (type === 'osh') {
        let sum = 0;
        for (let s of arraySecondHalf) {
          for (let t of this.nflTeams){
            if (s.schedule.awayTeam.id != mainTeam &&
              s.schedule.awayTeam.id === t.id || 
              s.schedule.homeTeam.id != mainTeam &&
              s.schedule.homeTeam.id === t.id) {
              sum += t.offenseRankLs;
            }
          }
        }
        return sum
      }
   }

   public getSchedToughness(sched, type, mainTeam, bye, nflWeek) {
     if (type === 't') {
      let sum = []
      //console.log('points against sum starts here')
      let toTDTotal = 0
      let paTotal = 0
      let pickSixTotal = 0
      let ryGivenUpTotal = 0
      let rTDGivenUpTotal = 0 
      let wlObject: object = {fhW: 0, fhL: 0, shW: 0, shL: 0, fhT: 0, shT: 0}
      let finishedWlObject = null
      sched.forEach((s, index) => {
        let paDefFP = null
        let turnOverTD = null
        let pickSix = null
        let safetie = null
        let rushYardsAgainst = null
        let rushTDAgainst = null
        for (let t of this.nflTeams){
          if (s.schedule.homeTeam.id != mainTeam &&
            s.schedule.homeTeam.id === t.id) {
            if (index+1 === bye) sum.push({printName: 'BYE ', oRank: 'BYE', dRank: 'BYE', name: bye})
            //calculate how many TDs were from offense tunrover such as interception or fumble or safties
            //console.log(s.homeStats, 'home stats')
            rushYardsAgainst = s.homeStats != null ? s.homeStats.rushing.rushYards : 0
            rushTDAgainst = s.homeStats != null ? s.homeStats.rushing.rushTD : 0
            pickSix = s.homeStats != null ? s.homeStats.interceptions.intTD : 0
            safetie = s.homeStats != null ? s.homeStats.interceptions.safeties * 2 : 0
            turnOverTD = s.homeToTD != null ? s.homeToTD * 6 : 0
            turnOverTD = turnOverTD + safetie
            s.score.homeScoreTotal - turnOverTD
            //get first-half record and second-half record
            finishedWlObject = this.winsLosses(s.score.awayScoreTotal, s.score.homeScoreTotal, s.schedule.week, false, wlObject)
            //TODO: get rec yards allowed, rush yards allowed, pass yards allowed and TDs 
            //to calculate different defense ranks by position
            
            paDefFP = (s.score.homeScoreTotal == null ? 0 : s.score.homeScoreTotal === 0 ? 10 : s.score.homeScoreTotal > 0 && s.score.homeScoreTotal < 7 ? 7 : s.score.homeScoreTotal > 6 && s.score.homeScoreTotal < 14 ? 4 : s.score.homeScoreTotal > 13 && s.score.homeScoreTotal < 21 ? 1 : s.score.homeScoreTotal > 20 && s.score.homeScoreTotal < 28 ? 0 : s.score.homeScoreTotal > 27 && s.score.homeScoreTotal < 35 ? -1 : -4)
            sum.push({printName: '@'+t.abbreviation+' ', oRank: t.offenseRankLs, dRank: t.defenseRankLs, name: t.abbreviation, result: (s.score.awayScoreTotal == null ? '' : s.score.awayScoreTotal === s.score.homeScoreTotal ? 'T' : s.score.awayScoreTotal < s.score.homeScoreTotal ? 'L' : 'W'), score: (s.score.awayScoreTotal == null ? '' : s.score.awayScoreTotal+'-'+s.score.homeScoreTotal), paDefenseFP: paDefFP, paTotal: paTotal += paDefFP, toTDTotal: toTDTotal += turnOverTD, pickSixTotal: pickSixTotal += pickSix, ryGivenUpTotal: ryGivenUpTotal += rushYardsAgainst, rTDGivenUpTotal: rTDGivenUpTotal += rushTDAgainst})
          } else if (s.schedule.awayTeam.id != mainTeam &&
            s.schedule.awayTeam.id === t.id) {
            if (index+1 === bye) sum.push({printName: 'BYE ', oRank: 'BYE', dRank: 'BYE', name: bye})
            rushYardsAgainst = s.awayStats != null ? s.awayStats.rushing.rushYards : 0
            rushTDAgainst = s.awayStats != null ? s.awayStats.rushing.rushTD : 0
            pickSix = s.awayStats != null ? s.awayStats.interceptions.intTD : 0
            safetie = s.awayStats != null ? s.awayStats.interceptions.safeties * 2 : 0
            turnOverTD = s.awayToTD != null ? s.awayToTD * 6 : 0
            turnOverTD = turnOverTD + safetie
            s.score.awayScoreTotal - turnOverTD
            finishedWlObject = this.winsLosses(s.score.awayScoreTotal, s.score.homeScoreTotal, s.schedule.week, true, wlObject)

            paDefFP = (s.score.awayScoreTotal == null ? 0 : s.score.awayScoreTotal === 0 ? 10 : s.score.awayScoreTotal > 0 && s.score.awayScoreTotal < 7 ? 7 : s.score.awayScoreTotal > 6 && s.score.awayScoreTotal < 14 ? 4 : s.score.awayScoreTotal > 13 && s.score.awayScoreTotal < 21 ? 1 : s.score.awayScoreTotal > 20 && s.score.awayScoreTotal < 28 ? 0 : s.score.awayScoreTotal > 27 && s.score.awayScoreTotal < 35 ? -1 : -4)
            sum.push({printName: 'vs'+t.abbreviation+' ', oRank: t.offenseRankLs, dRank: t.defenseRankLs, name: t.abbreviation, result: (s.score.homeScoreTotal == null ? '' : s.score.awayScoreTotal === s.score.homeScoreTotal ? 'T' : s.score.homeScoreTotal < s.score.awayScoreTotal ? 'L': 'W'), score: (s.score.homeScoreTotal == null ? '' : s.score.homeScoreTotal+'-'+s.score.awayScoreTotal), paDefenseFP: paDefFP, paTotal: paTotal += paDefFP, toTDTotal: toTDTotal += turnOverTD, pickSixTotal: pickSixTotal += pickSix, ryGivenUpTotal: ryGivenUpTotal += rushYardsAgainst, rTDGivenUpTotal: rTDGivenUpTotal += rushTDAgainst})
          }
        }
      })

      sum['paTotal'] = paTotal
      sum['ryGivenUpTotal'] = ryGivenUpTotal
      sum['rTDGivenUpTotal'] = rTDGivenUpTotal
      sum['pickSixTotal'] = pickSixTotal
      sum['toTDTotal'] = toTDTotal
      sum['finishedWlObject'] = finishedWlObject
      //first-half win loss record
      sum['fhWin'] = finishedWlObject['fhW']
      sum['fhLoss'] = finishedWlObject['fhL']
      sum['fhTie'] = finishedWlObject['fhT']
      //second-half win loss record
      sum['shWin'] = finishedWlObject['shW']
      sum['shLoss'] = finishedWlObject['shL']
      sum['shTie'] = finishedWlObject['shT']
      return sum
    } else if (type === 'wop') {
      let sum = [];
      sched.forEach((s, index) => {
        for (let t of this.nflTeams){
          if (s.schedule.homeTeam.id != mainTeam &&
            s.schedule.homeTeam.id === t.id && s.schedule.week == nflWeek) {
            //if (index+1 === bye) sum.push({printName: 'BYE ', oRank: 'BYE', dRank: 'BYE', name: bye}); 
            sum.push({printName: '@'+t.abbreviation+' ', oRank: t.offenseRankLs, dRank: t.defenseRankLs, name: t.abbreviation});
          } else if (s.schedule.awayTeam.id != mainTeam &&
            s.schedule.awayTeam.id === t.id && s.schedule.week == nflWeek) {
            //if (index+1 === bye) sum.push({printName: 'BYE ', oRank: 'BYE', dRank: 'BYE', name: bye}); 
            sum.push({printName: 'vs'+t.abbreviation+' ', oRank: t.offenseRankLs, dRank: t.defenseRankLs, name: t.abbreviation});
          } else if (index+1 === bye && bye === parseInt(nflWeek)){ 
            sum.push({printName: 'BYE ', oRank: 1, dRank: 1, name: bye});
          }
        }
      })
      return sum
    } 
  }

  public getRank(schedules) {
    //console.log('schedules', schedules)
    let rank = [];
    let rank2 = [];
    let rankDfh = [];
    let rankOfh = [];
    let rankDsh = [];
    let rankOsh = [];

    if (this.nflTeams && schedules.length > 0) {

      rank = schedules.slice().sort((a: any, b: any) => {    
        if (a['dToughnessRank'] 
        <= b['dToughnessRank']) {
          return -1;
        } else if (a['dToughnessRank']
        >= b['dToughnessRank']) {
          return 1;
        } else {
          return 0;
        }
      });

      rank.forEach(async (item, index) => {
        for (let team of this.nflTeams) {
          if (rank[index].team === team.id) { 
            team.dtr = index + 1;
          }         
        }
      });

      rank2 = schedules.slice().sort((a: any, b: any) => {    
        if (a['oToughnessRank'] 
        <= b['oToughnessRank']) {
          return -1;
        } else if (a['oToughnessRank']
        >= b['oToughnessRank']) {
          return 1;
        } else {
          return 0;
        }
      });

      rank2.forEach(async (item, index) => {
        for (let team of this.nflTeams) {
          if (rank2[index].team === team.id) { 
            team.otr = index + 1
          }         
        }
      });

      rankDfh = schedules.slice().sort((a: any, b: any) => {    
        if (a['dToughnessFhRank'] 
        <= b['dToughnessFhRank']) {
          return -1;
        } else if (a['dToughnessFhRank']
        >= b['dToughnessFhRank']) {
          return 1;
        } else {
          return 0;
        }
      });

      rankDfh.forEach(async (item, index) => {
        for (let team of this.nflTeams) {
          if (rankDfh[index].team === team.id) { 
            team.dfh = index + 1;
          }         
        }
      });

      rankOfh = schedules.slice().sort((a: any, b: any) => {    
        if (a['oToughnessFhRank'] 
        <= b['oToughnessFhRank']) {
          return -1;
        } else if (a['oToughnessFhRank']
        >= b['oToughnessFhRank']) {
          return 1;
        } else {
          return 0;
        }
      });

      rankOfh.forEach(async (item, index) => {
        for (let team of this.nflTeams) {
          if (rankOfh[index].team === team.id) { 
            team.ofh = index + 1;
          }         
        }
      });

      rankDsh = schedules.slice().sort((a: any, b: any) => {    
        if (a['dToughnessShRank'] 
        <= b['dToughnessShRank']) {
          return -1;
        } else if (a['dToughnessShRank']
        >= b['dToughnessShRank']) {
          return 1;
        } else {
          return 0;
        }
      });

      rankDsh.forEach(async (item, index) => {
        for (let team of this.nflTeams) {
          if (rankDsh[index].team === team.id) { 
            team.dsh = index + 1;
          }         
        }
      });

      rankOsh = schedules.slice().sort((a: any, b: any) => {    
        if (a['oToughnessShRank'] 
        <= b['oToughnessShRank']) {
          return -1;
        } else if (a['oToughnessShRank']
        >= b['oToughnessShRank']) {
          return 1;
        } else {
          return 0;
        }
      });

      rankOsh.forEach(async (item, index) => {
        for (let team of this.nflTeams) {
          if (rankOsh[index].team === team.id) { 
            team.osh = index + 1
          }         
        }
      })

        schedules.forEach((item, index) => {
          for (let team of this.nflTeams) {
            if (schedules[index].team === team.id) { 
              team.dToughnessRank = schedules[index].dToughnessRank;
              team.oToughnessRank = schedules[index].oToughnessRank;
              team.scheduleTicker = schedules[index]?.scheduleTicker != null ? schedules[index]?.scheduleTicker : []
              team.dToughnessFhRank = schedules[index].dToughnessFhRank;
              team.oToughnessFhRank = schedules[index].oToughnessFhRank;
              team.dToughnessShRank = schedules[index].dToughnessShRank;
              team.oToughnessShRank = schedules[index].oToughnessShRank;
              team.weekOpponent = schedules[index].weekOpponent;
            }
          }
        })
    }
  }

  public sortSchedules(schedules, week, schedGames) {
    console.log('this should only call one time')
    if (schedules.length === 0) {
      let team: any;
      let bye: any;
      let abbreviation: any;
      let teamSchedule: { 
        team: any,
        abbreviation: any,
        schedule: any,
        dToughnessRank: any,
        oToughnessRank: any,
        dToughnessFhRank: any,
        oToughnessFhRank: any,
        dToughnessShRank: any,
        oToughnessShRank: any, 
        scheduleTicker: any,
        weekOpponent: any
      }
        let res = schedGames
        res.forEach((item, index) => { 
          team = item.gamesBelongId //this.nflTeams[index].id
          //TODO create bye func and refactor winloss
          //getByes()
          bye = team === item.byes[index].team['id'] ? item.byes[index].byeWeeks[0] : item.bye //this.nflTeams[index].bye
          abbreviation = item.gamesBelongTo //this.nflTeams[index].abbreviation
          teamSchedule = {
            team: team,
            abbreviation: abbreviation,
            schedule: res[index]['games'],
            dToughnessRank: null,
            oToughnessRank: null,
            dToughnessFhRank: null,
            oToughnessFhRank: null,
            dToughnessShRank: null,
            oToughnessShRank: null,
            scheduleTicker: this.getSchedToughness(res[index]['games'], 't', team, bye, week),
            weekOpponent: this.getSchedToughness(res[index]['games'], 'wop', team, bye, week)
          }
          schedules.push(teamSchedule)
          //this.getRank(schedules)
        })
    }
  }

  public rank(nflTeams, stats, week) {
    let rankO = []
    console.log('getting offense rank')
    rankO = stats.slice().sort((a: any, b: any) => {
      if ((parseInt(a['stats'].receiving.teamFDFP) + (parseInt(week) < 15 && a.bye < parseInt(week) ? parseInt(a['stats'].receiving.teamFDFPA) : 0))
      >= (parseInt(b['stats'].receiving.teamFDFP) + (parseInt(week) < 15 && b.bye < parseInt(week) ? parseInt(b['stats'].receiving.teamFDFPA) : 0))) {
        return -1;
      } else if ((parseInt(a['stats'].receiving.teamFDFP) + (parseInt(week) < 15 && a.bye < parseInt(week) ? parseInt(a['stats'].receiving.teamFDFPA) : 0))
      <= (parseInt(b['stats'].receiving.teamFDFP) + (parseInt(week) < 15 && b.bye < parseInt(week) ? parseInt(b['stats'].receiving.teamFDFPA) : 0))) {
        return 1;
      } else {
        return 0;
      }
    })

    rankO.forEach((item, index) => {
      for (let team of nflTeams) {
      if (rankO[index].team.id === team.id) {
        team.offenseRankLs = index + 1 
        team.oRank = index + 1 
        team.stats = rankO[index].stats
      }
      }
    })
}

public rankD(nflTeams, stats, week) {
  let rankD = []
  console.log('getting def rank')
  rankD = stats.slice().sort((a: any, b: any) => {
    if ((a['stats'].receiving.teamDefFDFP + (parseInt(week) < 15 && a.bye < parseInt(week) ? a['stats'].receiving.teamDefFDFPA : 0)) 
    >= (b['stats'].receiving.teamDefFDFP + (parseInt(week) < 15 && b.bye < parseInt(week) ? b['stats'].receiving.teamDefFDFPA : 0))) {
      return -1;
    } else if ((a['stats'].receiving.teamDefFDFP + (parseInt(week) < 15 && a.bye < parseInt(week) ? a['stats'].receiving.teamDefFDFPA : 0))  
    <= (b['stats'].receiving.teamDefFDFP + (parseInt(week) < 15 && b.bye < parseInt(week) ? b['stats'].receiving.teamDefFDFPA : 0))) {
      return 1;
    } else {
      return 0;
    }
  })

  rankD.forEach((item, index) => {
    for (let team of nflTeams) {
    if (rankD[index].team.id === team.id) { 
      team.defenseRankLs = index + 1
      team.dRank = index + 1
      team.stats = rankD[index].stats
    }
    }
  })
}

  public getNFLImages() {
    return this.NFLImages;
  }

  public getNFLTeams() {
    return this.nflTeams;
  }

  public getWeekTimes() {
    return this.weekTimes;
  }

  public teamFp(teams, stats) { 
    for(let team of stats) {
      for (let t of teams) {
        if (team['team'].id === t.id) {
          team['stats'].receiving.teamFDFP = (team['stats'].receiving != null && team['stats'].twoPointAttempts != null) ? ((team['stats'].twoPointAttempts.twoPtPassMade + team['stats'].twoPointAttempts.twoPtRushMade * 2) + (team['stats'].fumbles.fumTD * 6) + (team['stats'].passing.passTD * 4) + (team['stats'].passing.passNetYards * 0.04) + (team['stats'].receiving.receptions * 0.5) + (team['stats'].receiving.recTD * 6) + (team['stats'].receiving.recYards * 0.1) + (team['stats'].rushing.rushTD * 6) + (team['stats'].rushing.rushYards * 0.1) + (team['stats'].extraPointAttempt.xpMade) + (team['stats'].fieldGoals.fgMade1_19 + team['stats'].fieldGoals.fgMade20_29 + team['stats'].fieldGoals.fgMade30_39 * 3) + (team['stats'].fieldGoals.fgMade40_49 * 4) + (team['stats'].fieldGoals.fgMade50Plus * 5) - ((team['stats'].fumbles.fumLost * 2) + (team['stats'].passing.passInt))).toFixed(2) : 0
          team['stats'].receiving.teamFDFPA = (parseInt(team['stats'].receiving.teamFDFP) / team['stats'].gamesPlayed).toFixed(1) 
          team['stats'].receiving.defTD = team['stats'].fumbles.fumTD + team['stats'].interceptions.intTD + team['stats'].puntReturns.prTD + team['stats'].kickoffReturns.krTD
        }
      }
    } 
  }

  public teamNflDefFp(teams, stats) { 
    console.log('define pointsAgainstDefTotal for ui')
    let paTot = null
    let toTot = null
    let p6Tot = null
    let ryaTot = null
    let rTDaTot = null
    //console.log('define teamDefFDFP for ui but its NaN because pointsAgainstDefTotal is undefined', teams)
    for(let team of stats) {
      for (let t of teams) {
        if (team['team'].id === t.id) {
          try {
            paTot = t['scheduleTicker']?.paTotal != null ? t['scheduleTicker']?.paTotal : 0
            toTot = t['scheduleTicker']?.toTDTotal != null ? t['scheduleTicker']?.toTDTotal : 0
            p6Tot = t['scheduleTicker']?.pickSixTotal != null ? t['scheduleTicker']?.pickSixTotal : 0
            ryaTot = t['scheduleTicker']?.ryGivenUpTotal != null ? t['scheduleTicker']?.ryGivenUpTotal : 0
            rTDaTot = t['scheduleTicker']?.rTDGivenUpTotal != null ? t['scheduleTicker']?.rTDGivenUpTotal : 0
          } catch(e) {
            console.log(e, 'Totals not ready yet')
          }
          team['stats'].receiving.teamDefFDFP = (team['stats'].receiving != null) ? (((team['stats'].punting.puntBlk + team['stats'].fieldGoals.fgBlk + team['stats'].fumbles.fumOppRec + team['stats'].interceptions.interceptions + team['stats'].interceptions.safeties) * 2) + ((team['stats'].puntReturns.prTD + team['stats'].kickoffReturns.krTD) * 6) + ((team['stats'].fumbles.fumTD + team['stats'].interceptions.intTD) * 6) + team['stats'].tackles.sacks + paTot) : 0
          team['stats'].receiving.teamDefFDFPA = (parseInt(team['stats'].receiving.teamDefFDFP) / team['stats'].gamesPlayed).toFixed(1) 
          team['stats'].pointsAgainstDefTotal = paTot
          team['stats'].toTDTotal = toTot
          team['stats'].pickSixTotal = p6Tot
          team['stats'].rushYdsAgainst = ryaTot
          team['stats'].rushTDAgainst = rTDaTot
        }
      }
    } 
  }

  public offenseFp(player) {  
    if (player.player.primaryPosition != 'K' && player.stats.receiving != null) {
      player.stats.receiving.fanDuelFP = (player.stats.gamesPlayed > 0 && player.stats.twoPointAttempts != null || player.stats.receiving != null && player.stats.twoPointAttempts != null) ? ((player.stats.twoPointAttempts.twoPtPassMade + player.stats.twoPointAttempts.twoPtPassRec + player.stats.twoPointAttempts.twoPtRushMade * 2) - (player.stats.fumbles.fumLost * 2) + (player.stats.fumbles.fumTD * 6) - (player.stats.passing.passInt) + (player.stats.kickoffReturns.krTD * 6) + (player.stats.puntReturns.prTD * 6) + (player.stats.passing.passTD * 4) + (player.stats.passing.passYards * 0.04) + (player.stats.receiving.receptions * 0.5) + (player.stats.receiving.recTD * 6) + (player.stats.receiving.recYards * 0.1) + (player.stats.rushing.rushTD * 6) + (player.stats.rushing.rushYards * 0.1)).toFixed(2) : 0
      player.stats.receiving.fanDuelFPA = player.stats.gamesPlayed > 0 ? (parseInt(player.stats.receiving.fanDuelFP) / player.stats.gamesPlayed).toFixed(1) : 0
    } 
    
    if (player.player.primaryPosition === 'K' && player.stats.fieldGoals != null) {
      player.stats.fieldGoals.fanDuelFP = (player.stats.gamesPlayed > 0 || player.stats.fieldGoals != null) ? ((player.stats.extraPointAttempts.xpMade) + (player.stats.fieldGoals.fgMade1_19 + player.stats.fieldGoals.fgMade20_29 + player.stats.fieldGoals.fgMade30_39 * 3) + (player.stats.fieldGoals.fgMade40_49 * 4) + (player.stats.fieldGoals.fgMade50Plus * 5)).toFixed(2) : 0;
      player.stats.fieldGoals.fanDuelFPA = player.stats.gamesPlayed > 0 ? Math.floor(parseInt(player.stats.fieldGoals.fanDuelFP) / player.stats.gamesPlayed) : 0;
    }
  }

  public teamDailyFp(mdata, daily, type) {
     //daily defense only (0 points allowed * 10 1-6 * 7 7-13 * 4 14-20 * 1 28-34 -1 35 -4 ) 
     //TODO rank def per rush yards allowed pass yards allowed 
  }

  public defenseFp(player) {  
    player['stats'].interceptions.defTD = player['stats'].fumbles.fumTD + player['stats'].interceptions.intTD + player['stats'].puntReturns.prTD + player['stats'].kickoffReturns.krTD
    player['stats'].interceptions.fanDuelFP = (player['stats'].interceptions != null) ? (((player['stats'].fumbles.fumOppRec + player['stats'].interceptions.interceptions + player['stats'].interceptions.safeties) * 2) + ((player['stats'].puntReturns.prTD + player['stats'].kickoffReturns.krTD) * 6) + ((player['stats'].fumbles.fumTD + player['stats'].interceptions.intTD) * 6) + (player['stats'].tackles.sacks) + (player['stats'].interceptions.passesDefended) + (player['stats'].tackles.tackleTotal)) : 0
    player['stats'].interceptions.fanDuelFPA = (parseInt(player['stats'].interceptions.fanDuelFP) / player['stats'].gamesPlayed).toFixed(1)
  }


  public offDailyFp(mdata, daily) {
    if (mdata.player.primaryPosition != 'K' && mdata.stats.receiving != null) {
      mdata.stats.fanDuelDFP = daily.stats.twoPointAttempts != null ? ((daily.stats.twoPointAttempts.twoPtPassMade + daily.stats.twoPointAttempts.twoPtPassRec + daily.stats.twoPointAttempts.twoPtRushMade * 2) - (daily.stats.fumbles.fumLost * 2) + (daily.stats.fumbles.fumTD * 6) - (daily.stats.interceptions.interceptions) + (daily.stats.kickoffReturns.krTD * 6) + (daily.stats.puntReturns.prTD * 6) + (daily.stats.passing.passTD * 4) + (daily.stats.passing.passYards * 0.04) + (daily.stats.receiving.receptions * 0.5) + (daily.stats.receiving.recTD * 6) + (daily.stats.receiving.recYards * 0.1) + (daily.stats.rushing.rushTD * 6) + (daily.stats.rushing.rushYards * 0.1)).toFixed(2) : 0;
    }
  }

}


