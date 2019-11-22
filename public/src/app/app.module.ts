import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SeasonstatsComponent } from './seasonstats/seasonstats.component';
import { SeasonchartComponent } from './seasonchart/seasonchart.component';
import { TeamstatsComponent } from './teamstats/teamstats.component';
import { LeadersComponent } from './leaders/leaders.component';


@NgModule({
  declarations: [
    AppComponent,
    SeasonstatsComponent,
    SeasonchartComponent,
    TeamstatsComponent,
    LeadersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
