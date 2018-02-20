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
    selector: 'app-edit-user-group',
    templateUrl: '../templates/edit-user-group.component.html',
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

export class EditUserGroupComponent extends BaseComponent {

    public user: any;
    public groups: Array<any>;
    public selectedGroups: Array<any>;
    
    // race condition
    public allGroupsLoaded: boolean = false;
    public userGroupsLoaded: boolean = false;

    constructor(
        injector: Injector
    ) {
        super(injector);
        console.log("constructor");
        $(".menu-option").removeClass("active");
        $(".users-menu-option").addClass("active");
        $("#scrim-main").fadeOut(100);
    }

    ngAfterViewInit(): void {
        console.log("ngAfterViewChecked");

        this.getGroups();

        this.routeSub = this.route.params.subscribe(params => {
            this.getUserGroups(params["id"]);
            this.getUser(params["id"]);
        });
    }

    public getUser(id: number): void {
        console.log("getUser");

        this.userService.getUser(id)
        .then(data =>{
            this.user = data;
        })
        .catch(e => {
            this.showError = true;
            this.loaded = true;
        });
    }

    public getGroups(){
        console.log("getGroups");

        this.groupService.getGroups()
        .then(data =>{
            this.groups = data;
            setTimeout(() => {
                setup_widgets_desktop();
                $(".select2-list").select2();
                this.loaded = true;
                this.allGroupsLoaded = true;
                this.updateSelect2();
            });
        })
        .catch(e => {
            this.showError = true;
            this.loaded = true;
        });
    }

    public getUserGroups(id: number): void {
        console.log("getUserGroups");

        this.userService.getUserGroups(id)
        .then(data =>{
            this.selectedGroups = data;
            this.userGroupsLoaded = true;
            this.updateSelect2();
        })
        .catch(e => {
            this.showError = true;
            this.loaded = true;
        });
    }

    public updateSelect2(): void {
        console.log("updateSelect2");

        if (this.allGroupsLoaded && this.userGroupsLoaded){

            this.loaded = true;

            let selections = [];
            for (var i = 0; i < this.selectedGroups.length; i++){
                selections.push(this.selectedGroups[i].group_id);
            }

            $(".select2-list").val(selections);
            $(".select2-list").trigger('change');
        }
    }

    public submit(): void {
        console.log("submit");
        
        let selections = $('.select2-list').select2('data');
        let ids = [];
        for (var i = 0; i < selections.length; i++){
            ids.push(selections[i].id);
        }

        this.userService.modifyUserGroups(this.user.id, ids)
        .then(data =>{
            console.log(data);
            this.created = true;
            setTimeout(() => {
                this.created = false;
            }, 2000);
        })
        .catch(e =>{
            this.showError = true;
            this.loaded = true;
        });
    }

    public ngOnDestroy(): void {
        console.log("ngOnDestroy");
        
        if (this.routeSub) { this.routeSub.unsubscribe() }
    }
}
