import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private router = new BehaviorSubject('');
  currentRouter = this.router.asObservable();
  constructor(private _http:HttpClient) { }
  getTeams(){
    return this._http.get('/api/teams')
  }
  getSeasonStats(){
    return this._http.get('/api/seasons')
  }
  changeParentRoute(data:string){
    this.router.next(data)
  }
  getPlayerStatsByTeam(data){
    return this._http.get('/api/teams/'+data+'/players')
  }
}
