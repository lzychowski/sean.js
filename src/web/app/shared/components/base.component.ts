import { AfterViewInit, Component, EventEmitter, Input, Injectable, Injector, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import * as appGlobals from '../globals';
import { UserService } from '../../user/services/user.service';

export class BaseComponent implements OnInit, AfterViewInit {

    protected route: ActivatedRoute;
    protected router: Router;
    protected sanitizer: DomSanitizer;
    
    protected userService: UserService;

    constructor(private injector: Injector) {
        console.log("constructor");
        this.userService = injector.get(UserService);
        this.route = injector.get(ActivatedRoute);
        this.router = injector.get(Router);
    }

    ngOnInit(): void {
        console.log("ngOnInit");
        
    }

    ngAfterViewInit(): void {
        console.log("ngAfterViewInit");
    }

}
