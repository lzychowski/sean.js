import { Component, AfterViewInit, EventEmitter, Input, Injector, Output, ViewChildren, QueryList } from '@angular/core';

import { 
    trigger, 
    style, 
    transition, 
    animate, 
    keyframes, 
    query, 
    stagger, 
    group, 
    state, 
    animateChild 
} from '@angular/animations';

import { BaseComponent } from '../../shared/components/base.component';

declare var $: any;
declare var setup_widgets_desktop: any;

@Component({
    selector: 'app-scope',
    templateUrl: '../templates/scope.component.html',
    animations: [
        trigger(
            'load',
            [
                transition(
                    ':enter', [
                        style({'opacity': 0}),
                        animate('500ms', style({'opacity': 1}))
                    ]
                ),
                transition(
                    ':leave', [
                        style({'opacity': 1}),
                        animate('500ms', style({'opacity': 0}))
                    ]
                )
            ]
        )
    ]
})

export class ScopeComponent extends BaseComponent implements AfterViewInit {

    public scope: any = {};
    public created: boolean = false;
    public duplicate: boolean = false;

    constructor(
        injector: Injector
    ) {
        super(injector);
        console.log("constructor");
    }

    ngAfterViewInit(): void {
        console.log("ngAfterViewChecked");
    }

    ngOnChanges(): void {

    }

    public createScope(){
        console.log("createScope");

        this.created = false;
        this.duplicate = false;

        this.scopeService.createScope(this.scope).then((data) =>{
            if (data.created) {
                this.created = true;
            } else {
                this.duplicate = true;
            }
        }).catch((e) => {

        });
    }

    public ngOnDestroy(): void {
        console.log("ngOnDestroy");

    }

}
