import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
    },

    // remotes here:
    {
        path: 'calculator',
        loadChildren: () =>
            loadRemoteModule({
                type: 'manifest',
                remoteName: 'calculator',
                exposedModule: './Module'
            })
                .then(m => m.CalculatorModule)
    },
    {
        path: 'calendar',
        loadChildren: () =>
            loadRemoteModule({
                type: 'manifest',
                remoteName: 'calendar',
                exposedModule: './Module'
            })
                .then(m => m.CalendarModule)
    },

    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
