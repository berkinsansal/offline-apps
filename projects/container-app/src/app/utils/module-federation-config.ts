import { Manifest, RemoteConfig } from "@angular-architects/module-federation";

export type CustomRemoteConfig = RemoteConfig & {
    isForRouting: boolean;
    routePath?: string; // set automatically by its manifest key if isForRouting is true
    displayName?: string;
    displayIcon?: string;
};

export type CustomManifest = Manifest<CustomRemoteConfig>;

export function setRoutePaths(manifest: CustomManifest) {
    Object.keys(manifest).forEach(mfeKey => {
        manifest[mfeKey].routePath = mfeKey;
    });
}
