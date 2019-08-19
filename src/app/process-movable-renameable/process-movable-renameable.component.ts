import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process-movable-renameable',
  templateUrl: './process-movable-renameable.component.html',
  styleUrls: ['./process-movable-renameable.component.css']
})
export class ProcessMovableRenameableComponent implements OnInit {

  constructor() { }

  isEditable: boolean = false

  process:any = {
    shape: 'rectangle',
    name: 'Process',
    positionX: '0',
    positionY: '0'
  }

  setEditable() {
    this.isEditable = !this.isEditable
  }

  ngOnInit() {
  }

  onMoveUpdate(e) {
    console.log('received updated move object');
    
    console.log(e);
    
  }

}
