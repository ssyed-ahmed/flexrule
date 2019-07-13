import { Component, OnInit, NgZone, HostListener, OnDestroy, Renderer2, ElementRef, AfterViewInit  } from '@angular/core';
import { Subscription, fromEvent, Subject } from 'rxjs';

import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy, AfterViewInit {

  canvas: any

  elementsList: Array<any> = []

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

  ngAfterViewInit() {
    let el = this.elementRef.nativeElement.querySelector('#dxy')
    this.listenerDownFn = this.renderer.listen(el, 'mousedown', this.mouseDown.bind(this))
    this.listenerUpFn = this.renderer.listen(this.elementRef.nativeElement, 'mouseup', this.mouseUp.bind(this))
  }

  dragEnd(e) {
    console.log('drag ended');
    
  }

  mouseUp(e)
  {
    console.log('mouse up detected');
    
    this.listenerMoveFn()
  }
  
  mouseDown(e){
    let self = this
    console.log('mouse down detected');
    e.preventDefault()
    this.listenerMoveFn = this.renderer.listen(this.elementRef.nativeElement, 'mousemove', this.divMove.bind(this))
  }
  
  divMove(e){
    console.log('mouse move detected');
    
    let div = document.getElementById(this.elemId);
    div.style.position = 'absolute';
    div.style.top = e.clientY + 'px';
    div.style.left = e.clientX + 'px';
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

  // onDrop(evt) {
  //   evt.preventDefault()
  //   let dataStr = evt.dataTransfer.getData('text/plain')
  //   let data = JSON.parse(dataStr)
  //   let nodeCopy: any = null
  //   if (data.isDirty) {
  //     let child = document.getElementById(data.id)
  //     evt.target.parentNode.appendChild(child)
  //   } else {
  //     nodeCopy = document.getElementById(data.id).cloneNode(true)
  //     nodeCopy.id = this.getUniqueId()
  //     evt.target.appendChild(nodeCopy)
  //     this.elementsList.push(nodeCopy)
  //     setTimeout(() => {
  //       nodeCopy.addEventListener('dragstart', (evt) => {
  //         let newData = data.process
  //         newData.id = nodeCopy.id
  //         let payload: any = {}
  //         payload.id = evt.target.id
  //         payload.process = newData
  //         payload.isDirty = true
  //         evt.dataTransfer.setData("text/plain", JSON.stringify(payload))
  //       })
  //     }, 100)
  //   }
  //   console.log(this.elementsList)
  // }

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
}
