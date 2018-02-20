import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/components/user.component';
import { UsersComponent } from './user/components/users.component';
import { EditUserGroupComponent } from './user/components/edit-user-group.component';
import { EditUserScopeComponent } from './user/components/edit-user-scope.component';
import { GroupComponent } from './group/components/group.component';
import { GroupsComponent } from './group/components/groups.component';
import { ScopeComponent } from './scope/components/scope.component';
import { ScopesComponent } from './scope/components/scopes.component';
import { AppComponent } from './app.component';
import { EditGroupComponent } from './group/components/edit-group.component';
import { NotFoundComponent } from './shared/components/404.component';

export const routes: Routes = [
    {
        path: 'users/:id',
        component: UserComponent
    },
    {
        path: 'users/:id/groups',
        component: EditUserGroupComponent
    },
    {
        path: 'users/:id/scopes',
        component: EditUserScopeComponent
    },
    {
        path: 'users',
        component: UsersComponent
    },
    {
        path: 'groups/create',
        component: GroupComponent
    },
    {
        path: 'groups',
        component: GroupsComponent
    },
    {
        path: 'scopes/create',
        component: ScopeComponent
    },
    {
        path: 'scopes',
        component: ScopesComponent
    },
    {
        path: 'groups/:id',
        component: EditGroupComponent
    },
    {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, { useHash: true }) ], // add 'enableTracing: true' for tracing
    exports: [ RouterModule ]
})

export class AppRoutingModule {
    
    constructor () {
        console.log(this.constructor.name);
    }
}