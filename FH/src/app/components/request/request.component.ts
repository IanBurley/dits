import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap} from 'rxjs'
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { DonationRequest } from 'src/app/models/request.module';
import {uuidv4} from '@firebase/util'
import { UsersService } from 'src/services/users.service';

interface RequestType{
  type: string;
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit{
  user$ = this.usersService.currentUserProfile$;
  constructor(private usersService: UsersService,private router: Router){

  }
  request: DonationRequest = {type: '',notes: '',id:'',dateinserted:'', requesterName: ''};
  requestForm = new FormGroup({
    requesttype: new FormControl<string | null>(null,Validators.required),
    requestnotes: new FormControl('',Validators.required)


  })
  ngOnInit(): void{

  }
  types: RequestType[] = [
    {type: 'Furniture'},
    {type: 'Canned Goods'},
    {type: 'Hygeine Products'},
    {type: 'Home Goods'},
    {type: 'Electronics'},
    {type: 'Other'}
  ]

  clickSubmit(){
    if(!this.requestForm.valid){
      return;
    }
    const type = this.requestForm.get('requesttype')?.value!;
    const notes = this.requestForm.get('requestnotes')?.value ?? '';
    const id = uuidv4();
    const date1 = new Date().toISOString();
    this.request.type = type;
    this.request.notes = notes;
    this.request.id = id;
    this.request.dateinserted = date1;
    console.log(this.request);
    this.user$.pipe(tap((user)=>{

      if(user){
        console.log('MUFFIN', user?.uid);
        if (user.displayName) {
          this.request.requesterName = user.displayName;
        }
        this.usersService.addRequest(this.request,user?.uid)
      }
    })).subscribe();
    this.requestForm.reset();
  }

}
