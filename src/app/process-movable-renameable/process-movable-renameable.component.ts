import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-process-movable-renameable',
  templateUrl: './process-movable-renameable.component.html',
  styleUrls: ['./process-movable-renameable.component.css']
})
export class ProcessMovableRenameableComponent implements OnInit {

  constructor() { }

  @Output() processPositionUpdated: EventEmitter<any> = new EventEmitter()

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
    if (e.shape === 'rectangle') {
      this.processPositionUpdated.emit(e)
    }
    
  }

}
