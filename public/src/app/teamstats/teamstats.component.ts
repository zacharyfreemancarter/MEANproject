import { Component, OnInit, ChangeDetectorRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service';
import {Chart} from 'chart.js'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-teamstats',
  templateUrl: './teamstats.component.html',
  styleUrls: ['./teamstats.component.css']
})
export class TeamstatsComponent implements OnInit {
  @ViewChild('pieChart', {static: true}) private chartRef;
  @ViewChild('radarChart', {static: true}) private chartRef2;
  @Output() routeChanger = new EventEmitter;
  @Output() teamEmit = new EventEmitter;
  selectedTeam:any;
  selectedPlayer:any;
  selectedPlayerStats:any;
  teams:any=[]
  teamColors:any=[]
  playerStats:any=[]
  pieData:any =[];
  pieLabels:any=[];
  pieChart:any;
  pieColor:any=[]
  radarData:any=[];
  radarLabels:any=[];
  radarTitle:string;
  radarChart:any;
  selectedStat:any="FantasyPoints";
  leader1stat="ReceivingYards"
  leader2stat="RushingYards"
  leaders1:any =[];
  leaders2:any=[];
  leaderData:any=[];
  constructor(private _router:Router, private _httpService: HttpService, private chRef: ChangeDetectorRef, private _route:ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe(
      (params)=>{
        this.selectedTeam = params.get('name')
      }
    )
    this.getTeamsFromService()
    this.getPlayerStatsByTeamFromService()
    console.log('here')
  }
  getTeamsFromService(){
    this._httpService.getTeams().subscribe(res=>{
      this.teams = res;
      for(let i=0;i<this.teams.length;i++){
        this.teamColors.push({'Key': this.teams[i].Key, 'Color':this.teams[i].PrimaryColor})
      }
    })
  }
  getPlayerStatsByTeamFromService(){
    this._httpService.getPlayerStatsByTeam(this.selectedTeam).subscribe(res=>{
      this.playerStats = res
      this.selectDefault()
      console.log(this.playerStats)
      this.createPieChart()
      this.findLeaders()
    })
  }
  updateChart(){
    this._httpService.getPlayerStatsByTeam(this.selectedTeam).subscribe(res=>{
      this.playerStats = res
      this.selectDefault()
      this.pieChart.labels = []
      console.log(this.playerStats)
      this.pieColor= []
      this.pieData = []
      this.pieLabels = []
      this.playerStats.forEach(y => {
        if(y[this.selectedStat]>0){
          this.pieData.push(y[this.selectedStat])
          this.pieLabels.push(y.ShortName)
          this.pieColor.push(this.getRandomColor())
        }
      })
      this.pieChart.options.title.text = this.selectedTeam+' '+this.selectedStat
      this.pieChart.data.datasets[0].data = this.pieData
      this.pieChart.data.datasets[0].backgroundColor = this.pieColor
      this.pieChart.data.labels = this.pieLabels
      console.log(this.pieChart.data.datasets[0].data, this.pieChart.data.datasets[0].backgroundColor,this.pieChart.data.labels)
      this.pieChart.update()
      console.log(this.pieChart)
    })
  }
  createPieChart(){
    this.pieColor= []
    this.pieData = []
    this.pieLabels = []
    this.playerStats.forEach(y => {
      if(y[this.selectedStat]>0){
        this.pieData.push(y[this.selectedStat])
        this.pieLabels.push(y.ShortName)
        this.pieColor.push(this.getRandomColor())
      }
    })
    console.log(this.pieData, this.pieLabels)
    this.pieChart = new Chart(this.chartRef.nativeElement,{
      type:'pie',
      data: {
        labels: this.pieLabels,
        datasets: [
          {
            data:this.pieData,
            fill:false,
            backgroundColor:this.pieColor
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: this.selectedTeam+' '+this.selectedStat
        }
      }
    })
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  changeTeam(){
    this._httpService.changeParentRoute('team/'+this.selectedTeam)
    this._route.paramMap.subscribe(
      (params)=>{
        this.selectedTeam = params.get('name')
        this.updateChart()
        this.findLeaders()
      }
    )
    console.log('RELOAD')
  }
  changeStat(){
    this.pieChart.labels = []
    console.log(this.playerStats)
    this.pieColor= []
    this.pieData = []
    this.pieLabels = []
    this.playerStats.forEach(y => {
      if(y[this.selectedStat]>0){
        this.pieData.push(y[this.selectedStat])
        this.pieLabels.push(y.ShortName)
        this.pieColor.push(this.getRandomColor())
      }
    })
    this.pieChart.options.title.text = this.selectedTeam+' '+this.selectedStat
    this.pieChart.data.datasets[0].data = this.pieData
    this.pieChart.data.datasets[0].backgroundColor = this.pieColor
    this.pieChart.data.labels = this.pieLabels
    console.log(this.pieChart.data.datasets[0].data, this.pieChart.data.datasets[0].backgroundColor,this.pieChart.data.labels)
    this.pieChart.update()
  }
  changePlayer(){
    this.selectedPlayerStats = this.playerStats.find(player => player.PlayerID === Number(this.selectedPlayer))
    this.updateRadarChart()
  }
  selectDefault(){
    for(let i =0; i<this.playerStats.length; i++){
      if(this.playerStats[i].Position = 'QB'){
        this.selectedPlayer = this.playerStats[i].PlayerID
        this.selectedPlayerStats = this.playerStats.find(player => player.PlayerID === Number(this.selectedPlayer))
        break
      }
    }
    console.log('defaulted to:', this.selectedPlayerStats)
    this.createRadarChart()
  }
  createRadarChart(){
    this.radarData = []
    this.radarLabels = []
    this.radarData=[
      this.selectedPlayerStats.FantasyPoints+Math.floor(Math.random()*500),
      this.selectedPlayerStats.PassingYards+Math.floor(Math.random()*500),
      this.selectedPlayerStats.PassingRating+Math.floor(Math.random()*500),
      this.selectedPlayerStats.RushingYards+Math.floor(Math.random()*500),
      this.selectedPlayerStats.RushingYardsPerAttempt+Math.floor(Math.random()*500),
      this.selectedPlayerStats.ReceivingYards+Math.floor(Math.random()*500),
      this.selectedPlayerStats.ReceivingYardsPerAttempt+Math.floor(Math.random()*500)
    ];
    this.radarLabels=[
      'FantasyPoints',
      'PassingYards',
      'PassingRating',
      'RushingYards',
      'RushingYardsPerAttempt',
      'ReceivingYards',
      'ReceivingYardsPerAttempt'
    ]
    this.radarChart = new Chart(this.chartRef2.nativeElement,{
      type:'radar',
      data: {
        labels: this.radarLabels,
        datasets: [
          {
            label: this.selectedPlayerStats.ShortName+' - '+this.selectedPlayerStats.Position,
            data:this.radarData
          }
        ]
      },
      options: {
        title: {
          display: false,
          text: this.selectedPlayerStats.ShortName+' - '+this.selectedPlayerStats.Position
        }
      }
    })
  }
  updateRadarChart(){
    console.log('update', this.selectedPlayer)
    this.radarData=[
      this.selectedPlayerStats.FantasyPoints+Math.floor(Math.random()*500),
      this.selectedPlayerStats.PassingYards+Math.floor(Math.random()*500),
      this.selectedPlayerStats.PassingRating+Math.floor(Math.random()*500),
      this.selectedPlayerStats.RushingYards+Math.floor(Math.random()*500),
      this.selectedPlayerStats.RushingYardsPerAttempt+Math.floor(Math.random()*500),
      this.selectedPlayerStats.ReceivingYards+Math.floor(Math.random()*500),
      this.selectedPlayerStats.ReceivingYardsPerAttempt+Math.floor(Math.random()*500)
    ];
    this.radarChart.data.datasets[0].data=this.radarData;
    this.radarChart.data.datasets[0].label = this.selectedPlayerStats.ShortName+' - '+this.selectedPlayerStats.Position
    this.radarChart.update()
  }
  findLeaders(){
    this.leaders1=[]
    this.leaders2=[]
    var leaders1 =  this.playerStats.sort((a,b)=> (a[this.leader1stat] < b[this.leader1stat]) ? 1 : -1)
    var leaders2 =  this.playerStats.sort((a,b)=> (a[this.leader2stat] < b[this.leader2stat]) ? 1 : -1)
    for(let i = 0; i<5; i++){
      this.leaders1.push({'Name': leaders1[i].ShortName, 'Stat': leaders1[i][this.leader1stat]})
      this.leaders2.push({'Name': leaders2[i].ShortName, 'Stat': leaders2[i][this.leader2stat]})
    }
  }
}