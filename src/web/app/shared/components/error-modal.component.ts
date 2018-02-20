import { 
    Component, 
    AfterViewInit,
    EventEmitter, 
    Input, Injector, 
    OnChanges, Output, 
    ViewChildren, 
    QueryList 
} from '@angular/core';

import { DomSanitizer} from '@angular/platform-browser';

import { BaseComponent } from '../../shared/components/base.component';

declare var $: any;

@Component({
    selector: 'app-modal-error',
    templateUrl: '../templates/error-modal.component.html'
})

export class ErrorModalComponent extends BaseComponent {

    @Input('showError') showError: boolean;
    @Output() showErrorEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        injector: Injector
    ) {
        super(injector);
        console.log("constructor");
    }

    ngOnInit(): void {
        $("#modal-error").modal();
    }

    public yes(): void {
        console.log("done");
        this.showErrorEmitter.emit(false);
    }
}

