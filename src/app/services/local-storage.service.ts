import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public set(title, data) {
    localStorage.setItem(title, JSON.stringify(data))
  }

  public get(title) {
    return localStorage.getItem(title)!= undefined ? JSON.parse(localStorage.getItem(title)) : []
  }

  public doesExist(data, id) {
    //console.log(data, 'data', id, 'id')
    for (let item of data) {
      if(item.id === id) {
        return true
      }
    }
  }

  public add(data, item, sport, selectedDate, title) {
    item.dateAdded = sport === 'nfl' && title === 'nflFavorites' ? selectedDate : new Date().toISOString().slice(0,10)
    item.id = item.player.id
    item.sport = sport
    item.type = sport === 'nfl' && title === 'favorites' ? 'fav' : 'wl'
    data.push(item)
  }

  public remove(item, data, title) {
    console.log('removing item from '+title)
    //console.log(item, 'item', data, 'data')
    data.forEach((player, index) => {
      if(data[index].id === item.id) {
        data.splice(index, 1);
        this.set(title, data)
      }
    })
  }

  public delete(title) {
    return localStorage.removeItem(title)
  }
}
