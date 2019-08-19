import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flow-movable-renameable',
  templateUrl: './flow-movable-renameable.component.html',
  styleUrls: ['./flow-movable-renameable.component.css']
})
export class FlowMovableRenameableComponent implements OnInit {

  constructor() { }

  isEditable: boolean = false

  ngOnInit() {
  }

  process:any = {
    shape: 'flow',
    name: 'Flow',
    positionX: '0',
    positionY: '0'
  }

  setEditable() {
    this.isEditable = !this.isEditable
  }
}
