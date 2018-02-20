import { Injectable, Injector } from '@angular/core';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { BaseService } from '../../shared/services/base.service';


@Injectable()
export class GroupService extends BaseService<any> {

    constructor (injector: Injector) {
        super(injector);
        console.log("constructor");
    }

    public createGroup(group: any): Promise<any> {
        console.log("createGroup");

        //return this.get(this.API_URL + "");
        return this.post("http://localhost:3000/api/groups/", { name: group.name });
    }

    public getGroups(): Promise<Array<any>> {
        console.log("getGroups");

        return this.getMany("http://localhost:3000/api/groups/");
    }
}