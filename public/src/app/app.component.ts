import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'public';
  teams:any;
  team:any;
  currentRouter:any;
  constructor(private _httpService: HttpService, private router:Router){
  }
  ngOnInit(){
    this._httpService.currentRouter.subscribe(router => {
        this.currentRouter = router
        console.log('from parent',this.currentRouter)
        this.router.navigate([this.currentRouter])
      })
    this.getTeamsFromService()
  }
  getTeamsFromService(){
    this._httpService.getTeams().subscribe(res=>{
      this.teams=res
    })
  }
}
