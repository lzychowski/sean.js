import { Injectable, Injector } from '@angular/core';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { BaseService } from '../../shared/services/base.service';


@Injectable()
export class ScopeService extends BaseService<any> {

    constructor (injector: Injector) {
        super(injector);
        console.log("constructor");
    }

    public createScope(scope: any): Promise<any> {
        console.log("createScope");

        return this.post(this.API_URL + "/api/scopes/", { name: scope.name });
    }

    public getScopes(): Promise<Array<any>> {
        console.log("getScopes");

        return this.getMany(this.API_URL + "/api/scopes/");
    }
}