import { Component, OnInit, Input } from '@angular/core';

import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {

  @Input() draggable?: boolean = true

  process:any = {
    shape: 'rectangle',
    name: 'process',
    positionX: '0',
    positionY: '0'
  }

  isEditable: boolean = false
  
  constructor(private sharedService: SharedService) { 
    this.sharedService.getClickEvent().subscribe((message: string) => {
      console.log(message)
      this.isEditable = false
    })
  }

  ngOnInit() {
  }

  dragStart(evt) {
    // alert('drag started')
    console.log(evt.target.id)
    let data: any = {}
    data.id = evt.target.id
    data.process = this.process
    evt.dataTransfer.setData("text/plain", JSON.stringify(data));
  } 

  startEdit() {
    this.isEditable = true
  }

}
