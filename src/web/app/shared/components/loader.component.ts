import { 
    AfterContentInit, AfterViewChecked, AfterViewInit, 
    Component, ComponentFactoryResolver, 
    DoCheck, 
    EventEmitter, 
    Input, Injectable, Injector, 
    OnDestroy, OnInit, Output, 
    QueryList,
    TemplateRef, 
    ViewChild, ViewChildren 
} from '@angular/core';

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

@Component({
    selector: 'app-loader',
    templateUrl: '../templates/loader.component.html',
    animations: [
        trigger(
            'loader',
            [
                state('false', style({'opacity': 1, 'visibility': 'initial'})),
                state('true',   style({'opacity': 0, 'visibility': 'hidden'})),
                transition('0 => 1', animate('500ms 1s'))
            ]
        )
    ]
})

export class LoaderComponent implements OnInit, AfterViewChecked, AfterViewInit, OnDestroy {

    // data members
    // ------------
    @Input('loaded') loaded: boolean;


    // methods
    // -------

    constructor(){
        console.log("constructor");
    }

    // angular 2 lifecycle hooks
    // -------------------------

    ngAfterViewInit(): void {
        console.log("ngAfterViewInit");
    }

    ngAfterViewChecked(): void {

    }

    ngOnInit(): void {
        console.log("ngOnInit");
    }
 
    ngOnDestroy() {
        
    }

}