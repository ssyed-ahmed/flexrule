import { Component, OnInit, Input } from '@angular/core';

import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css']
})
export class FlowComponent implements OnInit {

  @Input() draggable?: boolean = true

  process:any = {
    shape: 'flow',
    name: 'Flow',
    positionX: '0',
    positionY: '0'
  }

  isEditable: boolean = false
  
  constructor(private sharedService: SharedService) { 
    this.sharedService.getEvent().subscribe((message: string) => {
      console.log(message)
      this.isEditable = false
    })
  }

  ngOnInit() {
  }

  dragStart(evt) {
    let data: any = {}
    data.id = evt.target.id
    data.process = this.process
    evt.dataTransfer.setData("text/plain", JSON.stringify(data));
  } 

  startEdit() {
    this.isEditable = true
  }

}
