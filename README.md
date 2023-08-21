# Offline Apps

* This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.6
* Module Federation is used
* Netlify is used to deploy apps (new site definition is required for new MFE)

## Development server

Run `npm run run:all` for a dev server. All applications will open in the browser, `http://localhost:4200/` is container app. The application will automatically reload if you change any of the source files  
  
*If you want to open just container app and desired MFEs, you can edit `run:some` script in `package.json` file with desired app names*
```
"run:some": "node node_modules/@angular-architects/module-federation/src/server/mf-dev-server.js container-app mfe_1_name mfe_2_name ... mfe_n_name"
```

## Add new MFE

1. Move into the workspace directory,  
   Create the new application,  
   Create sub module and component for the new application,  
   Activate and configure Module Federation (`%PORT_NUMBER%` should be unassigned port, better to increase last used port by one):
```
cd offline-apps
ng generate application %APP_NAME% --routing --style=scss
ng generate module main --project %APP_NAME% --route main --module app
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
```

*  *Optional* - Simplify app.component.html of new application as below:

```
<h1>{{ title }} shell app</h1>
<a routerLink="main">Main</a>
<router-outlet></router-outlet>
```

## Deploy new MFE

1. Create `netlify.toml` file under `projects/%APP_NAME%`
```
[build]
  command = "npm run build %APP_NAME% && cp _redirects _headers dist/%APP_NAME%/"
  publish = "dist/%APP_NAME%"
  ignore = "git diff --quiet $CACHED_COMMIT_REF $COMMIT_REF -- projects/%APP_NAME%/"
```

2. Add new site in Netlify Web UI,  
   Change `site name`,  
   Update `Package directory` as `projects/%APP_NAME%`

3. Update `mf.manifest.json` of `container-app`:
```
{
    ...,
    ...,
    "%APP_NAME%": {
        "remoteEntry": "%NETLIFY_APP_URL%/remoteEntry.js",
        "displayName": "%APP_NAME%",
        "displayIcon": "bi-%ICON%"
    }
}
```
