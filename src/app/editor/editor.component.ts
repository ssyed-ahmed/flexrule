import { Component, OnInit, NgZone, HostListener, OnDestroy, Renderer2, ElementRef  } from '@angular/core';
import { Subscription, fromEvent, Subject } from 'rxjs';

import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {

  canvas: any

  elementsList: Array<any> = []
  elementsDataList: Array<any> = []

  elementAdded: boolean = false

  elemId: any = null

  subscription: Subscription

  subscription2: Subscription

  dragging: boolean = false
  posx = 0
  posy = 0

  listenerUpFn: () => void
  listenerDownFn: () => void
  listenerMoveFn: () => void

  exportedJSON: any = []

  constructor(
    private zone: NgZone, 
    private sharedService: SharedService, 
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    // this.canvas = <HTMLCanvasElement> document.getElementById('editor-canvas')
    // let context = this.canvas.getContext('2d')

    // window.addEventListener('resize', this.resizeCanvas, false)
    // setTimeout(() => {
    //   this.resizeCanvas()
    // }, 50);
    
    // document.getElementById('dxy').addEventListener('mousedown', this.mouseDown, false);
    
  }

  mouseUp(e)
  {
    console.log('mouse up detected');
    if (this.listenerMoveFn) {
      this.listenerMoveFn()
    }
  }
  
  mouseDown(e){
    let self = this
    console.log('mouse down detected');
    console.log(e);
    this.elemId = e.path[1].id
    e.preventDefault()
    this.listenerMoveFn = this.renderer.listen(this.elementRef.nativeElement, 'mousemove', this.divMove.bind(this))
  }
  
  divMove(e){
    try {
      let div = document.getElementById(this.elemId);
      div.style.position = 'absolute';
      div.style.top = e.clientY + 'px';
      div.style.left = e.clientX + 'px';
    } catch (e)  {

    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
    this.subscription2.unsubscribe()
  }

  resizeCanvas() {
    let container = document.getElementById('editor-container')
    this.canvas.width = container.clientWidth
    this.canvas.height = container.clientHeight
  }

  allowDrop(evt) {
    evt.preventDefault()
  }

  stopEdit() {
    this.sharedService.sendClickEvent('clicked')
  }

  onDrop(evt) {
    let self = this
    evt.preventDefault()
    let dataStr = evt.dataTransfer.getData('text/plain')
    if (dataStr === '') {
      return
    }
    let data = JSON.parse(dataStr)
    
    let nodeCopy: any = document.getElementById(data.id).cloneNode(true)
    nodeCopy.id = this.getUniqueId()
    this.elemId = nodeCopy.id
    console.log('DIV Id = ' + nodeCopy.id);
    
    evt.target.appendChild(nodeCopy)
    this.elementsList.push(nodeCopy)
    this.elementsDataList.push(JSON.parse(JSON.stringify(data)))
    setTimeout(() => {
      let el = this.elementRef.nativeElement.querySelector('#' + this.elemId)
      this.listenerDownFn = this.renderer.listen(el, 'mousedown', this.mouseDown.bind(this))
      this.listenerUpFn = this.renderer.listen(this.elementRef.nativeElement, 'mouseup', this.mouseUp.bind(this))
    }, 100)
    // console.log(this.elementsList)
  }

  getUniqueId() {
    return 'id-' + Math.random().toString(36).substr(2, 16)
  }

  exportJSON() {
    if (this.elementsList.length === 0) {
      return
    }

    this.elementsDataList.forEach(elem => {
      delete elem.id      
      this.exportedJSON.push(elem.process)
      console.log(JSON.stringify(this.exportedJSON))
    })
  }
}
