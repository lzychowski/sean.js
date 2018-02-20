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

@Component({
    selector: 'app-404',
    templateUrl: '../templates/404.component.html'
})

export class NotFoundComponent {

    // data members
    // ------------
    @Input('loaded') loaded: boolean;

    // methods
    // -------

    constructor(){
        console.log("constructor");
    }
}