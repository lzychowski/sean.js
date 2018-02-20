import { 
    AfterViewInit, 
    Component, 
    EventEmitter,
    Input, Injectable, Injector, 
    OnInit, Output, OnDestroy,
    QueryList, 
    ViewChildren 
} from '@angular/core';

import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import * as appGlobals from '../globals';
import { UserService } from '../../user/services/user.service';
import { ScopeService } from '../../scope/services/scope.service';
import { GroupService } from '../../group/services/group.service';

export class BaseComponent implements OnInit, AfterViewInit, OnDestroy {

    protected route: ActivatedRoute;
    protected router: Router;
    protected sanitizer: DomSanitizer;
    
    protected userService: UserService;
    protected scopeService: ScopeService;
    protected groupService: GroupService;

    protected routeSub: any;
    protected loaded: boolean = false;
    protected modal: boolean = false;
    protected showError: boolean = false;
    protected created: boolean = false;

    constructor(private injector: Injector) {
        console.log("constructor");
        
        this.route = injector.get(ActivatedRoute);
        this.router = injector.get(Router);

        this.userService = injector.get(UserService);
        this.scopeService = injector.get(ScopeService)
        this.groupService = injector.get(GroupService);
    }

    ngOnInit(): void {
        console.log("ngOnInit");
    }

    ngAfterViewInit(): void {
        console.log("ngAfterViewInit");
    }

    ngOnDestroy(): void {
        console.log("ngOnDestroy");
    }
}
