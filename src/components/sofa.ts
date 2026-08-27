import { Asset, Entity, ModelHandler } from 'playcanvas';
import type { AppBase } from 'playcanvas';
import { ObjModelParser } from 'playcanvas/scripts/esm/parsers/obj-model.mjs';

const sofaUrl = new URL('../assets/models/couch.obj', import.meta.url).href;

const SOFA_SCALE = 0.001;
const SOFA_CENTER_X = -0.11273265;
const SOFA_GROUND_Y = -0.0274456;
const SOFA_CENTER_Z = 0.18354705;

let objParserRegistered = false;

const ensureObjParser = (app: AppBase) => {
    if (objParserRegistered) {
        return;
    }

    const modelHandler = app.loader.getHandler('model');
    if (!(modelHandler instanceof ModelHandler)) {
        throw new Error('Model handler is not available. Add ModelHandler to AppOptions.resourceHandlers.');
    }

    modelHandler.addParser(new ObjModelParser(app.graphicsDevice));
    objParserRegistered = true;
};

export const loadSofa = (app: AppBase) =>
    new Promise<Entity>((resolve, reject) => {
        ensureObjParser(app);

        const asset = new Asset('sofa', 'model', {
            url: sofaUrl
        });

        asset.once('error', (err: string) => {
            reject(new Error(`Failed to load sofa OBJ: ${err}`));
        });

        app.assets.add(asset);
        app.assets.load(asset);

        asset.ready((loadedAsset) => {
            const sofaRoot = new Entity('sofa');
            const sofaModel = new Entity('sofa-model');

            sofaModel.addComponent('model', {
                type: 'asset',
                asset: loadedAsset,
                castShadows: true,
                receiveShadows: true
            });

            // Keep the world transform on the semantic root and apply authoring fixes on a child.
            sofaModel.setLocalScale(SOFA_SCALE, SOFA_SCALE, SOFA_SCALE);
            sofaModel.setLocalPosition(SOFA_CENTER_X, SOFA_GROUND_Y, SOFA_CENTER_Z);

            sofaRoot.addChild(sofaModel);
            resolve(sofaRoot);
        });
    });
