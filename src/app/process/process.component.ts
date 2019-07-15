import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { SharedService } from '../shared/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit, OnDestroy {

  @Input() draggable?: boolean = true
  @Input() id?: string = this.getUniqueId()

  process:any = {
    shape: 'rectangle',
    name: 'Process',
    positionX: '0',
    positionY: '0'
  }

  model =  'Process'

  isEditable: boolean = false
  dropCompleted: boolean = false

  subscription1: Subscription
  subscription2: Subscription
  
  constructor(private sharedService: SharedService) { 
    this.subscription1 = this.sharedService.getEvent().subscribe((message: any) => {
      console.log(message)
      this.isEditable = false
    })

    this.subscription2 = this.sharedService.getDropCompleted().subscribe((message: any)  => {
      this.dropCompleted = true
    })
  }

  getUniqueId() {
    return 'id-' + Math.random().toString(36).substr(2, 16)
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subscription1) {
      this.subscription1.unsubscribe()
    }

    if (this.subscription2) {
      this.subscription2.unsubscribe()
    }
  }

  dragStart(evt) {
    if (this.draggable) {
      let data: any = {}
      data.id = evt.target.id
      data.process = this.process
      evt.dataTransfer.setData("text/plain", JSON.stringify(data));
    }
  } 

  startEdit() {
    this.isEditable = true
  }

  stopEdit() {
    this.isEditable = false
  }

  onKeyDown(event) {
    this.stopEdit()
  }

}
