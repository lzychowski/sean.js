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
    selector: 'app-edit-group',
    templateUrl: '../templates/edit-group.component.html',
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

export class EditGroupComponent extends BaseComponent implements AfterViewInit {

    public group: any;
    public scopes: Array<any>;
    public selectedScopes: Array<any>;
    public loaded: boolean = false;
    public routeSub: any;
    public created: boolean = false;
    
    // race condition
    public allScopesLoaded: boolean = false;
    public groupScopesLoaded: boolean = false;


    constructor(
        injector: Injector
    ) {
        super(injector);
        console.log("constructor");
    }

    ngAfterViewInit(): void {
        console.log("ngAfterViewChecked");

        this.getScopes();

        this.routeSub = this.route.params.subscribe(params => {
            this.getGroupScopes(params["id"]);
            this.getGroup(params["id"]);
        });
    }

    public getGroup(id: number): void {
        console.log("getGroup");

        this.groupService.getGroup(id).then((data) =>{
            this.group = data;
        }).catch((e) => {

        });
    }

    public getScopes(){
        console.log("getScopes");

        this.scopeService.getScopes().then((data) =>{
            this.scopes = data;
            setTimeout(() => {
                setup_widgets_desktop();
                $(".select2-list").select2();
                this.loaded = true;
                this.allScopesLoaded = true;
                this.updateSelect2();
            });
        }).catch((e) => {

        });
    }

    public getGroupScopes(id: number): void {
        console.log("getGroupScopes");

        this.groupService.getGroupScopes(id).then((data) =>{
            this.selectedScopes = data;
            this.groupScopesLoaded = true;
            this.updateSelect2();
        }).catch((e) => {

        });
    }

    public updateSelect2(): void {
        console.log("updateSelect2");

        if (this.allScopesLoaded && this.groupScopesLoaded){
            let selections = [];
            for (var i = 0; i < this.selectedScopes.length; i++){
                selections.push(this.selectedScopes[i].scope_id);
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

        this.groupService.modifyGroupScopes(this.group.id, ids)
        .then((data) =>{
            console.log(data);
            this.created = true;
            setTimeout(() => {
                this.created = false;
            }, 2000);
        }).catch(e =>{

        });
    }

    public ngOnDestroy(): void {
        console.log("ngOnDestroy");

    }
}
