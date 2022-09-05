import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FirebaseService,
LocalStorageService } from '../../services/index';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Input('tweetsData')
  public tweetsData         :Array<any>
  @Input('teams')
  public teams              :Array<any>
  @Input('title')
  public title              :string
  @Input('type')
  public type               :string
  @Input('modalType')
  public modalType          :string
  @Input('area')
  public area               :string
  @Input('noPosts')
  public noPosts            :any
  @Input('submitting')
  public submitting         :any
  @Input('name')
  public name               :any
  @Input('sport')
  public sport              :any
  @Input('selectedPlayer')
  public selectedPlayer     :any
  @Input('image')
  public image              :any
  @Input('isOpen')
  public isOpen             :any
  @Input('selectedWeek')
  public selectedWeek       :any
  @Input('selectedDate')
  public selectedDate       :any
  @Input('timeSpan')
  public timeSpan             :any
  @Output() close = new EventEmitter()
  public signedIn: any
  public wl: any
  public favorites: any
  public showSnack: boolean
  public wlAlert: string

  public user = {
    email: '',
    password: ''
  };

  constructor(public fbService: FirebaseService, public ls: LocalStorageService) {
    this.showSnack = false
    this.wlAlert = ""
    this.wl = []
    this.wl = this.ls.get('watchList')
    this.favorites = this.ls.get('favorites')
   }

  public watchList(item, name, sport, data, title) {  

    if (data != null) {
      //console.log(data, 'selectedData')
      if (title === 'watchList') {
        if (this.ls.doesExist(data, item.player.id)) {
          console.log('already exists', item.player.id, this.ls.doesExist(data, item.player.id))
          this.showSnack = true
          this.wlAlert = `${name} is already watched.`
          setTimeout(()=> {
            this.showSnack = false
            this.wlAlert = ""
          }, 2950)
          return
        }
      } 
    }
  
    if (this.wlAlert === "" && !this.showSnack) {
      console.log('add item and set', item)
      this.ls.add(data, item, sport, this.selectedWeek, title)
      this.ls.set(title, data)

      this.showSnack = true
      this.wlAlert = `Player Added`
      setTimeout(()=> {
        this.showSnack = false
        this.wlAlert = ""
      }, 2950)
    } 
  }

  public unwatch(item, data, title) {
    this.ls.remove(item, data, title)
  }

  public closeModal() {
    this.isOpen = false
    this.close.emit() 
  }

  public signIn() {
    this.fbService.signInRegular(this.user.email, this.user.password)
    .then((res) => {
      //console.log(res);
      this.signedIn = res;
    })
    .catch((err) => console.log('error: ' + err));
  }

  ngOnInit(): void {
  }

}
