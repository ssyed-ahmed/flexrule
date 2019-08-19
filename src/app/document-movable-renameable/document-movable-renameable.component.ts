import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-movable-renameable',
  templateUrl: './document-movable-renameable.component.html',
  styleUrls: ['./document-movable-renameable.component.css']
})
export class DocumentMovableRenameableComponent implements OnInit {

  isEditable: boolean = false

  constructor() { }

  process:any = {
    shape: 'document',
    name: 'Document',
    positionX: '0',
    positionY: '0'
  }

  ngOnInit() {
  }

  setEditable() {
    this.isEditable = !this.isEditable
  }
}
