import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/components/user.component';
import { UsersComponent } from './user/components/users.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: 'users/:id',
        component: UserComponent
    },
    {
        path: 'users',
        component: UsersComponent
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