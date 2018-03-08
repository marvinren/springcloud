import {RouterModule} from '@angular/router';
import {MainComponent} from './main.component';
import {AuthGuardService} from 'core';

export const mainRouting = RouterModule.forChild([
    {
        path: 'pages',
        component: MainComponent,
        canActivate: [AuthGuardService],
        canActivateChild: [AuthGuardService],
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'home'},
            {path: 'index', pathMatch: 'full', redirectTo: 'home'},
            {
                path: 'home',
                loadChildren: '../home/home.module#HomeModule',
                canActivate: [AuthGuardService],
                canActivateChild: [AuthGuardService]
            }, {
                path: 'system',
                loadChildren: '../system/system.module#SystemModule',
                canActivate: [AuthGuardService],
                canActivateChild: [AuthGuardService]
            },
        ]
    }
]);

