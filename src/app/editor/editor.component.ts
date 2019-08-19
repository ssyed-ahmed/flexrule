import { Component, OnInit, NgZone, HostListener, OnDestroy, Renderer2, ElementRef, ChangeDetectorRef  } from '@angular/core';
import { Subscription, fromEvent, Subject } from 'rxjs';

import { SharedService } from '../shared/shared.service';

import { saveAs } from 'file-saver/dist/FileSaver';

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
  listenerDblClickFn: () => void

  processCount = 0
  documentCount = 0
  flowCount = 0

  movedObject: any = {}

  exportedJSON: any = []

  processList: Array<any> = []
  documentList: Array<any> = []
  flowList: Array<any> = []

  constructor(
    private zone: NgZone, 
    private sharedService: SharedService, 
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private cd: ChangeDetectorRef
  ) { 
    this.sharedService.getEvent().subscribe((message: any) => {
      if (message.eventType === 'mousedown') {
        let event = message.event
        this.mouseDown(event)
      }
    })
  }

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
    if (this.listenerMoveFn) {
      this.listenerMoveFn()
    }
  }
  
  mouseDown(e){
    let self = this
    this.elemId = e.path[1].id
    e.preventDefault()
    this.listenerMoveFn = this.renderer.listen(this.elementRef.nativeElement, 'mousemove', this.divMove.bind(this))
  }
  
  divMove(e){
    try {
      let div = document.getElementById(this.elemId);
      this.movedObject.id = this.elemId
      div.style.position = 'absolute';
      div.style.top = e.clientY + 'px';
      div.style.left = e.clientX + 'px';
      this.movedObject.posX = e.clientX
      this.movedObject.posY = e.clientY

      this.elementsDataList.map(elem => {
        if (elem.id === this.elemId) {
          elem.process.positionX = this.movedObject.posX
          elem.process.positionY = this.movedObject.posY
        }
      })
    } catch (e)  {

    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
    this.subscription2.unsubscribe()

    this.listenerUpFn()
    this.listenerDownFn()
    this.listenerMoveFn()
    this.listenerDblClickFn()
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
    this.sharedService.sendEvent('clicked')
  }

  onDrop(evt) {
    let isProcess = false
    let isDocument = false
    let isFlow = false
    let self = this
    evt.preventDefault()
    let dataStr = evt.dataTransfer.getData('text/plain')
    if (dataStr === '') {
      return
    }
    let data = JSON.parse(dataStr)
    if (data.process.shape === 'rectangle') {
      isProcess = true
      this.processList.push(++this.processCount)
    } else if (data.process.shape === 'document') {
      this.documentList.push(++this.documentCount)
    } else {
      this.flowList.push(++this.flowCount)
    }
    
    this.elementsDataList.push(JSON.parse(JSON.stringify(data)))
  }

  getUniqueId() {
    return 'id-' + Math.random().toString(36).substr(2, 16)
  }

  exportJSON() {
    
    if (this.elementsDataList.length === 0) {
      return
    }    

    // this.elementsDataList.forEach(elem => {
    //   delete elem.id      
    //   this.exportedJSON.push(elem.process)
    // })

    let data = JSON.stringify(this.exportedJSON)
    console.log(data)    
    let blob = new Blob([data], {type: 'text/plain'})
    let url = window.URL.createObjectURL(blob)
    saveAs(blob, 'exportJSON.json')
    window.open(url)
  }

  mouseDblClick(e) {
    console.log('double click detected');
    let el = this.elementRef.nativeElement.querySelector('#' + this.elemId)
    if (el) {
      el.contentEditable = true
    }    
  }

  onProcessPositionUpdate(e) {
    console.log('In editor process position updated');
    console.log(e);
    let index = this.arrayContains(e)
    if (index === -1) {
      this.exportedJSON.push(e)
    } else {
      this.exportedJSON[index] = e
    }
  }

  onDocumentPositionUpdate(e) {
    console.log('In editor document position updated');
    console.log(e);
    let index = this.arrayContains(e)
    if (index === -1) {
      this.exportedJSON.push(e)
    } else {
      this.exportedJSON[index] = e
    }
  }

  onFlowPositionUpdate(e) {
    console.log('In editor flow position updated');
    console.log(e);
    let index = this.arrayContains(e)
    if (index === -1) {
      this.exportedJSON.push(e)
    } else {
      this.exportedJSON[index] = e
    }
  }

  arrayContains(elem) {
    if (this.exportedJSON.length === 0) {
      return -1
    }
    let index = -1
    for (let i = 0; i < this.exportedJSON.length; i++) {
      if (elem.name === this.exportedJSON[i].name) {
        index = i
        break
      }
    }
    return index
  }
}
