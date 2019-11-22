import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seasonstats',
  templateUrl: './seasonstats.component.html',
  styleUrls: ['./seasonstats.component.css']
})
export class SeasonstatsComponent implements OnInit {
  stats:any;
  errorMessage:any;
  constructor(private router:Router, private _httpService: HttpService, private chRef: ChangeDetectorRef) { }
  ngOnInit() {
    this.loadScript('../assets/js/sortabletable.js')
    this.getSeasonStatsFromService()
  }
  getSeasonStatsFromService(){
    this._httpService.getSeasonStats().subscribe(res=>{
      this.stats=res
      console.log(this.stats)
    },error=>{ this.errorMessage = <any>error},
    ()=>{
      this.chRef.detectChanges();
      console.log('loading script')
      this.loadScript('../assets/js/sortabletable.js')
    }
    )
  }
  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
}
