import { Component, AfterViewInit, EventEmitter, Input, Injector, Output, ViewChildren, QueryList } from '@angular/core';

import { BaseComponent } from '../../shared/components/base.component';

declare var $: any;
declare var setup_widgets_desktop: any;


@Component({
    selector: 'app-user',
    templateUrl: '../templates/users.component.html'
})

export class UsersComponent extends BaseComponent implements AfterViewInit {

    public users: Array<any>;
    private routeSub: any;
    private loaded: boolean = false;

    constructor(
        injector: Injector
    ) {
        super(injector);
        console.log("constructor");
    }

    ngAfterViewInit(): void {
        console.log("ngAfterViewChecked");

        this.routeSub = this.route.params.subscribe(params => {
            
            this.getUsers();
        });
    }

    ngOnChanges(): void {
        if (!this.loaded){
            this.loaded = true;
            
        }
    }

    public getUsers(){
        console.log("getUser");
        this.userService.getUsers().then((data) =>{
            this.users = data;
            setTimeout(() => {
                setup_widgets_desktop();
                $("table").dataTable({
                    "bLengthChange": false,
                    "ordering": false
                });
            });
        }).catch((e) => {

        });
    }

    public ngOnDestroy(): void {
        console.log("ngOnDestroy");

        if (this.routeSub) this.routeSub.unsubscribe();
    }
}
