import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    private subject: Subject<any> = new Subject<any>()
    private dropSubject: Subject<any> = new Subject<any>()

    constructor() {}

    sendEvent(message: any) {
        this.subject.next(message)
    }

    getEvent(): Observable<any> {
        return this.subject.asObservable()
    }

    setDropCompleted(message: any) {
        this.dropSubject.next(message)
    }

    getDropCompleted() {
        return this.dropSubject.asObservable()
    }
}