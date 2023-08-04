import { Manifest, RemoteConfig } from "@angular-architects/module-federation";

export type CustomRemoteConfig = RemoteConfig & {
    routePath: string;
    displayName: string;
    displayIcon: string;
};

export type CustomManifest = Manifest<CustomRemoteConfig>;

export function setRoutePaths(manifest: CustomManifest) {
    Object.keys(manifest).forEach(mfeKey => {
        manifest[mfeKey].routePath = mfeKey;
    });
}
