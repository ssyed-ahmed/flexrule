import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  canvas: any

  constructor() { }

  ngOnInit() {
    // this.canvas = <HTMLCanvasElement> document.getElementById('editor-canvas')
    // let context = this.canvas.getContext('2d')

    // window.addEventListener('resize', this.resizeCanvas, false)
    // this.resizeCanvas()
  }

  resizeCanvas() {
    let container = document.getElementById('editor-container')
    this.canvas.width = container.clientWidth
    this.canvas.height = container.clientHeight
  }

  allowDrop(evt) {
    evt.preventDefault()
  }

  onDrop(evt) {
    evt.preventDefault()
    let data = evt.dataTransfer.getData('text/html')
    // evt.target.appendChild(document.getElementById(data))
    var nodeCopy: any = document.getElementById(data).cloneNode(true);
    nodeCopy.id = "newId"; /* We cannot use the same ID */
    evt.target.appendChild(nodeCopy);
  }
}
