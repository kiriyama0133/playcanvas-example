import { Asset, Entity } from 'playcanvas';
// eslint-disable-next-line import-x/no-duplicates
import type { AppBase, ContainerResource } from 'playcanvas';
// eslint-disable-next-line import-x/no-duplicates
import type { RenderComponent } from 'playcanvas';
import type { StandardMaterial } from 'playcanvas';

import { loadSofaTexture } from '../textures/sofa-texture';


const sofaUrl = new URL('../assets/models/couch.glb', import.meta.url).href;

const SOFA_GLB_TUNING = {
    boundsSource: 'vertices',
    dims: [1389.2999, 745.8267, 626.4423],
    center: [112.7327, 400.3589, -183.547],
    groundOffset: -27.4456,
    scale: 0.001,
    y: -0.0274456,
    yaw: 0
} as const;

export const loadSofaGlb = (app: AppBase) =>
    new Promise<Entity>((resolve, reject) => {
        const asset = new Asset('sofa-glb', 'container', {
            url: sofaUrl
        });

        asset.once('error', (err: string) => {
            reject(new Error(`Failed to load sofa GLB: ${err}`));
        });

        app.assets.add(asset);
        app.assets.load(asset);
        asset.ready(async (loadedAsset) => {
            const resource = loadedAsset.resource as ContainerResource;

            const root = new Entity('sofa');
            const yaw = new Entity('sofa-yaw');
            const visual = resource.instantiateRenderEntity({
                castShadows: true,
                receiveShadows: true
            });

            try {
                const texture = await loadSofaTexture(app);
                const renders = visual.findComponents('render') as RenderComponent[];
                renders.forEach((render) => {
                    render.meshInstances?.forEach((meshInstance) => {
                        const material = meshInstance.material.clone() as StandardMaterial;
                        material.emissive.set(1, 0.6, 0.2)
                        material.emissiveIntensity = 0.2
                        material.diffuseMap = texture;
                        material.update();
                        meshInstance.material = material;
                    });
                });
            } catch (err) {
                console.error(err);
            }

            yaw.setLocalEulerAngles(0, SOFA_GLB_TUNING.yaw, 0);
            visual.setLocalScale(
                SOFA_GLB_TUNING.scale,
                SOFA_GLB_TUNING.scale,
                SOFA_GLB_TUNING.scale
            );
            visual.setLocalPosition(
                -SOFA_GLB_TUNING.center[0] * SOFA_GLB_TUNING.scale,
                SOFA_GLB_TUNING.y,
                -SOFA_GLB_TUNING.center[2] * SOFA_GLB_TUNING.scale
            );

            yaw.addChild(visual);
            root.addChild(yaw);
            resolve(root);
        });
    });
