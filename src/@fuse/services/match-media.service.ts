import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, filter, map, distinctUntilChanged } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class FuseMatchMediaService
{
    activeMediaQuery: string;
    onMediaChange: BehaviorSubject<string> = new BehaviorSubject<string>('');

    /**
     * Constructor
     *
     * @param {MediaObserver} _observableMedia
     */
    constructor(
        private _observableMedia: MediaObserver
    )
    {
        // Set the defaults
        this.activeMediaQuery = '';

        // Initialize
        this._init();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Initialize
     *
     * @private
     */
    private _init(): void
    {

        this._observableMedia.asObservable()
            .pipe(
                filter((changes: MediaChange[]) => changes.length > 0),
                map((changes: MediaChange[]) => changes[0]),
                debounceTime(500),
                distinctUntilChanged()
            )
            .subscribe((change: MediaChange) => {
                if ( this.activeMediaQuery !== change.mqAlias )
                {
                    this.activeMediaQuery = change.mqAlias;
                    this.onMediaChange.next(change.mqAlias);
                }
            });
    }

}
