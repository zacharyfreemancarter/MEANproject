import { Component, OnInit, ChangeDetectorRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service';
import {Chart} from 'chart.js'

@Component({
  selector: 'app-seasonchart',
  templateUrl: './seasonchart.component.html',
  styleUrls: ['./seasonchart.component.css']
})
export class SeasonchartComponent implements OnInit {
  @ViewChild('seasonChart', {static: true}) private chartRef;
  @Output() routeChanger = new EventEmitter;
  selectedStat:any = "Score"
  stats:any = [];
  teams:any = [];
  stat:any =[];
  chart:any;
  errorMessage:any;
  colors:any=[];
  bordercolors:any=[];
  colordata
  selectedTeam:any="ARI";
  constructor(private _httpService: HttpService, private chRef: ChangeDetectorRef) { }
  ngOnInit() {
    this.getSeasonStatsFromService()
    this.getTeamsFromService()
  }
  getTeamsFromService(){
    this._httpService.getTeams().subscribe(res=>{
      console.log('where are the colors?',res)
      this.colordata = res
      for(let i =0; i<this.colordata.length; i++){
        this.colors.push('#'+this.colordata[i].PrimaryColor)
        this.bordercolors.push('#'+this.colordata[i].SecondaryColor)
      }
      console.log(this.colors)
    })
  }
  getSeasonStatsFromService(){
    this._httpService.getSeasonStats().subscribe(res=>{
      this.stats=res
      console.log("chart stats",this.stats)
      this.stats.forEach(y => {
        this.teams.push(y.Team)
        this.stat.push(y[this.selectedStat])
      });
      this.chart = new Chart(this.chartRef.nativeElement, {
        type: 'bar',
        data: {
          labels: this.teams,
          datasets: [
            {
              data:this.stat,
              borderColor: this.bordercolors,
              fill:false,
              backgroundColor:this.colors
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      }
      )
    })
  }
  reloadChart(){
    this._httpService.getSeasonStats().subscribe(res=>{
      this.stats=res
      this.stat=[]
      this.stats.forEach(y=>{
        this.stat.push(y[this.selectedStat])
      })
      console.log(this.stat)
      this.chart.data.datasets[0].data = this.stat
      this.chart.update()
    })
  }
  selectTeam(){
    console.log(this.selectedTeam)
    this._httpService.changeParentRoute('team/'+this.selectedTeam)
  }
}
