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
    selector: 'app-groups',
    templateUrl: '../templates/groups.component.html',
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

export class GroupsComponent extends BaseComponent {

    public groups: Array<any>;

    constructor(
        injector: Injector
    ) {
        super(injector);
        console.log("constructor");
        $(".menu-option").removeClass("active");
        $(".groups-menu-option").addClass("active");
        $("#scrim-main").fadeOut(100);
    }

    ngAfterViewInit(): void {
        console.log("ngAfterViewChecked");
        this.getGroups();
    }

    public getGroups(){
        console.log("getGroups");

        this.groupService.getGroups()
        .then(data =>{
            this.groups = data;
            setTimeout(() => {
                setup_widgets_desktop();
                $("table").dataTable({
                    "bLengthChange": false,
                    "ordering": false
                });
                this.loaded = true;
            });
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
