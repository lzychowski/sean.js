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
    selector: 'app-user',
    templateUrl: '../templates/user.component.html',
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

export class UserComponent extends BaseComponent {

    public user: any;
    public groups: Array<any>;
    public scopes: Array<any>;
    private objectToRemove: any = {
        type: null,
        obj: {}
    };

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

        this.routeSub = this.route.params.subscribe(params => {
            this.getUser(params["id"]);
            this.getUserGroups(params["id"]);
            this.getUserScopes(params["id"]);
        });
    }

    public getUser(id: number){
        console.log("getUser");
        this.userService.getUser(id)
        .then(data =>{
            this.user = data;
            setTimeout(() => {
                setup_widgets_desktop();
                this.loaded = true;
            });
        })
        .catch(e => {
            this.showError = true;
            this.loaded = true;
        });
    }

    public getUserGroups(id: number){
        console.log("getUserGroups");
        this.userService.getUserGroups(id)
        .then(data =>{
            this.groups = data;
            setTimeout(() => {
                setup_widgets_desktop();
            });
        })
        .catch(e => {
            this.showError = true;
            this.loaded = true;
        });
    }

    public getUserScopes(id: number){
        console.log("getUserScopes");
        this.userService.getUserScopes(id)
        .then(data =>{
            this.scopes = data;
            setTimeout(() => {
                setup_widgets_desktop();
            });
        })
        .catch(e => {
            this.showError = true;
            this.loaded = true;
        });
    }

    public removeScope(objectToRemove: any): void {
        console.log("removeScope");
        this.objectToRemove.type = "scope";
        this.objectToRemove.obj = objectToRemove;
        this.modal = true;
    }

    public removeGroup(objectToRemove: any): void {
        console.log("removeGroup");
        this.objectToRemove.type = "group";
        this.objectToRemove.obj = objectToRemove;
        this.modal = true;
    }

    public confirmModal(remove: boolean): void {
        console.log("confirmModal");

        this.modal = false;
        
        if (remove){
            if (this.objectToRemove.type === "group"){
                this.userService.removeGroup(this.objectToRemove.obj.id)
                .then(data => {
                    this.getUserGroups(this.user.id);
                })
                .catch(e => {
                    this.showError = true;
                    this.loaded = true;
                });
            } else {
                this.userService.removeScopes(this.objectToRemove.obj.id)
                .then(data => {
                    this.getUserScopes(this.user.id);
                })
                .catch(e => {
                    this.showError = true;
                    this.loaded = true;
                });
            }
        }
    }

    public ngOnDestroy(): void {
        console.log("ngOnDestroy");

        if (this.routeSub) this.routeSub.unsubscribe();
    }
}
