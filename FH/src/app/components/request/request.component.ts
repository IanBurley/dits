import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';

interface RequestType{
  type: string
}
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {

  requestForm = new FormGroup({
    type: new FormControl<RequestType | null>(null,Validators.required),
    notes: new FormControl('',Validators.required)


  })
  types: RequestType[] = [
    {type: 'Furniture'},
    {type: 'Canned Goods'},
    {type: 'Hygeine Products'},
    {type: 'Home Goods'},
    {type: 'Electronics'},
    {type: 'Other'}
  ]
}
