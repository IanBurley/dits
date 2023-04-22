import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { UsersService } from 'src/services/users.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { ApexGrid,ColumnConfiguration } from 'apex-grid';
import { DonationRequest } from 'src/app/models/request.module';

import { tap} from 'rxjs'
ApexGrid.register();
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  allrequest: DonationRequest[] = [];
  gridcolumn: ColumnConfiguration<DonationRequest>[] = [
    {key: 'type', type:'string',sort:true,filter:true},
    {key: 'notes', type:'string',sort:true,filter:true},
    {key: 'dateinserted', type:'string',sort:true,filter:true},
  ]
  constructor(private usersService:UsersService) { }
  ngOnInit(){
  this.usersService.getRequests().pipe(
    tap((request) =>{
      if(request){
        console.log(request);
        this.allrequest = request;
      }
    })
  ).subscribe()

}
}
