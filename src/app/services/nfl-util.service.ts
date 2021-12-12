import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { CompletionKind } from '@angular/compiler-cli/src/ngtsc/typecheck/api';
import { WrappedNodeExpr } from '@angular/compiler';
let nflImageRoot = 'https://static.www.nfl.com/image/private/t_player_profile_landscape_2x/f_auto/league/';

@Injectable({
  providedIn: 'root'
})
export class NflUtilService {
  public nflTeams: any;
  public weekTimes: Array<any> = [];
  public NFLImages: any;

  constructor(private http: HttpClient) {
    this.weekTimes = [
      {
        dateBeg: 'Thu Sep 09 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Sep 16 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '1'
      },
      {
        dateBeg: 'Thu Sep 16 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Sep 23 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '2'
      },
      {
        dateBeg: 'Thu Sep 23 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Sep 30 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '3'
      },
      {
        dateBeg: 'Thu Sep 30 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Oct 07 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '4'
      },
      {
        dateBeg: 'Thu Oct 07 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Oct 14 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '5'
      },
      {
        dateBeg: 'Thu Oct 14 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Oct 21 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '6'
      },
      {
        dateBeg: 'Thu Oct 21 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Oct 28 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '7'
      },
      {
        dateBeg: 'Thu Oct 28 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Nov 04 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '8'
      },
      {
        dateBeg: 'Thu Nov 04 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Nov 11 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '9'
      },
      {
        dateBeg: 'Thu Nov 11 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Nov 18 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '10'
      },
      {
        dateBeg: 'Thu Nov 18 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Nov 25 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '11'
      },
      {
        dateBeg: 'Thu Nov 25 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Dec 02 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '12'
      },
      {
        dateBeg: 'Thu Dec 02 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Dec 09 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '13'
      },
      {
        dateBeg: 'Thu Dec 09 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Dec 16 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '14'
      },
      {
        dateBeg: 'Thu Dec 16 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Dec 23 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '15'
      },
      {
        dateBeg: 'Thu Dec 23 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Dec 30 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '16'
      },
      {
        dateBeg: 'Thu Dec 30 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Jan 06 2022 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '17'
      },
      {
        dateBeg: 'Thu Jan 06 2022 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Jan 13 2022 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '18'
      },
      {
        dateBeg: 'Thu Jan 13 2022 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Jan 20 2022 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '19'
      },
      {
        dateBeg: 'Thu Jan 20 2022 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Jan 27 2022 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '20' //wild card
      },
      {
        dateBeg: 'Thu Jan 27 2022 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Feb 10 2022 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '22' //afc nfc final 4
      },
      {
        dateBeg: 'Thu Feb 10 2022 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Feb 17 2022 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '23' //super bowl
      }
    ];

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
        teamColoursHex: [
          "#00338d",
          "#c60c30"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/giphcy6ie9mxbnldntsf"
      },
      {
        id: 49,
        bye: 14,
        defenseRankLs: 7,
        offenseRankLs: 22,
        city: "Miami",
        name: "Dolphins",
        twitter: "#FinsUp",
        abbreviation: "MIA",
        teamColoursHex: [
        "#008e97",
        "#fc4c02",
        "#005778"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/lits6p8ycthy9to70bnt"
      },
      {
        id: 50,
        bye: 14,
        defenseRankLs: 17,
        offenseRankLs: 29,
        city: "New England",
        name: "Patriots",
        abbreviation: "NE",
        twitter: "#ForeverNE",
        teamColoursHex: [
        "#002244",
        "#c60c30",
        "#b0b7bc"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/moyfxx3dq5pio4aiftnc"
      },
      {
        id: 51,
        bye: 6,
        defenseRankLs: 24,
        offenseRankLs: 32,
        city: "New York",
        name: "Jets",
        twitter: "#TakeFlight",
        abbreviation: "NYJ",
        teamColoursHex: [
        "#125740",
        "#000000",
        "#ffffff"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ekijosiae96gektbo4iw"
      },
      {
        id: 52,
        bye: 7,
        defenseRankLs: 31,
        offenseRankLs: 19,
        city: "Dallas",
        name: "Cowboys",
        twitter: "#DallasCowboys",
        abbreviation: "DAL",
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
        bye: 10,
        defenseRankLs: 9,
        offenseRankLs: 31,
        city: "New York",
        name: "Giants",
        twitter: "#TogetherBlue",
        abbreviation: "NYG",
        teamColoursHex: [
        "#0b2265",
        "#a71930",
        "#a5acaf"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/t6mhdmgizi6qhndh8b9p"
      },
      {
        id: 54,
        bye: 14,
        defenseRankLs: 21,
        offenseRankLs: 24,
        city: "Philadelphia",
        name: "Eagles",
        twitter: "#FlyEaglesFly",
        abbreviation: "PHI",
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
        bye: 9,
        defenseRankLs: 4,
        offenseRankLs: 28,
        city: "Washington",
        name: "Washington",
        twitter: "#WashingtonFootball",
        abbreviation: "WAS",
        teamColoursHex: [
        "#773141",
        "#ffb612"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/f_auto/league/ywoi3t4jja8fokqpyegk"
      },
      {
        id: 56,
        bye: 8,
        defenseRankLs: 6,
        offenseRankLs: 14,
        city: "Baltimore",
        name: "Ravens",
        twitter: "#RavensFlock",
        abbreviation: "BAL",
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
        teamColoursHex: [
        "#fb4f14",
        "#000000"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/okxpteoliyayufypqalq"
      },
      {
        id: 58,
        bye: 13,
        defenseRankLs: 17,
        offenseRankLs: 13,
        city: "Cleveland",
        name: "Browns",
        twitter: "#Browns",
        abbreviation: "CLE",
        teamColoursHex: [
        "#311d00",
        "#ff3c00",
        "#ffffff"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/grxy59mqoflnksp2kocc"
      },
      {
        id: 59,
        bye: 7,
        defenseRankLs: 1,
        offenseRankLs: 21,
        city: "Pittsburgh",
        name: "Steelers",
        twitter: "#HereWeGo",
        abbreviation: "PIT",
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
        bye: 10,
        defenseRankLs: 16,
        offenseRankLs: 25,
        city: "Chicago",
        name: "Bears",
        twitter: "#DaBears",
        abbreviation: "CHI",
        teamColoursHex: [
        "#0b162a",
        "#c83803"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ra0poq2ivwyahbaq86d2"
      },
      {
        id: 61,
        bye: 9,
        defenseRankLs: 32,
        offenseRankLs: 18,
        city: "Detroit",
        name: "Lions",
        twitter: "#OnePride",
        abbreviation: "DET",
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
        bye: 13,
        defenseRankLs: 15,
        offenseRankLs: 2,
        city: "Green Bay",
        name: "Packers",
        abbreviation: "GB",
        twitter: "#GoPackGo",
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
        teamColoursHex: [
        "#4f2683",
        "#ffc62f"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/teguylrnqqmfcwxvcmmz"
      },
      {
        id: 64,
        bye: 10,
        defenseRankLs: 28,
        offenseRankLs: 16,
        city: "Houston",
        name: "Texans",
        twitter: "#WeAreTexans",
        abbreviation: "HOU",
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
        teamColoursHex: [
        "#002c5f",
        "#a2aaad"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ketwqeuschqzjsllbid5"
      },
      {
        id: 66,
        bye: 7,
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
        bye: 13,
        defenseRankLs: 23,
        offenseRankLs: 1,
        city: "Tennessee",
        name: "Titans",
        twitter: "#Titans",
        abbreviation: "TEN",
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
        bye: 6,
        defenseRankLs: 22,
        offenseRankLs: 20,
        city: "Atlanta",
        name: "Falcons",
        twitter: " #DirtyBirds",
        abbreviation: "ATL",
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
        teamColoursHex: [
        "#0085ca",
        "#101820",
        "#bfc0bf"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ervfzgrqdpnc7lh5gqwq"
      },
      {
        id: 70,
        bye: 6,
        defenseRankLs: 3,
        offenseRankLs: 8,
        city: "New Orleans",
        name: "Saints",
        abbreviation: "NO",
        twitter: "#Saints",
        teamColoursHex: [
        "#d3bc8d",
        "#101820"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/grhjkahghjkk17v43hdx"
      },
      {
        id: 71,
        bye: 9,
        defenseRankLs: 5,
        offenseRankLs: 5,
        city: "Tampa Bay",
        name: "Buccaneers",
        abbreviation: "TB",
        twitter: "#GoBucs",
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
        bye: 11,
        defenseRankLs: 18,
        offenseRankLs: 26,
        city: "Denver",
        name: "Broncos",
        twitter: "#BroncosCountry",
        abbreviation: "DEN",
        teamColoursHex: [
        "#fb4f14",
        "#002244"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/t0p7m5cjdjy18rnzzqbx"
      },
      {
        id: 73,
        bye: 12,
        defenseRankLs: 13,
        offenseRankLs: 12,
        city: "Kansas City",
        name: "Chiefs",
        abbreviation: "KC",
        twitter: "#ChiefsKingdom",
        teamColoursHex: [
        "#e31837",
        "#ffb81c"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ujshjqvmnxce8m4obmvs"
      },
      {
        id: 74,
        bye: 8,
        defenseRankLs: 27,
        offenseRankLs: 9,
        city: "Las Vegas",
        name: "Raiders",
        abbreviation: "LV",
        twitter: "#RaiderNation",
        teamColoursHex: [
        "#000000",
        "#a5acaf"
        ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "Raiders"
        }
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/gzcojbzcyjgubgyb6xf2"
      },
      {
        id: 75,
        bye: 7,
        defenseRankLs: 26,
        offenseRankLs: 12,
        city: "Los Angeles",
        name: "Chargers",
        twitter: "#BoltUp",
        abbreviation: "LAC",
        teamColoursHex: [
        "#002a5e",
        "#ffc20e",
        "#0080c6"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/lu22ddatqbdknq4wuazd"
      },
      {
        id: 76,
        bye: 12,
        defenseRankLs: 12,
        offenseRankLs: 7,
        city: "Arizona",
        name: "Cardinals",
        twitter: "#RedSea",
        abbreviation: "ARI",
        teamColoursHex: [
        "#97233f",
        "#000000",
        "#ffb612"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/u9fltoslqdsyao8cpm0k"
      },
      {
        id: 77,
        bye: 11,
        defenseRankLs: 2,
        offenseRankLs: 17,
        city: "Los Angeles",
        name: "Rams",
        abbreviation: "LA",
        twitter: "#RamsHouse",
        teamColoursHex: [
        "#002244",
        "#866d4b",
        "#ffffff"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/rvmujtvvqlhlviuwafzg"
      },
      {
        id: 78,
        bye: 6,
        defenseRankLs: 19,
        offenseRankLs: 15,
        city: "San Francisco",
        name: "49ers",
        abbreviation: "SF",
        twitter: "#FTTB",
        teamColoursHex: [
        "#aa0000",
        "#b3995d"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/dxibuyxbk0b9ua5ih9hn"
      },
        {
          id: 79,
          bye: 9,
          defenseRankLs: 13,
          offenseRankLs: 10,
          city: "Seattle",
          name: "Seahawks",
          twitter: "#Seahawks",
          abbreviation: "SEA",
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
          image: nflImageRoot+"en0ul7l1m9aqf7wffufg"
        },
        "7471" : {
          image: nflImageRoot+"vcjoh0xhf8ip8digkkai"
        },
        "7549" : {
          image: nflImageRoot+"sfehmfwtg9i5gdcpqzgf"
        },
        "14516" : {
          image: nflImageRoot+"cw9mplvltikyayjsjmc3"
        },
        "8190" : {
          image: nflImageRoot+"voakyrtj34sghkwxaxxf"
        },
        "8469" : {
          image: nflImageRoot+"ym7oprwel3dxbab0k7x9"
        },
        "5940" : {
          image: nflImageRoot+"xhkqvvkq3awveyhv0x4e"
        },
        "8272" : {
          image: nflImageRoot+"ttuzsfycx9n3wie83dsw"
        },
        "9741" : {
          image: nflImageRoot+"yeobojameg9dram1qiqo"
        },
        "8463" : {
          image: nflImageRoot+"qnt1kn2mouanpxvdvzvh"
        },
        "8305" : {
          image: nflImageRoot+"iwwyf70p2gckryfv7cyn"
        },
        "7888" : {
          image: nflImageRoot+"dindmtqwwvrzgkfsqfdb"
        },
        "16858" : {
          image: nflImageRoot+"htlt0h1p8gmpgrrbjyyj"
        },
        "18672" : {
          image: nflImageRoot+"zxk0jfinayjjhguk83gw"  
        },
        "6114" : {
          image: nflImageRoot+"ublljy2omv3mulxf7kkp"
        },
        "18619" : {
          image: nflImageRoot+"mmx64blok0j1a5e9zhww"
        },
        "18624" : {
          image: nflImageRoot+"qgyu27brqcvyquh7btov"
        },
        "18578" : {
          image: nflImageRoot+"xcymtg1vdkbntbzlmbrw"
        },
        "19375" : {
          image: nflImageRoot+"m6btiz85brkj9bwim4yv"
        },
        "18732" : {
          image: nflImageRoot+"kfdhebiaodlh02eikayl"
        },
        "13028" : {
          image: nflImageRoot+"lplwsbpisofrdfyvtvfh"
        },
        "18650" : {
          image: nflImageRoot+"ijwidkupub1xzub4qiyb"
        },
        "18570" : {
          image: nflImageRoot+"kf5z3ytx4oh53xy8fudq"
        },
        "17040" : {
          image: nflImageRoot+"hzjeyplhs0f0koeqvgrm"
        },
        "8441" : {
          image: nflImageRoot+"gytzk7llt9p0qw22iayb"
        },
        "13210" : {
          image: nflImageRoot+"u3eeqbzyiguwoqdkz4fb"
        },
        "15006" : {
          image: nflImageRoot+"ledqnhfinzff3i0j7vni"
        },
        "18575" : {
          image: nflImageRoot+"ow7mjmmy8xw7mmwlllzl"
        },
        "14988" : {
          image: nflImageRoot+"pjdiyojbnf8ywt3jg36u"
        },
        "13276" : {
          image: nflImageRoot+"vwrzeanheawwjrqabvcj"
        },
        "18566" : {
          image: nflImageRoot+"p0149bnhdc9orxsoiyvl"
        },
        "18683" : {
          image: nflImageRoot+"ocmacwswn8i1il9j6afp"
        },
        "18595" : {
          image: nflImageRoot+"tw68tp2j7yceuwip6trq"
        },
        "14513" : {
          image: nflImageRoot+"o2e4hfh4ttdcuzm62qrg"
        },
        "7075" : {
          image: nflImageRoot+"caovj6onwsoepaen8tjc"
        },
        "9923" : {
          image: nflImageRoot+"iecbkdfdgjbj0kegxftw"
        },
        "9911" : {
          image: nflImageRoot+"zcumaps42lo5sskklxcb"
        },
        "7965" : {
          image: nflImageRoot+"hl3rjmdutfmecf7bsibt"
        },
        "6891" : {
          image: nflImageRoot+"xqdutjfczs0x2c4bxkq8"
        },
        "18689" : {
          image: nflImageRoot+"dlqzehvv4dqmq3q8vt7q"
        },
        "6627" : {
          image: nflImageRoot+"qf8blphaa8cjoad9l3iq"
        },
        "18748" : {
          image: nflImageRoot+"ojaldunm4wsqio8ecyzl"
        },
        "6366" : {
          image: nflImageRoot+"npiwam7wg49no1d5bcfu"
        },
        "8086" : {
          image: nflImageRoot+"mjxi12jh15analtvesbl"
        },
        "5936" : {
          image: nflImageRoot+"rdtcovvvxsmag3er42um"
        },
        "7543" : {
          image: nflImageRoot+"siupf4yvtt6m2vo8eed9"
        },
        "6879" : {
          image: nflImageRoot+"z8mv5hn5s8kkxau1ynup"
        },
        "7630" : {
          image: nflImageRoot+"wdo99sm5z6hbtsna0scf"
        },
        "6629" : {
          image: nflImageRoot+"omwvlsalhbvn4mshgfcf"
        },
        "17114" : {
          image: nflImageRoot+"dlej3m2xoj81yretkm3r"
        },
        "6335" : {
          image: nflImageRoot+"hsj22mncpaqynxmt3xni"
        },
        "9945" : {
          image: nflImageRoot+"xv2vjalzhb6z9bevj0z9"
        },
        "14877" : {
          image: nflImageRoot+"qba2lspodqxe1uuttgz7"
        },
        "9834" : {
          image: nflImageRoot+"jpdzcfis6a3qmwyn7mbu"
        },
        "7013" : {
          image: nflImageRoot+"rfdif7ec0f3czwyeyfxq"
        },
        "6486" : {
          image: nflImageRoot+"sextvbehmeu7ydutxtsu"
        },
        "18561" : {
          image: nflImageRoot+"tr3yxhybdwehibl6maqy"
        },
        "19009" : {
          image: nflImageRoot+"qtjp84utne7uhgbtx0o5"
        },
        "19043" : {
          image: nflImageRoot+"ydu8lvszgayayddtnt44"
        },
        "18785" : {
          image: nflImageRoot+"bgflcfmqggmnfp35wvoi"
        },
        "18769" : {
          image: nflImageRoot+"dxtherbqeeqm21shpweo"
        },
        "18576" : {
          image: nflImageRoot+"dpo09k2ilcdrqbybirpa"
        },
        "18979" : {
          image: nflImageRoot+"rwyeph1ojfmkryt2egzk"
        },
        "18985" : {
          image: nflImageRoot+"jpy9l8osfm3yhvjwunur"
        },
        "18771" : {
          image: nflImageRoot+"z2clh7yjqbdklh5wsde6"
        },
        "6939" : {
          image: nflImageRoot+"hylws51towgdgtb3xuue"
        },
        "18641" : {
          image: nflImageRoot+"itfqdvyumc77u8clmczy"
        },
        "18774" : {
          image: nflImageRoot+"sz8fxixdgfp0v2urdpgt"
        },
        "16080" : {
          image: nflImageRoot+"sy4vnmwmotj4azsybhyt"
        },
        "14510" : {
          image: nflImageRoot+"ichrbyxroayfplnyshr4"
        },
        "18586" : {
          image: nflImageRoot+"hcuzgs2nio1jkprrxb8d"
        },
        "9832" : {
          image: nflImageRoot+"jqwqm12gfrwvnljq3zpz"
        },
        "18757" : {
          image: nflImageRoot+"sxldzvwuh31gcmbiuavt"
        },
        "7656" : {
          image: nflImageRoot+"rf0zx5emnigq8zoewpmn"
        },
        "18843" : {
          image: nflImageRoot+"ruisuqsiiuufuwb9kzn4"
        },
        "18734" : {
          image: nflImageRoot+"gsci852t9zgfxblq9ukz"
        },
        "9772" : {
          image: nflImageRoot+"thhwhd13yrxfotpmg3mr"
        },
        "7609" : {
          image: nflImageRoot+"rnlbvr1luxvujvilpsja"
        },
        "10034" : {
          image: nflImageRoot+"fp5olqsgdbv5malqazzu"
        },
        "15416" : {
          image: nflImageRoot+"hj1o1fa6klumb7yozntc"
        },
        "13224" : {
          image: nflImageRoot+"oipjjzgdjyc5qstoo9zv"
        },
        "8544" : {
          image: nflImageRoot+"lazoen3ty3exj44grxbg"
        },
        "13386" : {
          image: nflImageRoot+"abkoyjrdrec9eub1pmzm"
        },
        "8728" : {
          image: nflImageRoot+"nozboqae26d3qrfbiarn"
        },
        "6908" : {
          image: nflImageRoot+"dvvx2eftodxk5qlhg4rl"
        },
        "9961" : {
          image: nflImageRoot+"ew3fzelndoialgn6a2ra"
        },
        "13466" : {
          image: nflImageRoot+"o7flzlafkwup1al6ujiw"
        },
        "9743" : {
          image: nflImageRoot+"zi77vkqwrmklt5ic6lc6"
        },
        "9849" : {
          image: nflImageRoot+"n4tprmtnsgpc8cmvppvm"
        },
        "18593" : {
          image: nflImageRoot+"w2zhcr5cconyonvyhhbo"
        },
        "6926" : {
          image: nflImageRoot+"lgdqefi7aa9lqoxgf5ru"
        },
        "14713" : {
          image: nflImageRoot+"iduydmfnwwumvdkafogu"
        },
        "6560" : {
          image: nflImageRoot+"yorwzg4zr1putvxgtuzc"
        },
        "19016" : {
          image: nflImageRoot+"ztytuclbblkq43gzijpz"
        },
        "18613" : {
          image: nflImageRoot+"znpc5vhgni4lqh2sgrpg"
        },
        "16650" : {
          image: nflImageRoot+"zish1d1wbrhziswhsssd"
        },
        "18655" : {
          image: nflImageRoot+"ydp2awxxygyc17ugtmj3"
        },
        "6351" : {
          image: nflImageRoot+"u8glt8o1ugdzymmbkafr"
        },
        "9788" : {
          image: nflImageRoot+"i8be288cf78xhlwbawsm"
        },
        "18677" : {
          image: nflImageRoot+"bre8ysydjkevbfjzrs61"
        },
        "19004" : {
          image: nflImageRoot+"oebtmmy9ad0jdsct6hkr"
        },
        "8240" : {
          image: nflImageRoot+"dhettmtaamsu9qlepzzf"
        },
        "18652" : {
          image: nflImageRoot+"spnfy71tflcjc2vq3bnm"
        },
        "8550" : {
          image: nflImageRoot+"jwljhx516yyxd8lz0hdd"
        },
        "17113" : {
          image: nflImageRoot+"rhtskdfdsdkbhm8zn6pa"
        },
        "9572" : {
          image: nflImageRoot+"hkb5vin1uzghnf60njhm"
        },
        "12847" : {
          image: nflImageRoot+"uilaivgdhm6fgyz4ruwj"
        },
        "18643" : {
          image: nflImageRoot+"qatisluh7jkk6gbhz7hj"
        },
        "6130" : {
          image: nflImageRoot+"crnqcrkqwapmkzlsoora"
        },
        "18668" : {
          image: nflImageRoot+"gpz9zs474snz3jntrpbd"
        },
        "18670" : {
          image: nflImageRoot+"pfzlwlua7rh1kf3wv8iq"
        },
        "12606" : {
          image: nflImageRoot+"quvoqaapbnebbllg3jwl"
        },
        "18623": {
          firstName: "Clyde",
          lastName: "Edwards-Helaire",
          image: nflImageRoot+"ldgjalogqzti76pmqbw1"
        },
        "18688": {
          firstName: "Antonio",
          lastName: "Gibson",
          image: nflImageRoot+"cvmwtpfzdt0ibauqifup"
        },
        "18577": {
          firstName: "Joe",
          lastName: "Burrow",
          image: nflImageRoot+"alhbhd5ega2doxogh0dg"
        },
        "18640": {
          firstName: "Cam",
          lastName: "Akers",
          image: nflImageRoot+"zeh3myk7tc0yzp6qbudr"
        },
        "18603": {
          firstName: "D'Andre",
          lastName: "Swift",
          image: nflImageRoot+"amhsf13r1hnpo9lrn2uj"
        },
        "18849": {
          firstName: "James",
          lastName: "Robinson",
          image: nflImageRoot+"lxzbao36eeratekmnxeb"
        }, 
        "7575": {
          firstName: "Rob",
          lastName: "Gronkowski",
          image: nflImageRoot+"ldajm3cj1rs1sfwykyyk"
        }, 
        "18568": {
          firstName: "Zack",
          lastName: "Moss",
          image: nflImageRoot+"ung5uvdvstg3wgl9zdye"
        },
        "18895": {
          firstName: "Jordan",
          lastName: "Fuller",
          image: nflImageRoot+"krqfhhry1lbtx2acscmj"
        }, 
        "13411": {
          firstName: "John",
          lastName: "Johnson",
          image: nflImageRoot+"xwzn5lh2mhktocqcougu"
        },
        "18615": {
          firstName: "Jonathan",
          lastName: "Taylor",
          image: nflImageRoot+"mx6ptr3jbhx0wxo3848u"
        },
        "18631": {
          firstName: "Justin",
          lastName: "Herbert",
          image: nflImageRoot+"lrn52vly8xrfapbhw1ft"
        },
        "18594": {
          firstName: "Jerry",
          lastName: "Jeudy",
          image: nflImageRoot+"fvdnrep98wisgfokxqar"
        },
        "17023": {
          firstName: "Joey",
          lastName: "Slye",
          image: nflImageRoot+"xzlrapymjhwbanjcivlk"
        },
        "18588": {
          firstName: "CeeDee",
          lastName: "Lamb",
          image: nflImageRoot+"e8ftgnyivmkwtffd6tcr"
        },
        "18819": {
          firstName: "Rodrigo",
          lastName: "Blankenship",
          image: nflImageRoot+"j2z6mdwlye2gc4zhmc3g"
        },
        "18882": {
          firstName: "Joshua",
          lastName: "Kelley",
          image: nflImageRoot+"pkqsegmcbmbjlvwfzzl2"
        },
        "16038": {
          firstName: "Darrell",
          lastName: "Henderson",
          image: nflImageRoot+"nyjvyjkx6cb2a7lfxevg"
        },
        "18648": {
          firstName: "Justin",
          lastName: "Jefferson",
          image: nflImageRoot+"rbpfxph4wwkxnhphoat6"
        },
        "16254": {
          firstName: "Scott",
          lastName: "Miller",
          image: nflImageRoot+"knmpvvmftnvmqtx5g8me"
        },
        "18675": {
          firstName: "Brandon",
          lastName: "Aiyuk",
          image: nflImageRoot+"crkz9pxkba4o1zsmiazt"
        },
        "18635": {
          firstName: "Van",
          lastName: "Jefferson",
          image: nflImageRoot+"qszul9ttjj1mmboai4iu"
        },
        "30425": {
          firstName: "Trevor",
          lastName: "Lawrence",
          image: nflImageRoot+"nyagacdtgj26vf4evn7w"
        },
        "30430": {
          firstName: "Zach",
          lastName: "Wilson",
          image: nflImageRoot+"u9t7qn55molsifoee2sr"
        },
        "30439": {
          firstName: "Justin",
          lastName: "Fields",
          image: nflImageRoot+"ohjocm3hzbdvvycmm3yf"
        },
        "30443": {
          firstName: "Mac",
          lastName: "Jones",
          image: nflImageRoot+"yucu9hddoj4x9w9ifiod"
        },
        "30431": {
          firstName: "Trey",
          lastName: "Lance",
          image: nflImageRoot+"wyd6t28jc7wwg5vyseoc"
        },
        "30434": {
          firstName: "Jaylen",
          lastName: "Waddle",
          image: nflImageRoot+"hkwyhd9w8pouxwhqn6ly"
        },
        "30433": {
          firstName: "Ja'Marr",
          lastName: "Chase",
          image: nflImageRoot+"fxclfdx8fz5cbuep6ngd"
        },
        "30432": {
          firstName: "Kyle",
          lastName: "Pitts",
          image: nflImageRoot+"ck6bpvk71ancovvtomdg"
        },
        "13433": {
          firstName: "Najee",
          lastName: "Harris",
          image: nflImageRoot+"lwcct10u7lfzsgtaoqce"
        },
        "18627": {
          firstName: "Bryan",
          lastName: "Edwards",
          image: nflImageRoot+"aqic7l7pnw9x5ukh6iqr"
        },
        "30438": {
          firstName: "DeVonta",
          lastName: "Smith",
          image: nflImageRoot+"hol7dluumxi1cqxyagg3"
        },
        "30817": {
          firstName: "Elijah",
          lastName: "Moore",
          image: nflImageRoot+"rk7rq0dyx9bjmgc6ijkj"
        },
        "30931": {
          firstName: "Rondale",
          lastName: "Moore",
          image: nflImageRoot+"qwcd3lglkknslsavcvr7"
        },
        "18940": {
          firstName: "K.J.",
          lastName: "Osburn",
          image: nflImageRoot+"p44nhjopxr4mwncbdx5l"
        },
        "9712": {
          firstName: "Carson",
          lastName: "Wentz",
          image: nflImageRoot+"komdw34m3vpzadqftxzh"
        },
        "9919": {
          firstName: "Jared",
          lastName: "Goff",
          image: nflImageRoot+"mxwxbwae3dsmth9dvta2"
        },
        "6825": {
          firstName: "Matt",
          lastName: "Stafford",
          image: nflImageRoot+"pxll35kun2cq2aeluaav"
        },
        "6205": {
          firstName: "Tyrod",
          lastName: "Taylor",
          image: nflImageRoot+"sc2pqxzxhd0stvbgo0u4"
        },
        "7457": {
          firstName: "Teddy",
          lastName: "Bridgewater",
          image: nflImageRoot+"mrc7qcxxzctrdpvnvhbh"
        },
        "14494": {
          firstName: "Sam",
          lastName: "Darnold",
          image: nflImageRoot+"izcmywlqedam7djfuayc"
        },
        "6464": {
          firstName: "Andy",
          lastName: "Dalton",
          image: nflImageRoot+"ejcbwk2yijkswrmzscbk"
        },
        "7647": {
          firstName: "Mark",
          lastName: "Ingram",
          image: nflImageRoot+"jvql2hcns2ezsafopltd"
        },
        "6038": {
          firstName: "Julio",
          lastName: "Jones",
          image: nflImageRoot+"pxrjunbln50toj2tmvbs"
        },
        "6027": {
          firstName: "Tevin",
          lastName: "Coleman",
          image: nflImageRoot+"cy80drx21ucuyagaochk"
        },
        "8487": {
          firstName: "Jared",
          lastName: "Cook",
          image: nflImageRoot+"cthoenebptadlu4g928v"
        },
        "9999": {
          firstName: "Hunter",
          lastName: "Henry",
          image: nflImageRoot+"ldzlkisbxebv2pzup9qd"
        },
        "12943": {
          firstName: "Kenny",
          lastName: "Golladay",
          image: nflImageRoot+"gdihhyi6bpsvyljtenua"
        },
        "7485": {
          firstName: "Kyle",
          lastName: "Rudolph",
          image: nflImageRoot+"lvve7xyvlupkydsgma0q"
        },
        "30306": {
          firstName: "Dyami",
          lastName: "Brown",
          image: nflImageRoot+"ok8mvanlgwi5cfqndl0n"
        },
        "7459": {
          firstName: "Taylor",
          lastName: "Heinicke",
          image: nflImageRoot+"hik6marceggrf4cmukci"
        },
        "6224": {
          firstName: "Sammy",
          lastName: "Watkins",
          image: nflImageRoot+"uulusc1rbfhi3k0yhcch"
        },
        "27502": {
          firstName: "Ty'Son",
          lastName: "Williams",
          image: nflImageRoot+"ucxy1zbyppgm62iyvrdr"
        },
        "6477": {
          firstName: "A.J.",
          lastName: "Green",
          image: nflImageRoot+"ibugzfv4xaeq9y4xurmj"
        },
        "30193": {
          firstName: "Eli",
          lastName: "Mitchell",
          image: nflImageRoot+"csra0oiqwh6i2utjdlud"
        },
        "13409": {
          firstName: "Gerald",
          lastName: "Everett",
          image: nflImageRoot+"cstlbdkqplchtbgjdcxf"
        },
        "13529": {
          firstName: "Jonnu",
          lastName: "Smith",
          image: nflImageRoot+"uqux8vr24dx5tvqf97hb"
        },
        "18657": {
          firstName: "Adam",
          lastName: "Trautman",
          image: nflImageRoot+"uzw6h7whiuhlo15vneqk"
        },
        "8019": {
          firstName: "Nelson",
          lastName: "Aghgolor",
          image: nflImageRoot+"cym6r5v9z8uizic8ak5i"
        },
        "8565": {
          firstName: "Adam",
          lastName: "Humphries",
          image: nflImageRoot+"l56ywjejfpraigzs4qia"
        },
        "12670": {
          firstName: "Corey",
          lastName: "Davis",
          image: nflImageRoot+"e96ltr3bnrq6bs4o0gvx"
        },
        "6756": {
          firstName: "Emmanuel",
          lastName: "Sanders",
          image: nflImageRoot+"potkibjtm855tsawozs0"
        },
        "6479": {
          firstName: "Marvin",
          lastName: "Jones Jr.",
          image: nflImageRoot+"x09ruarqlcrdsjqq5mpg"
        },
        "7287": {
          firstName: "Chris",
          lastName: "Conley",
          image: nflImageRoot+"capkuyfgpghldch9dzl7"
        },
        "8208": {
          firstName: "Tyrell",
          lastName: "Williams",
          image: nflImageRoot+"qixhze7yidydtc1vyeih"
        },
        "11501": {
          firstName: "Kalif",
          lastName: "Raymond",
          image: nflImageRoot+"v5tzzalsktjaeeepc59o"
        },
        "8377": {
          firstName: "Mike",
          lastName: "Davis",
          image: nflImageRoot+"a12intlc15po42xebdxv"
        },
        "6487": {
          firstName: "Tyler",
          lastName: "Kroft",
          image: nflImageRoot+"jatdbdpswqdwvukemp1t"
        },
        "6845": {
          firstName: "Eric",
          lastName: "Ebron",
          image: nflImageRoot+"uaxsxymncppase7ihczd"
        },
        "18562": {
          firstName: "Devin",
          lastName: "Duvernay",
          image: nflImageRoot+"kcfjuebtxvkg9kapy71o"
        },
        "6671": {
          firstName: "Geoff",
          lastName: "Swaim",
          image: nflImageRoot+"zkurufp1suswhdb611hs"
        },
        "9694": {
          firstName: "Kenyan",
          lastName: "Drake",
          image: nflImageRoot+"zrdr9i5rjxr5z8xilqdd"
        },
        "30693": {
          firstName: "Pat",
          lastName: "Freiermuth",
          image: nflImageRoot+"mcmq0fne7lzmd4ymuonx"
        },
        "12999": {
          firstName: "Jamaal",
          lastName: "Williams",
          image: nflImageRoot+"pkhucpae1jyvzuy1jrjl"
        },
        "30242": {
          firstName: "Nico",
          lastName: "Collins",
          image: nflImageRoot+"qls2a7h4ujxn7m4fj05y"
        },
        "30689": {
          firstName: "Davis",
          lastName: "Mills",
          image: nflImageRoot+"zzk8nhal2wi51xdbw7bm"
        },
        "22228": {
          firstName: "Quez",
          lastName: "Watkins",
          image: nflImageRoot+"gwow6ytckqv1ukrbrl5l"
        },
        "14665": {
          firstName: "Anthony",
          lastName: "Miller",
          image: nflImageRoot+"u3xq3snkesclrrqulagk"
        },
        "30978": {
          firstName: "Tommy",
          lastName: "Tremble",
          image: nflImageRoot+"tvqixry9ad1tnsy9xdor"
        },
        "9878": {
          firstName: "Blake",
          lastName: "Martinez",
          image: nflImageRoot+"cryuvmmnkryxlgjfgziw"
        },
        "9937": {
          firstName: "Jacoby",
          lastName: "Brissett",
          image: nflImageRoot+"z8e0godak9btfkl9nu6s"
        },
        "18787": {
          firstName: "Quintez",
          lastName: "Cephus",
          image: nflImageRoot+"i8qrouusz4vbkmhcg0ks"
        },
        "30122": {
          firstName: "Micheal",
          lastName: "Carter II",
          image: nflImageRoot+"admwfoo0pgl2z2zvqcp2"
        },
        "30935": {
          firstName: "Trey",
          lastName: "Sermon",
          image: nflImageRoot+"v2igdor3vf1ijb0qyyp1"
        },
        "14522": {
          firstName: "Sony",
          lastName: "Michel",
          image: nflImageRoot+"sge9qla3wyhfzemqaq5f"
        },
        "18679": {
          firstName: "Jordyn",
          lastName: "Brooks",
          image: nflImageRoot+"kaivb20gkmzo2mfmkvxq"
        },
        "31891": {
          firstName: "Nick",
          lastName: "Bolton",
          image: nflImageRoot+"q2jqgcnnnv3d7zdd3u0v"
        },
        "18630": {
          firstName: "Kenneth",
          lastName: "Murray",
          image: nflImageRoot+"dfh0z6h7s3pkb4excc3k"
        },
        "13246": {
          firstName: "Alex",
          lastName: "Anzalone",
          image: nflImageRoot+"fcsmqw0nq4mw1wvji2z4"
        },
        "30221": {
          firstName: "Rashod",
          lastName: "Bateman",
          image: nflImageRoot+"vpcmsc93xuzhv4bupbzu"
        },
        "18555": {
          firstName: "Isaiah",
          lastName: "Simmons",
          image: nflImageRoot+"o0xgwhoevo1fpjrowgpq"
        },
        "18581": {
          firstName: "Logan",
          lastName: "Wilson",
          image: nflImageRoot+"s3g0kgjmwhvw69jewwyr"
        },
        "23257": {
          firstName: "Nick",
          lastName: "Westbrook",
          image: nflImageRoot+"qkfbmmwufx3fmqd9cth9"
        },
        "7477": {
          firstName: "Cordarrelle",
          lastName: "Patterson",
          image: nflImageRoot+"jnj4vueqtpbhjuqjrakr"
        },
        "5956": {
          firstName: "Darren",
          lastName: "Fells",
          image: nflImageRoot+"eh0rbweg4wbzgzpvprnv"
        },
        "13188": {
          firstName: "James",
          lastName: "Conner",
          image: nflImageRoot+"nq7mtvvxmgc2vukwwcpo"
        },
        "30925": {
          firstName: "Javonte",
          lastName: "Williams",
          image: nflImageRoot+"i00p0fbwvrap6lq1hojw"
        },
        "30208": {
          firstName: "Chuba",
          lastName: "Hubbard",
          image: nflImageRoot+"nkitu0vqly1r1vreldfn"
        },
        "30597": {
          firstName: "Kenneth",
          lastName: "Gainwell",
          image: nflImageRoot+"s8prgy9fa6ldmp7apoeb"
        },
        "30929": {
          firstName: "Larry",
          lastName: "Rountree III",
          image: nflImageRoot+"yaunqhefdc1u79oegpsp"
        },
        "30351": {
          firstName: "Kylin",
          lastName: "Hill",
          image: nflImageRoot+"gxrbyvfiqgip3jyrraj0"
        },
        "30726": {
          firstName: "Demetric",
          lastName: "Felton",
          image: nflImageRoot+"n1rwkkcuaq90iv8bhqj9"
        },
        "30920": {
          firstName: "Anthony",
          lastName: "Schwartz",
          image: nflImageRoot+"ipvvq2xasootlkeco3ne"
        },
        "30926": {
          firstName: "Josh",
          lastName: "Palmer",
          image: nflImageRoot+"x2gobzerrjxzgpxij4ac"
        },
        "30703": {
          firstName: "Luke",
          lastName: "Farrell",
          image: nflImageRoot+"nfuvxexlyqkcfr4ug9ng"
        },
        "13356": {
          firstName: "Keelan",
          lastName: "Cole",
          image: nflImageRoot+"boajq2m1njwe88c23lpd"
        },
        "30447": {
          firstName: "Kadarius",
          lastName: "Toney",
          image: nflImageRoot+"hyl8jzsa7dto7qekd7vl"
        },
        "8466": {
          firstName: "Malcom",
          lastName: "Brown",
          image: nflImageRoot+"zxnjheichwlnvvu5qdyl"
        },
        "30609": {
          firstName: "Pete",
          lastName: "Warner",
          image: nflImageRoot+"odhi45hkqjbxr5xqxctg"
        },
        "14521": {
          firstName: "Mike",
          lastName: "Hughes",
          image: nflImageRoot+"ohydfhzyltb4qbnqz1ti"
        },
        "8715": {
          firstName: "Jason",
          lastName: "McCourty",
          image: nflImageRoot+"myk5ccdezt1lhjc8szbm"
        },
        "9753": {
          firstName: "Matt",
          lastName: "Judon",
          image: nflImageRoot+"gzqaca6m73uzgwczrw7z"
        },
        "18961": {
          firstName: "Tae",
          lastName: "Crowder",
          image: nflImageRoot+"kzdlpqta1ngescib3es0"
        },
        "17072": {
          firstName: "Jalen",
          lastName: "Thompson",
          image: nflImageRoot+"ldeja3lkrjadp11cz1jo"
        },
        "6371": {
          firstName: "Graham",
          lastName: "Gano",
          image: nflImageRoot+"kibotlfb4ipuxdirxzp0"
        },
        "16066": {
          firstName: "Chase",
          lastName: "McLaughlin",
          image: nflImageRoot+"kehs9z6fpllcdqzdkvmo"
        },
        "10014": {
          firstName: "Alex",
          lastName: "Collins",
          image: nflImageRoot+"ddlhbm7zsi5o69wh6z5o"
        },
        "12705": {
          firstName: "Ricky",
          lastName: "Seals-Jones",
          image: nflImageRoot+"qodkouwmexklezoqmcg6"
        },
        "7373": {
          firstName: "Damien",
          lastName: "Williams",
          image: nflImageRoot+"n8s6juvkggzwt8ejry63"
        },
        "8109": {
          firstName: "Antonio",
          lastName: "Brown",
          image: nflImageRoot+"ecxsx9t7bfg42bgfwj3v"
        },
        "8548": {
          firstName: "Mike",
          lastName: "Glennon",
          image: nflImageRoot+"mubobrjbeudtezxv0t0p"
        },
        "13281": {
          firstName: "Marcus",
          lastName: "Johnson",
          image: nflImageRoot+"zliegu0pfjyehqw1ozzh"
        },
        "30440": {
          firstName: "Micah",
          lastName: "Parsons",
          image: nflImageRoot+"u6uanv3mp0skqysqv5wx"
        },
        "12688": {
          firstName: "Haason",
          lastName: "Reddick",
          image: nflImageRoot+"ug4cbgz6sttovqkzqgkm"
        },
        "19276": {
          firstName: "Geno",
          lastName: "Smith",
          image: nflImageRoot+"jdkrvzqqhkbg62hstgtw"
        },
        "30593": {
          firstName: "Kahlil",
          lastName: "Herbert",
          image: nflImageRoot+"q3joomqliqwvrqs9vkmj"
        },
        "13280": {
          firstName: "Mack",
          lastName: "Hollins",
          image: nflImageRoot+"hlyp8qsgct5mqkfbkaxx"
        },
        "12937": {
          firstName: "Jamal",
          lastName: "Agnew",
          image: nflImageRoot+"ekqayurhdocxuvimyjy1"
        },
        "8464": {
          firstName: "Case",
          lastName: "Keenum",
          image: nflImageRoot+"pjmiuwbl35c1wetjcszr"
        },
        "16672": {
          firstName: "Lonnie",
          lastName: "Johnson",
          image: nflImageRoot+"dc5qjoqdkt4craiuem8k"
        },
        "15377": {
          firstName: "Emmnauel",
          lastName: "Mosely",
          image: nflImageRoot+"mq4eglal317zmqfsple4"
        },
        "25812": {
          firstName: "Charlie",
          lastName: "Woerner",
          image: nflImageRoot+"v811mn47vy4yym5qefhd"
        },
        "14675": {
          firstName: "Mike",
          lastName: "White",
          image: nflImageRoot+"uplanmusamdr4bzil0v4"
        },
        "18666": {
          firstName: "Denzel",
          lastName: "Mims",
          image: nflImageRoot+"nvoyxkpbc7pp9pjkwqbw"
        },
        "18607": {
          firstName: "Jordan",
          lastName: "Love",
          image: nflImageRoot+"tm8zrpwj62zkn2mqxef1"
        },
        "6741": {
          firstName: "Trevor",
          lastName: "Siemian",
          image: nflImageRoot+"pizeafmn2cj95emcydg3"
        }, 
        "9791": {
          firstName: "Jordan",
          lastName: "Howard",
          image: nflImageRoot+"nbvb6bsrmjupmqrrf1n4"
        },
        "18606": {
          firstName: "AJ",
          lastName: "Dillon",
          image: nflImageRoot+"jpowpgjn6nm6umrls2px"
        },
        "6294" : {
          firstName: "Cam",
          lastName: "Newton",
          image: nflImageRoot+"zwmgw2gmnn2kch4nquft"
        },
        "14973" : {
          firstName: "Deandre",
          lastName: "Carter",
          image: nflImageRoot+"ntvfcvfd32hho1rkokwi"
        },
        "30304" : {
          firstName: "John",
          lastName: "Bates",
          image: nflImageRoot+"uhuncx8qb6b3grbfztg8"
        },
        "14910" : {
          firstName: "Tim",
          lastName: "Boyle",
          image: nflImageRoot+"bzzq8cwpttjtatcclfea"
        },
        "18726" : {
          firstName: "Tyler",
          lastName: "Huntley",
          image: nflImageRoot+"o75lst87can47rzetd1p"
        },
        "6216" : {
          firstName: "Marquisse",
          lastName: "Goodwin",
          image: nflImageRoot+"pmssb3pyiripkxwqmnqp"
        },
        "8749" : {
          firstName: "Tony",
          lastName: "Jones",
          image: nflImageRoot+"zotzkoxxn358hpgmesdv"
        },
        "30625" : {
          firstName: "Amon",
          lastName: "St. Brown",
          image: nflImageRoot+"wriyln01fppggo6jwvc0"
        },
        "18605" : {
          firstName: "Josiah",
          lastName: "Deguara",
          image: nflImageRoot+"yzw2xy9ibxvwfogeywcx"
        }, 
        "14678" : {
          firstName: "Ced",
          lastName: "Wilson",
          image: nflImageRoot+"mqx2ue8p1i49rsft8lrx"
        }, 
        "8748" : {
          firstName: "DeSean",
          lastName: "Jackson",
          image: nflImageRoot+"pr5m864fqvnoozihylrh"
        },
        "30717" : {
          firstName: "Dez",
          lastName: "Fitzpatrick",
          image: nflImageRoot+"unxs3jdj0qphnyh6i0jm"
        },
        "16736" : {
          firstName: "Gardner",
          lastName: "Minshew",
          image: nflImageRoot+"y2wmde4s0fgnudjvl4m9"
        },
        "16593" : {
          firstName: "Jalen",
          lastName: "Guyton",
          image: nflImageRoot+"bbvqbvctga7wrtnt9b4h"
        },
        "13009" : {
          firstName: "Donta",
          lastName: "Foreman",
          image: nflImageRoot+"enltwrzdmxmoofvfzvlw"
        },
        "7746" : {
          firstName: "Odell",
          lastName: "Beckham",
          image: nflImageRoot+"dw6kneiq5flxfw0m6rf3"
        },
        "8032" : {
          firstName: "Zach",
          lastName: "Ertz",
          image: nflImageRoot+"y4cua1auc75ybocf2ijz"
        },
        "30381" : {
          firstName: "Jermar",
          lastName: "Jefferson",
          image: nflImageRoot+"snmaivk9ikcatxwexvku"
        },
        
        
        
       
          
      }
   }

   public updateTeamStats(tStats) {
    for (let stats of tStats) {
      for (let team of this.nflTeams) {
        if (stats.team.id === team.id) {
          stats.bye = team.bye;
          team.plays = stats.stats.rushing.rushAttempts + stats.stats.passing.passAttempts;
          team.passPlays = stats.stats.passing.passAttempts;
          team.runPlays = stats.stats.rushing.rushAttempts;
          stats.upDefRank = team.defenseRankLs;
          stats.upOffRank = team.offenseRankLs;

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

   public getSchedToughness(sched, type, mainTeam, bye, nflWeek) {
    let halfwayThrough = Math.floor(sched.length / 2);
    let arrayFirstHalf = sched.slice(0, halfwayThrough);
    let arraySecondHalf = sched.slice(halfwayThrough, sched.length);

    if (type === 'd') {
      let sum = 0;
      for (let s of sched) {
        for (let t of this.nflTeams){
          if (s.schedule.awayTeam.id != mainTeam &&
            s.schedule.awayTeam.id === t.id || 
            s.schedule.homeTeam.id != mainTeam &&
            s.schedule.homeTeam.id === t.id) {
            sum += t.defenseRankLs;
          }
        }
      }
      return sum;
    } else if (type === 'o') {
      let sum = 0;
      for (let s of sched) {
        for (let t of this.nflTeams){
          if (s.schedule.awayTeam.id != mainTeam &&
            s.schedule.awayTeam.id === t.id || 
            s.schedule.homeTeam.id != mainTeam &&
            s.schedule.homeTeam.id === t.id) {
            sum += t.offenseRankLs;
          }
        }
      }
      return sum;
    }  else if (type === 't') {
      let sum = [];
      sched.forEach((s, index) => {
        for (let t of this.nflTeams){
          if (s.schedule.homeTeam.id != mainTeam &&
            s.schedule.homeTeam.id === t.id) {
            if (index+1 === bye) sum.push({printName: 'BYE ', oRank: 'BYE', dRank: 'BYE', name: bye}); 
            sum.push({printName: '@'+t.abbreviation+' ', oRank: t.offenseRankLs, dRank: t.defenseRankLs, name: t.abbreviation});
          } else if (s.schedule.awayTeam.id != mainTeam &&
            s.schedule.awayTeam.id === t.id) {
            if (index+1 === bye) sum.push({printName: 'BYE ', oRank: 'BYE', dRank: 'BYE', name: bye}); 
            sum.push({printName: 'vs'+t.abbreviation+' ', oRank: t.offenseRankLs, dRank: t.defenseRankLs, name: t.abbreviation});
          }
        }
      })
      return sum;
    }  else if (type === 'wop') {
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
      return sum;
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
      return sum;
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
      return sum;
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
      return sum;
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
      return sum;
    }
  }

  public getRank(schedules) {

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
            team.otr = index + 1;
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
            team.osh = index + 1;
          }         
        }
      });

        schedules.forEach((item, index) => {
          for (let team of this.nflTeams) {
            if (schedules[index].team === team.id) { 
              team.dToughnessRank = schedules[index].dToughnessRank;
              team.oToughnessRank = schedules[index].oToughnessRank;
              team.scheduleTicker = schedules[index].scheduleTicker;
              team.dToughnessFhRank = schedules[index].dToughnessFhRank;
              team.oToughnessFhRank = schedules[index].oToughnessFhRank;
              team.dToughnessShRank = schedules[index].dToughnessShRank;
              team.oToughnessShRank = schedules[index].oToughnessShRank;
              team.weekOpponent = schedules[index].weekOpponent;
            }
          }
        });
    }
  }

  public sortSchedules(schedules, week, headers) {
  
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
      };
    
      forkJoin(
        this.nflTeams.map(
          g => 
          
          this.http.get(`https://api.mysportsfeeds.com/v2.1/pull/nfl/2021-2022-regular/games.json?team=${g.abbreviation}`, { headers })
          
        )
      )
      .subscribe(res => {
        //console.log(res, 'get team schedules...');
        res.forEach((item, index) => { 
          team = this.nflTeams[index].id;
          bye = this.nflTeams[index].bye;
          abbreviation = this.nflTeams[index].abbreviation;
          teamSchedule = {
            team: team,
            abbreviation: abbreviation,
            schedule: res[index]['games'],
            dToughnessRank: this.getSchedToughness(res[index]['games'], 'd', team, bye, week),
            oToughnessRank: this.getSchedToughness(res[index]['games'], 'o', team, bye, week),
            dToughnessFhRank: this.getSchedToughness(res[index]['games'], 'dfh', team, bye, week),
            oToughnessFhRank: this.getSchedToughness(res[index]['games'], 'ofh', team, bye, week),
            dToughnessShRank: this.getSchedToughness(res[index]['games'], 'dsh', team, bye, week),
            oToughnessShRank: this.getSchedToughness(res[index]['games'], 'osh', team, bye, week),
            scheduleTicker: this.getSchedToughness(res[index]['games'], 't', team, bye, week),
            weekOpponent: this.getSchedToughness(res[index]['games'], 'wop', team, bye, week)
          }
          schedules.push(teamSchedule);
          this.getRank(schedules);
        })
    
      }, (err: HttpErrorResponse) => {       
        console.log(err, 'error ranking teams');
      });
    }
  }

  public rank(nflTeams, stats, week) {
    let dataO = [];
    let rankO = [];
    let rank2O = [];
    let tRankO = [];
    dataO = stats;

    let dataD = [];
    let rankD = [];
    let rank2D = [];
    let tRankD = [];
    dataD = stats;

    rankO = dataO.slice().sort((a: any, b: any) => {
      if ((a['stats'].rushing.rushYards + a['stats'].passing.passNetYards
      + (parseInt(week) < 15 && a.bye < parseInt(week) ? 350 : 0))
      >= (b['stats'].rushing.rushYards + b['stats'].passing.passNetYards + (parseInt(week) < 15 && b.bye < parseInt(week) ? 350 : 0))) {
        return -1;
      } else if ((a['stats'].rushing.rushYards + a['stats'].passing.passNetYards
      + (parseInt(week) < 15 && a.bye < parseInt(week) ? 350 : 0))
      <= (b['stats'].rushing.rushYards + b['stats'].passing.passNetYards + (parseInt(week) < 15 && b.bye < parseInt(week) ? 350 : 0))) {
        return 1;
      } else {
        return 0;
      }
  });

  rank2O = dataO.slice().sort((a: any, b: any) => {
    // console.log('rank Sacks and Picks');
    //TODO add FG made to algo
    if ((a['stats'].passing.passTD + a['stats'].rushing.rushTD
    + (parseInt(week) < 15 && a.bye < parseInt(week) ? 3 : 0)) 
     >= (b['stats'].passing.passTD + b['stats'].rushing.rushTD + (parseInt(week) < 15 && b.bye < parseInt(week) ? 3 : 0))) {
      return -1;
    } else if ((a['stats'].passing.passTD + a['stats'].rushing.rushTD
    + (parseInt(week) < 15 && a.bye < parseInt(week) ? 3 : 0)) 
     <= (b['stats'].passing.passTD + b['stats'].rushing.rushTD + (parseInt(week) < 15 && b.bye < parseInt(week) ? 3 : 0))) {
      return 1;
    } else {
      return 0;
    }
  });

  rankO.forEach(function(item, index){
    for (let team of nflTeams) {
     if (rankO[index].team.id === team.id) { 
       team.oRank = index + 1;
       team.stats = rankO[index].stats;
     }
    }
  });

  rank2O.forEach(function(item, index){
    for (let team of nflTeams) {
     if (rank2O[index].team.id === team.id) { 
       team.tdRank = index + 1; 
     }
    }
  });

  tRankO = nflTeams.slice().sort((a: any, b: any) => {
    // console.log('rank teams final');
    if (a.oRank + a.tdRank
    <= b.oRank + b.tdRank) {
      return -1;
    } else if (a.oRank + a.tdRank
    >= b.oRank + b.tdRank) {
      return 1;
    } else {
      return 0;
    }
  });
  //console.log('team rank', tRankO);

  tRankO.forEach(function(item, index){
    for (let team of nflTeams) {
      if (tRankO[index].id === team.id) { 
        team.offenseRankLs = index + 1; 
      }
    }
  });

  rankD = dataD.slice().sort((a: any, b: any) => {
    if ((a['stats'].standings.pointsAgainst + 
    (parseInt(week) < 15 && a.bye < parseInt(week) ? 21 : 0)) 
     <= (b['stats'].standings.pointsAgainst + 
     (parseInt(week) < 15 && b.bye < parseInt(week) ? 21 : 0))) {
      return -1;
    } else if ((a['stats'].standings.pointsAgainst + 
    (parseInt(week) < 15 && a.bye < parseInt(week) ? 21 : 0)) 
     >= (b['stats'].standings.pointsAgainst + 
     (parseInt(week) < 15 && b.bye < parseInt(week) ? 21 : 0))) {
      return 1;
    } else {
      return 0;
    }
  });

  rank2D = dataD.slice().sort((a: any, b: any) => {
    // console.log('rank Sacks and Picks');
    if ((a['stats'].tackles.sacks + a['stats'].interceptions.interceptions + a['stats'].interceptions.passesDefended 
    + (parseInt(week) < 15 && a.bye < parseInt(week) ? 7 : 0))
     >= (b['stats'].tackles.sacks + b['stats'].interceptions.interceptions + b['stats'].interceptions.passesDefended 
     + (parseInt(week) < 15 && b.bye < parseInt(week) ? 7 : 0))) {
      return -1;
    } else if ((a['stats'].tackles.sacks + a['stats'].interceptions.interceptions + a['stats'].interceptions.passesDefended 
    + (parseInt(week) < 15 && a.bye < parseInt(week) ? 7 : 0))
     <= (b['stats'].tackles.sacks + b['stats'].interceptions.interceptions + b['stats'].interceptions.passesDefended 
     + (parseInt(week) < 15 && b.bye < parseInt(week) ? 7 : 0))) {
      return 1;
    } else {
      return 0;
    }
  });

  rankD.forEach(function(item, index){
    for (let team of nflTeams) {
     if (rankD[index].team.id === team.id) { 
       team.dRank = index + 1;
       team.stats = rankD[index].stats;
     }
    }
  });

  rank2D.forEach(function(item, index){
    for (let team of nflTeams) {
     if (rank2D[index].team.id === team.id) { 
       team.sackRank = index + 1; 
     }
    }
  });

  tRankD = nflTeams.slice().sort((a: any, b: any) => {
    // console.log('rank teams final');
    if ((a.dRank + a.sackRank)
    <= (b.dRank + b.sackRank)) {
      return -1;
    } else if ((a.dRank + a.sackRank)
    >= (b.dRank + b.sackRank)) {
      return 1;
    } else {
      return 0;
    }
  });
  
  //console.log('team rank D', tRankD);
  tRankD.forEach(function(item, index){
    for (let team of nflTeams) {
      if (tRankD[index].id === team.id) { 
        team.defenseRankLs = index + 1; 
      }
    }
  });

  //return this.nflTeams = nflTeams;
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

  public offenseFp(player) { 
    if (player.player.primaryPosition != 'K' && player.stats.receiving != null) {
      player.stats.receiving.fanDuelFP = player.stats.gamesPlayed > 0 && player.stats.twoPointAttempts != null ? ((player.stats.twoPointAttempts.twoPtPassMade + player.stats.twoPointAttempts.twoPtPassRec + player.stats.twoPointAttempts.twoPtRushMade * 2) - (player.stats.fumbles.fumLost * 2) + (player.stats.fumbles.fumTD * 6) - (player.stats.passing.passInt) + (player.stats.kickoffReturns.krTD * 6) + (player.stats.puntReturns.prTD * 6) + (player.stats.passing.passTD * 4) + (player.stats.passing.passYards * 0.04) + (player.stats.receiving.receptions * 0.5) + (player.stats.receiving.recTD * 6) + (player.stats.receiving.recYards * 0.1) + (player.stats.rushing.rushTD * 6) + (player.stats.rushing.rushYards * 0.1)).toFixed(2) : 0;
      player.stats.receiving.fanDuelFPA = player.stats.gamesPlayed > 0 ? Math.floor(parseInt(player.stats.receiving.fanDuelFP) / player.stats.gamesPlayed) : 0;
    } 
    
    if (player.player.primaryPosition === 'K' && player.stats.fieldGoals != null) {
      player.stats.fieldGoals.fanDuelFP = player.stats.gamesPlayed > 0 ? ((player.stats.extraPointAttempts.xpMade) + (player.stats.fieldGoals.fgMade1_19 + player.stats.fieldGoals.fgMade20_29 + player.stats.fieldGoals.fgMade30_39 * 3) + (player.stats.fieldGoals.fgMade40_49 * 4) + (player.stats.fieldGoals.fgMade50Plus * 5)).toFixed(2) : 0;
      player.stats.fieldGoals.fanDuelFPA = player.stats.gamesPlayed > 0 ? Math.floor(parseInt(player.stats.fieldGoals.fanDuelFP) / player.stats.gamesPlayed) : 0;
    }
  }


  public offDailyFp(mdata, daily) {
    if (mdata.player.primaryPosition != 'K' && mdata.stats.receiving != null) {
      mdata.stats.fanDuelDFP = daily.stats.twoPointAttempts != null ? ((daily.stats.twoPointAttempts.twoPtPassMade + daily.stats.twoPointAttempts.twoPtPassRec + daily.stats.twoPointAttempts.twoPtRushMade * 2) - (daily.stats.fumbles.fumLost * 2) + (daily.stats.fumbles.fumTD * 6) - (daily.stats.interceptions.interceptions) + (daily.stats.kickoffReturns.krTD * 6) + (daily.stats.puntReturns.prTD * 6) + (daily.stats.passing.passTD * 4) + (daily.stats.passing.passYards * 0.04) + (daily.stats.receiving.receptions * 0.5) + (daily.stats.receiving.recTD * 6) + (daily.stats.receiving.recYards * 0.1) + (daily.stats.rushing.rushTD * 6) + (daily.stats.rushing.rushYards * 0.1)).toFixed(2) : 0;
    }
  }

}


