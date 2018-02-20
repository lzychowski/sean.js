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
                transition('0 => 1', animate('300ms'))
            ]
        )
    ]
})

export class LoaderComponent {

    // data members
    // ------------
    @Input('loaded') loaded: boolean;

    // methods
    // -------

    constructor(){
        console.log("constructor");
    }
}