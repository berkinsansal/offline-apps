# Offline Apps

* This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.6.
* Module Federation is used
* Netlify is used to deploy apps (new site definition is required for new MFE)

## Development server

Run `npm run run:all` for a dev server. All applications will open in the browser, `http://localhost:4200/` is container app. The application will automatically reload if you change any of the source files.

## Add new MFE

1. Move into the workspace directory,  
   Create the new application,  
   Create sub module and component for the new application,  
   Create environment files for the new application,  
   Activate and configure Module Federation (`%PORT_NUMBER%` should be unassigned port, better to increase last used port by one):
```
cd offline-apps
ng generate application %APP_NAME% --routing --style=scss
ng generate module main --project %APP_NAME% --route main --module app
ng generate environments --project %APP_NAME%
ng add @angular-architects/module-federation --project %APP_NAME% --type remote --port %PORT_NUMBER%
```

2. Change `exposes` in `webpack.config.js` of the new application as below:
```
exposes: {
  './Module': './projects/%APP_NAME%/src/app/main/main.module.ts',
},
```

3. Update `mf.manifest.development.json` and `mf.manifest.json` of `container-app`:
```
// mf.manifest.development.json
{
    ...,
    ...,
    "%APP_NAME%": {
        "remoteEntry": "http://localhost:%PORT_NUMBER%/remoteEntry.js",
        "displayName": "%APP_NAME%",
        "displayIcon": "bi-%ICON%"
    }
}

// mf.manifest.json
{
    ...,
    ...,
    "%APP_NAME%": {
        "remoteEntry": "https://offline-apps-%APP_NAME%.netlify.app/remoteEntry.js",
        "displayName": "%APP_NAME%",
        "displayIcon": "bi-%ICON%"
    }
}
```

*  *Optional* - Simplify app.component.html of new application as below:

```
<h1>{{ title }} shell app</h1>
<a routerLink="main">Main</a>
<router-outlet></router-outlet>
```