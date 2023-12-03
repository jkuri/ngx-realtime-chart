import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, fromEvent, share } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResizeService implements OnDestroy {
  private readonly resize$: Observable<Event> = fromEvent(window, 'resize');
  private readonly resizeSub$: Subscription = this.resize$.subscribe(this.onResize);
  private readonly resizeSubject: Subject<Window> = new Subject();

  get onResize$(): Observable<Window> {
    return this.resizeSubject.asObservable().pipe(share());
  }

  ngOnDestroy(): void {
    this.resizeSub$.unsubscribe();
  }

  private onResize(event: Event) {
    this.resizeSubject.next(event.target as Window);
  }
}
