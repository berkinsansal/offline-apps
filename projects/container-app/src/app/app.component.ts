import { getManifest, loadRemoteModule } from '@angular-architects/module-federation';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, SelectItem, TooltipOptions } from 'primeng/api';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { Theme } from './enums/theme.enum';
import { ThemeService } from './services/theme.service';
import { CustomManifest, setRoutePaths } from './utils/module-federation-config';
import { buildRoutes } from './utils/routes';

// RESOURCES FOR MODULE FEDERATION & MICRO FRONTEND
// https://github.com/angular-architects/module-federation-plugin/blob/main/libs/mf/tutorial/tutorial.md
// https://www.angulararchitects.io/en/aktuelles/dynamic-module-federation-with-angular/
// https://kgotgit.medium.com/monorepo-pattern-setting-up-angular-workspace-for-multiple-applications-in-one-single-repository-4e14bc0d0cc0
// https://www.bitovi.com/blog/how-to-build-a-micro-frontend-architecture-with-angular
// https://morioh.com/a/b62bf13246cc/how-to-deploy-micro-frontend-architecture-with-angular
// https://www.angulararchitects.io/en/aktuelles/module-federation-with-angulars-standalone-components/

// RESOURCES FOR OFFLINE APPS
// https://tharakamd-12.medium.com/make-an-angular-app-available-in-offline-getting-started-with-service-workers-in-angular-9e169e43c013
// https://www.bitovi.com/blog/module-federation-and-angular-service-workers-pwa

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    @ViewChild('footerPlaceHolder', { read: ViewContainerRef })
    viewContainer!: ViewContainerRef;

    title = 'container-app';
    themeOptions: SelectItem<Theme>[] = [
        { value: Theme.LIGHT },
        { value: Theme.DARK },
    ];
    selectedTheme = Theme.INITIAL;

    menuItems: MenuItem[] = [];

    constructor(
        private router: Router,
        private themeService: ThemeService) {

        this.themeService.themeChanged$.subscribe(theme => {
            this.selectedTheme = theme;
        });
    }

    async ngOnInit(): Promise<void> {
        const manifest = getManifest<CustomManifest>();

        const manifestForRouting: CustomManifest = Object.fromEntries(Object.entries(manifest).filter(x => x[1].isForRouting));
        const manifestForNotRouting: CustomManifest = Object.fromEntries(Object.entries(manifest).filter(x => !x[1].isForRouting));

        this.loadComponents(manifestForNotRouting);

        setRoutePaths(manifestForRouting);
        // Hint: Move this to an APP_INITIALIZER to avoid issues with deep linking
        const routes = buildRoutes(manifestForRouting);
        this.router.resetConfig(routes);

        this.setMenuItems(manifestForRouting);
    }

    async loadComponents(manifest: CustomManifest) {
        for (const remote of Object.values(manifest)) {
            // TODO: below codes are for footer mfe, make it generic later !!!!!!!!!!
            const m = await loadRemoteModule({
                type: 'module',
                remoteEntry: remote.remoteEntry,
                exposedModule: './Component'
            });

            const ref = this.viewContainer.createComponent<typeof m.MainComponent>(m.MainComponent);
            const compInstance = ref.instance;
            compInstance.menuItems = this.menuItems;
            // compInstance.colorPipe = ColorPipe;
            // compInstance.selectedTheme = this.selectedTheme;
        }
    }

    setMenuItems(manifest: CustomManifest) {
        const tooltipProps: TooltipOptions = {
            tooltipPosition: 'top',
            positionTop: -15,
            positionLeft: 15,
            showDelay: 100
        }

        this.menuItems.push({
            id: '0',
            label: 'Home',
            routerLink: 'home',
            icon: 'bi-house',
            tooltipOptions: {
                tooltipLabel: 'Home',
                ...tooltipProps,
            },
        });

        Object.values(manifest).forEach(remote => {
            this.menuItems.push({
                id: this.menuItems.length.toString(),
                label: remote.displayName,
                routerLink: remote.routePath,
                icon: remote.displayIcon,
                tooltipOptions: {
                    tooltipLabel: remote.displayName,
                    ...tooltipProps,
                },
            });
        });

        this.menuItems.push({
            id: this.menuItems.length.toString(),
            label: 'Manifest',
            routerLink: 'manifest',
            icon: 'bi-filetype-json',
            tooltipOptions: {
                tooltipLabel: 'Manifest',
                ...tooltipProps,
            },
        });
    }

    changeTheme(event: DropdownChangeEvent) {
        this.themeService.switchTheme(event.value);
    }

}
