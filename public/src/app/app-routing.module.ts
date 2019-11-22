import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeasonstatsComponent } from './seasonstats/seasonstats.component';
import { SeasonchartComponent } from './seasonchart/seasonchart.component';
import { TeamstatsComponent } from './teamstats/teamstats.component';



const routes: Routes = [
  {path: '', redirectTo: 'seasons', pathMatch: 'full'},
  {path: 'seasons', component: SeasonstatsComponent, children:[
    {path: 'chart/:id', component:SeasonchartComponent}
  ]},
  {path: 'team/:name', component:TeamstatsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
