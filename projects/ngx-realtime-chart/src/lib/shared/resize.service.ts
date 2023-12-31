import { DOCUMENT } from '@angular/common';
import { DestroyRef, EventEmitter, Injectable, inject } from '@angular/core';
import { Observable, fromEvent, share } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {
  private readonly window = inject(DOCUMENT).defaultView as Window;
  private readonly events = new EventEmitter<Window>();
  private readonly resize: Observable<Window>;

  get onResize$(): Observable<Window> {
    return this.resize;
  }

  constructor() {
    this.resize = this.events.asObservable().pipe(share());
    const sub = fromEvent(this.window, 'resize').subscribe(event => this.events.emit(event.target as Window));
    inject(DestroyRef).onDestroy(() => sub.unsubscribe());
  }
}
