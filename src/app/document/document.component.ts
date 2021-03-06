import { Component, OnInit, Input } from '@angular/core';

import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  @Input() draggable?: boolean = true

  process:any = {
    shape: 'document',
    name: 'Document',
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

  stopEdit() {
    this.isEditable = false
  }

  onKeyDown(event) {
    this.stopEdit()
  }

}
