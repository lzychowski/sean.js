import { Injectable, Injector } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from '../../shared/services/message.service';

import * as appGlobals from '../globals';

import 'rxjs/add/operator/toPromise';

export class BaseService<Type> {

    protected headers = new Headers();

    protected http: Http;
    protected messageService: MessageService;
    protected route: ActivatedRoute;
    protected router: Router;
    protected API_URL = appGlobals.API_URL;
    protected appGlobals = appGlobals;
    
    constructor (private injector: Injector) {
        console.log("constructor");

        this.http = this.injector.get(Http);
        this.messageService = injector.get(MessageService);
        this.route = injector.get(ActivatedRoute);
        this.router = injector.get(Router);
    }

    // base CRUD methods
    // -----------------

    protected getMany(url: string, options?: RequestOptionsArgs): Promise<Array<Type>> {
        console.log("getMany");

        return this.http.get(url, options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    protected get(url: string, options?: RequestOptionsArgs): Promise<Type> {
        console.log("get");

        return this.http.get(url, options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    protected post(url: string, body?: any): Promise<Type> {
        console.log("post");

        let options = new RequestOptions();

        if (body){
            options.body = body;
        }

        return this.http.post(url, this.buildBody(options), options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    protected put(url: string, body?: any): Promise<Type> {
        console.log("put");

        let options = new RequestOptions();

        if (body){
            options.body = body;
        }

        return this.http.put(url, this.buildBody(options), options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    protected delete(){
        
    }

    protected buildBody(options: RequestOptionsArgs): any {
        console.log("buildBody");
        
        if (options){
            return options.body;
        } else {
            return null;
        }
    }

    // data and error handling
    // -----------------------

    protected extractData(response: Response): any {
        console.log("extractData");

        let obj = response.json();
        return obj || [];
    }

    protected handleError(error: any): Promise<any> {
        console.log("handleError");
        
        return Promise.reject(error.message || error);
    }

    // HTTP header methods
    // -------------------

    protected appendToHeader(key: string, value: string): void {
        console.log("appendToHeader");
        
        if (!this.headers.has(key)){
            this.headers.append(key, value);
        }
    }

    protected addStandardHeaders(): void {
        console.log("addStandardHeaders");
        
        this.appendToHeader('Content-Type', 'application/json');
    }

}