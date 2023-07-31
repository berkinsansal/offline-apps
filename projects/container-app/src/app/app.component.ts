import { getManifest } from '@angular-architects/module-federation';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomManifest, CustomRemoteConfig, setRoutePaths } from './utils/module-federation-config';
import { buildRoutes } from './utils/routes';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'container-app';
    remotes: CustomRemoteConfig[] = [];

    constructor(
        private router: Router) {
    }

    async ngOnInit(): Promise<void> {
        const manifest = getManifest<CustomManifest>();
        setRoutePaths(manifest);

        // Hint: Move this to an APP_INITIALIZER 
        //  to avoid issues with deep linking
        const routes = buildRoutes(manifest);
        this.router.resetConfig(routes);

        this.remotes = Object.values(manifest);
    }

}
