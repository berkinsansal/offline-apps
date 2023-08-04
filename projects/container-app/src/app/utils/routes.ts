import { loadRemoteModule } from '@angular-architects/module-federation';
import { Route, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ManifestComponent } from '../manifest/manifest.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { CustomManifest } from './module-federation-config';

export function buildRoutes(manifest: CustomManifest): Routes {

    const routesBeginning: Routes = [
        {
            path: '',
            redirectTo: '/home',
            pathMatch: 'full',
        },
        {
            path: 'home',
            component: HomeComponent,
        },
        {
            path: 'manifest',
            component: ManifestComponent,
        },
    ];

    const routesEnding: Routes = [
        {
            path: '**',
            component: NotFoundComponent
        },
    ];

    const lazyRoutes: Routes = Object.keys(manifest).map(mfeKey => {
        const mfe = manifest[mfeKey];
        return {
            path: mfe.routePath,
            loadChildren: () =>
                loadRemoteModule({
                    type: 'manifest',
                    remoteName: mfeKey,
                    exposedModule: './Module'
                })
                    .then(m => m.MainModule)
        }
    });

    return [...routesBeginning, ...lazyRoutes, ...routesEnding];
}
