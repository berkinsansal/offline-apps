# Offline Apps

* This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.6.
* Module Federation is used

## Development server

Run `npm run run:all` for a dev server. All applications will open in the browser, `http://localhost:4200/` is container app. The application will automatically reload if you change any of the source files.

## Add new MFE
1. Move into the workspace directory and create the new application:  
```
cd offline-apps
ng generate application %APP_NAME% --routing --style=scss
```
2. Simplify app.component.html of new application as below:
```
<span>{{ title }} shell app</span>
<router-outlet></router-outlet>
```
3. Activate and configure Module Federation (`%PORT_NUMBER%` should be unassigned port, better to increase last used port by one):
```
ng add @angular-architects/module-federation --project %APP_NAME% --type remote --port %PORT_NUMBER%
```
4. Create sub module and component for the new application:
```
ng generate module %APP_NAME% --project %APP_NAME% --route TO_BE_EMPTY_STRING --module app
```
5. Change the `path` in the `AppRoutingModule` of the new application to an **empty string**:
```
const routes: Routes = [{ path: '', loadChildren: () => import('./%APP_NAME%/%APP_NAME%.module').then(m => m.%APP_NAME%Module) }];
```
6. Change `exposes` in `webpack.config.js` of the new application as below:
```
exposes: {
  './Module': './projects/%APP_NAME%/src/app/%APP_NAME%/%APP_NAME%.module.ts',
},
```
7. Update `mf.manifest.json` of `container-app`:
```
{
    ...,
    ...,
    "%APP_NAME%": {
        "remoteEntry": "http://localhost:%PORT_NUMBER%/remoteEntry.js",
        "displayName": "%APP_NAME%",
        "ngModuleName": "%APP_NAME%Module"
    }
}
```