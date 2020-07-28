import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  constructor() { }
  public tour1:string="MYSTERIES OF EGYPT"
  public tour2:string="EGYPT WITH HURGHADA"
  public tour3:string="SOUTH AFRICA WITH PILANESBERG NATIONAL PARK"
  public tour4:string="ADVENTURE SPECIAL SOUTH AFRICA"
  public tour5:string="SOUTH AFRICA WITH VICTORIA FALLS"
  public tour6:string="SOUTH AFRICA KENYA WITH VICTORIA FALLS"
  ngOnInit() {
    window.scrollTo(0, 0)
  }

}
