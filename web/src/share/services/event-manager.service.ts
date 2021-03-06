import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class EventManager {

    private observable: Observable<any>;
    private observer: Observer<any>;

    constructor() {
        this.observable = Observable.create((observer: Observer<any>) => {
            this.observer = observer;
        }).share();
    }

    broadcast(event: { name: string, data?: any }) {
        if (this.observer != null) {
            this.observer.next(event);
        }
    }

    subscribe(eventName, callback): Subscription {
        return this.observable.filter((event) => {
            return event.name === eventName;
        }).subscribe(callback);
    }

    destroy(subscriber: Subscription) {
        subscriber.unsubscribe();
    }
}
