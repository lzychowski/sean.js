import { Component, AfterViewInit, EventEmitter, Input, Injector, OnChanges, Output, ViewChildren, QueryList } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

import { BaseComponent } from '../../shared/components/base.component';

declare var $: any;

@Component({
    selector: 'app-modal',
    templateUrl: '../templates/modal.component.html'
})

export class ModalComponent extends BaseComponent implements OnChanges, AfterViewInit {

    @Input('objectToRemove') objectToRemove: any;
    @Output() confirm: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        injector: Injector
    ) {
        super(injector);
        console.log("constructor");
    }

    ngOnInit(): void {
        $("#modal-dialog").modal();
    }

    ngOnChanges(changes: any): void {

    }

    ngAfterViewChecked(): void {

    }

    ngAfterViewInit(): void {

    }

    public yes(): void {
        console.log("done");
        this.confirm.emit(true);
    }

    public cancel(): void {
        console.log("selectDate");
        this.confirm.emit(false);
    }

}

