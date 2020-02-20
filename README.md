# Starting NHL Goalies and NBA Starters Angular 9 MySportsFeeds API, Heroku - <a href="https://www.fantasy-sports-resources.com">Demo</a> 
This is a single page app which uses the [MySportsFeeds API](https://www.mysportsfeeds.com/data-feeds/api-docs/#) to get starting NHL goalie data. 

### Description
This [application](https://nhl-starting-goalies-angular.herokuapp.com/) is made with Angular (version 9.0.0) and the most current version of angular material2. This SPA app is hosted for free on Heroku (cloud application platform). The data is sourced through the [MySportsFeeds API](https://www.mysportsfeeds.com/data-feeds/api-docs/#).

This app can help explain how to fetch data using [Angular's HttpClient Module](https://angular.io/guide/http) from a robust api.  

### You can learn this
* Create user authentication on firebase.
* Get realtime data updates from firebase. 
* Use twitter API to get player updates.   
* [Use the HttpClient module to connect to an api and get data returned in milliseconds.](https://www.ianposton.com/angular4-httpclient/)
* [Deploy an Angular 9 app to Heroku.](https://www.ianposton.com/angular4-deploy-to-heroku/) 
* Encrypy/Decrypt heroku config vars with Crypto-js.

### Software used for this application
* Angular (version 9.0.0) 
* Angular CLI (version 9.0.1)
* Node.js (version 10.16.2)     
* [angular material2](https://github.com/angular/material2) (version 5.2.3)
* Heroku [Set up a free account ](https://www.heroku.com/)
* [Firebase](https://firebase.google.com/) (version 4.10.1) 
* AngularFire2 (version 5.0.0-rc.6)
* [ng2share](https://github.com/cedvdb/ng2share) (version 1.3.6) 
* NPM (version 5.6.0)
* Heroku Client (version 3.0.3)
* rxjs (version 5.5.6)
* [MySportsFeeds API](https://www.mysportsfeeds.com/data-feeds/api-docs/#)

### Clone and serve this app
* First you will need to be given access MySportsFeeds NHL endpoints. As a developer working on a non-commercial app you can be given access to the NHL endpoints. Sign up at MySportsFeeds and use the username and password in the header request to authenticate the api get request. `let headers = new Headers({ "Authorization": "Basic " + btoa('username' + ":" + 'password') });`
* When the api headers are in place clone this repo and run <code>npm install</code> then run <code>ng serve</code> to serve the app on `localhost:4200`. Be careful not to push your api password to github.

### Create user authentication with firebase
The purpose of this app is to show each days confirmed starting NHL goalies. The api provides a best guess and the actual starter does not get updated to until well into game time. This created a lot of false data being represented on this app. I created a system of indicators that work with a Boolean. If a NHl goalie is a guess then I will show an orange expected indicator in my app next to the goalie, if the NHL goalie has been confirmed by his team I will show a green confirmed indicator next to the goalie. 

Since I could not rely on the api to update a confirmed starting goalie fast enough I needed to source my own data and and update the goalie's starting status manually. This means I made my own goalie json file and synced it to the api using each goalies ID. I added an expected and confirmed attribute to each goalie when the app loads. Now I can update those attributes on the ng-model of each goalie and save it to my firebase db. This will get me quicker updates and avoid showing false data by overriding the returned data from the api. 

I created a small cms to allow me to update the goalies status by clicking on their image to toggle true or false. I created a view that can only be accessed by me so that a random user wouldn't be able to make un-wanted changes to my app. In order to lock off this cms admin zone just for me I used firebase to create a special user authentication token. If I use the correct name and password my cms will appear and I can make quick updates right in the view where I want to see them.

* Create a firebase user by going to your firebase console and in the side nav under Develop click on the <code>Authentication</code> option. 
* In Authentication go to the SIGN-IN METHOD tab and enable Email/Password. 
* Then click on USERS tab and click ADD USER button. Enter an email and password.
* [Set up firebase in angular4 app](https://www.ianposton.com/angular4-with-firebase-mysportsfeeds-api-part-3/) (follow first part of this link). 
* Make a firbase service to handle saving data and retrieving data from the db. 

```ts
  
  //firebase.service.ts

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class FirebaseService {

  items: any;
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(public af: AngularFireDatabase, private firebaseAuth: AngularFireAuth) {
    this.items = af.list('/items').valueChanges(); 
    this.user = firebaseAuth.authState;

      this.user.subscribe(
          (user) => {
            if (user) {
              this.userDetails = user;
            }
            else {
              this.userDetails = null;
            }
          }
        );
    
  }

 signInRegular(email, password) {
   const credential = firebase.auth.EmailAuthProvider.credential( email, password );
   return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
 }


  logout() {
    this.firebaseAuth.auth.signOut();
  }


  getData() {
    console.log('getting starter data from firebase...');
    return this.items = this.af.list('/items').valueChanges();
  }
}


```

* Include the firbase service in the app.module.ts in providers. 
* Define the user model in the app.component.ts, create a function and call the function from the html form.

```ts

//app.component.ts

import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  //User Model
  user = {
    email: '',
    password: ''
  };
  
  constructor(private fbService: FirebaseService){}

  public signInWithEmail() {
    this.fbService.signInRegular(this.user.email, this.user.password)
      .then((res) => {
        //success
      })
      .catch((err) => console.log('error: ' + err));
  }


  ngOnInit() {
     
    
  }

}

```

```html

<!-- app.component.html -->

<div class="login-container">
 
  <input type="email" class="form-control" [(ngModel)]="user.email" placeholder="Email" required>
  
  <input type="password" class="form-control" [(ngModel)]="user.password" placeholder="Password" required>

  <button (click)="signInWithEmail()">Login</button>

</div> 

```

The key here is in the firebase service <code>this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)</code> This specifically talks to firebase. If the email and password are correct firebase will return a user object and it can be detected from the firebase service and can be used to show/hide add/edit/delete data features in the client. Using the same html form I can use <code>fbService.userDetails</code> to hide the log in form and show the log out button to end the session. 

```html

<!-- app.component.html -->

<div class="login-container" *ngIf="fbService.userDetails == null">
 
  <input type="email" class="form-control" [(ngModel)]="user.email" placeholder="Email" required>
  
  <input type="password" class="form-control" [(ngModel)]="user.password" placeholder="Password" required>

  <button (click)="signInWithEmail()">Login</button>

</div> 

 
<div *ngIf="fbService.userDetails != null">
 <button (click)="fbService.logout()">Logout</button>
</div>

```

In the next article I will expand a bit more on how to use the user authentication to create an admin area to edit data and update the view in realtime without refreshing the page.

### Get realtime data updates from firebase.

I created a small cms to allow me to update the status of my data by clicking on a image to toggle true or false. I created a view that can only be accessed by an authenticated user so that a random user wouldn't be able to make un-wanted changes to my app. I also adjusted my firebase db rules to only allow write access if authenticated. In order to lock off this cms admin zone just for me I used firebase to create a special user authentication token. If I use the correct email and password that I setup when I added a user to my db, my cms will appear and I can make quick updates right in the view where I want to see them.

* In your firebase db dashboard set db rules to only allow write access if authenticated. Click the RULES tab and add this block of code. 

```js 

{
  "rules": {
    ".read": true,
    ".write": "auth != null"
  }
}

```

* Use the <code>ngIf="fbService.userDetails != null"</code> to show/hide html. Follow instructions above to setup authentication. 

```html

<!-- app.component.html -->

<div *ngIf="fbService.userDetails != null">
  <div class="edit-list-container" *ngIf="fullFirebaseResponse != null">
   
    
    <ul>
     
      <li *ngFor="let group of myData">
        <ul>
          <li *ngFor="let goalie of allGoalies">

            <span *ngIf="goalie[group.player.ID] != null" (click)="goalie[group.player.ID].probable = !goalie[group.player.ID].probable" [(ngModel)]="allGoalies[0][group.player.ID].probable" ngDefaultControl>
            <img src="{{group.player.image}}" alt="">{{group.player.LastName}}</span>

            <span *ngIf="goalie[group.player.ID] != null && goalie[group.player.ID].probable === false" style="color: red">X</span>

            <span *ngIf="goalie[group.player.ID] != null && goalie[group.player.ID].probable === true && goalie[group.player.ID].confirmed === false" (click)="goalie[group.player.ID].confirmed = !goalie[group.player.ID].confirmed" [(ngModel)]="allGoalies[0][group.player.ID].confirmed" ngDefaultControl style="color: orange;">Probable</span>

            <span *ngIf="goalie[group.player.ID] != null && goalie[group.player.ID].probable === true && goalie[group.player.ID].confirmed === true" (click)="goalie[group.player.ID].confirmed = !goalie[group.player.ID].confirmed" [(ngModel)]="allGoalies[0][group.player.ID].confirmed" ngDefaultControl style="color: green;">Confirmed</span>

            <span *ngIf="goalie[group.player.ID] != null">({{group.stats.stats.Wins['#text'] + '-' + group.stats.stats.Losses['#text'] + '-' + group.stats.stats.OvertimeLosses['#text']}})</span>

          </li>
        </ul>
      </li>

    </ul>

    <div>
      <button (click)="save()">Save</button>
    </div>

</div> <!-- END OF AUTHENTICATED ADIM AREA -->

<div *ngFor="let data of showData"> <!-- LIVE VIEW -->
  <span class="player-img"><img src="{{ data.player.image }}"></span> <br>
  <span>{{ data.player.FirstName + ' ' + data.player.LastName }}</span> <br>

  <span *ngIf="fullFirebaseResponse != null && allGoalies[0][data.player.ID] && allGoalies[0][data.player.ID].confirmed === true" style="color: green;">confirmed</span>

   <span *ngIf="fullFirebaseResponse != null && allGoalies[0][data.player.ID] != null && allGoalies[0][data.player.ID].confirmed === false && data.player.startingTodayNow === false" style="color: orange;">expected</span>

</div>
 
```

The idea here is I am using nested `ngFor` loops to access the data by player ID's. The cms is designed to update the true/false values of the player's status by clicking on player image and then clicking the status to toggle its value. Once status is set click save to run a function to save and update firebase data. 

```json

//firebase data

{"Starters": 
  [

    {

      "5176":
      {
        "confirmed": false,
        "probable": false,
        "name": "Philip Grubauer"
      },
      "4863":
      {
        "confirmed": true,
        "probable": true,
        "name": "Braden Holtby"
      },
      "5122":
      {
        "confirmed": false,
        "probable": false,
        "name": "Martin Jones"
      }

    }

  ]
}

```

```ts

//app.component.ts

import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest} from '@angular/common/http'
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  allGoalies: Array <any>;
  fullFirebaseResponse: any;
  
  constructor(private http: HttpClient, private fbService: FirebaseService){
    this.fbService
      .getStarterData()
      .subscribe(res => {

        if (res[0] != null) {
          console.log(res[0], 'got response from firebase...');
          this.fullFirebaseResponse = res[0];
          this.allGoalies = Array.of(res[0][0]);
        }

      })

   // USING MYDATA FROM API TO MATCH IDS WITH CUSTOM FIREBASE DATA
  // USE WITH NESTED NGFOR IN HTML
  this.http.get('https://some.fake.datafeed.com/v1/players')
      .subscribe(res => {
         this.myData = res['cumulativeplayerstats'].playerstatsentry;
      })
  }

 


  ngOnInit() {
     
    
  }

  public save() {

    this.fbService
      .addData(this.fullFirebaseResponse);
     
  }

}

```

I want to point out you may notice I am using brackets to locate my data from the firebase response. This is because this is the way I have designed my data. If your data happens to be different it is not a big deal just adjust where in the res your data lives. For example <code>this.allGoalies = Array.of(res[0][0]);</code> here I am taking the firebase response and asking for the first item in this array and then asking for the first item in that array which is a nested array. Then I am wrapping it in `Array.of` so that it can be processed by `ngFor` in the view.

The `this.fullFirebaseResponse` will keep track of the player status updates as I am using `[(ngModel)]="allGoalies[0][group.player.ID].confirmed"` in the html. `ngModel` has a lengthy description but basically when you want to update data in realtime `ngModel` must exist on the input. In my case I am using a `<span>` tag to track clicks and changes to the data model, for this you will need to add `ngDefaultControl` to the input to avoid angular throwing errors. 

```ts


  //firebase.service.ts

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class FirebaseService {

  items: any;
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(public af: AngularFireDatabase, private firebaseAuth: AngularFireAuth) {
    this.items = af.list('/items').valueChanges(); 
    
    ...
    
  }

...

addData(starters) {
    console.log(starters, 'starters.json in fb service...');
    console.log('deleting data from fb...');
    this.af.list('/items').remove().then(_ => {
      console.log('deleted!');
      this.getStarterData();
    });
    console.log('saving new data to fb...');
    this.af.list('/items').push(starters); 
}


  getData() {
    console.log('getting starter data from firebase...');
    return this.items = this.af.list('/items').valueChanges();
  }
}

``` 

When click save and I call `this.fbService.addData(this.fullFirebaseResponse)` I am passing in the updated firebase response.

**WARNING: First I ask firebase to delete my entire database before saving it again. This is why I am checking `if (res[0] != null)` in my app.component.ts to avoid errors if the new firebase response isn't ready for my view when I ask for it again. I say warning because if you have important data and you have not saved a copy for backup this approach could cause error and you might lose all your data.**

A better approach is to update each item in your data one by one.

For my app I am making updates all the time to a lot of players and this approach works for me by removing everything and making a new db. My data isn't that large so the process is quick. However, I saved backups of my data to my desktop by selecting the export feature from the firebase dropdown menu incase something goes wrong.  

The best thing is as soon as I do this Firebase pulls in the new data to the view my angular component constructor function is hot and watches the change and anyone using this app will see the change without having to refresh the view like magic. I have an app live on heroku and I have made changes to my firebase db and seen the data change realtime on other devices to test this theory. It's a great user experience!

Angular5 and Angular6 have made changes to the http module and also changes to how angular works with the latest firebase modules. I hope to add these updates soon. 




