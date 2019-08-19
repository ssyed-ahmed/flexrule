import { Directive, EventEmitter, HostListener, ElementRef } from '@angular/core';
import {Observable} from 'rxjs'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil'

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {

  mouseup = new EventEmitter<MouseEvent>();
  mousedown = new EventEmitter<MouseEvent>();
  mousemove = new EventEmitter<MouseEvent>();

  mousedrag: Observable<{top, left}>;

  constructor(public element: ElementRef) {
    this.element.nativeElement.style.position = 'relative';
    this.element.nativeElement.style.cursor = 'pointer';

    this.mousedrag = this.mousedown.map(event => {
        return {
            top: event.clientY - this.element.nativeElement.getBoundingClientRect().top,
            left: event.clientX - this.element.nativeElement.getBoundingClientRect().left,
        };
    })
    .flatMap(
        imageOffset => this.mousemove.map(pos => ({
            top: pos.clientY - imageOffset.top,
            left: pos.clientX - imageOffset.left
        }))
        .takeUntil(this.mouseup)
    );
}


  

    @HostListener('document:mouseup', ['$event'])
    onMouseup(event: MouseEvent) {
        this.mouseup.emit(event);
    }

    @HostListener('mousedown', ['$event'])
    onMousedown(event: MouseEvent) {
        this.mousedown.emit(event);
        // return false; // Call preventDefault() on the event
    }

    @HostListener('document:mousemove', ['$event'])
    onMousemove(event: MouseEvent) {
        this.mousemove.emit(event);
    }

    ngOnInit() {
        this.mousedrag.subscribe({
            next: pos => {
                this.element.nativeElement.style.top = pos.top + 'px';
                this.element.nativeElement.style.left = pos.left + 'px';
            }
        });
    }
}
