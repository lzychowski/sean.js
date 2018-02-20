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
    selector: 'app-group',
    templateUrl: '../templates/group.component.html',
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

export class GroupComponent extends BaseComponent {

    public group: any = {};
    public duplicate: boolean = false;

    constructor(
        injector: Injector
    ) {
        super(injector);
        console.log("constructor");
        $(".menu-option").removeClass("active");
        $(".groups-menu-option").addClass("active");
        $("#scrim-main").fadeOut(100);
    }

    public createGroup(){
        console.log("createGroup");

        this.created = false;
        this.duplicate = false;

        this.groupService.createGroup(this.group)
        .then(data =>{
            if (data.created) {
                this.created = true;
            } else {
                this.duplicate = true;
            }
        })
        .catch(e => {
            this.showError = true;
            this.loaded = true;
        });
    }

    public ngOnDestroy(): void {
        console.log("ngOnDestroy");

        if (this.routeSub) this.routeSub.unsubscribe();
    }
}
