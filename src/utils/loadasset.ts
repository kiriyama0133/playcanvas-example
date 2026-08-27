import { Asset } from 'playcanvas';
import type { AppBase } from 'playcanvas';

type LoadAssetOptions = {
    name: string;
    type: ConstructorParameters<typeof Asset>[1];
    url: string;
};

export const loadAsset = (app: AppBase, options: LoadAssetOptions) =>
    new Promise<Asset>((resolve, reject) => {
        const existingAsset = app.assets.getByUrl(options.url);
        if (existingAsset) {
            existingAsset.once('error', (err: string) => {
                reject(new Error(`Failed to load asset '${options.name}': ${err}`));
            });

            app.assets.load(existingAsset);
            existingAsset.ready(() => {
                resolve(existingAsset);
            });
            return;
        }

        const asset = new Asset(options.name, options.type, {
            url: options.url
        });

        asset.once('error', (err: string) => {
            reject(new Error(`Failed to load asset '${options.name}': ${err}`));
        });

        app.assets.add(asset);
        app.assets.load(asset);
        asset.ready(() => {
            resolve(asset);
        });
    });
