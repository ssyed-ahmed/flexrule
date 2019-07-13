import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    private clickSubject: Subject<string> = new Subject<string>()

    constructor() {}

    sendClickEvent(message: string) {
        this.clickSubject.next(message)
    }

    getClickEvent(): Observable<any> {
        return this.clickSubject.asObservable()
    }
}