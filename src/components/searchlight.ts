/* eslint-disable import-x/no-duplicates */
import type { AppBase, Color, StandardMaterial, Vec3 } from 'playcanvas';
import { BLEND_ADDITIVE, Color as PcColor, CULLFACE_NONE, Entity, FOG_EXP2 } from 'playcanvas';

export const createSearchLight = 
(app: AppBase, position: Vec3, rotation_speed: number, color: Color, intensity: number, range: number) => {
    app.scene.fog.type = FOG_EXP2;
    app.scene.fog.color = new PcColor(0.18, 0.2, 0.24);
    app.scene.fog.density = 0.012;
    const root = new Entity('search-light-root');
    const searchLight = new Entity('search-light');
    const beam = new Entity('search-light-beam');
    beam.addComponent('render', {
        type: 'cone',
        castShadows: false,
        receiveShadows: false
    });
    const render = beam.render;
    if (render && render.meshInstances) {
        render.meshInstances.forEach((meshInstance) => {
            const material = meshInstance.material.clone() as StandardMaterial;
            material.useLighting = false;
            material.emissive.set(color.r, color.g, color.b);
            material.emissiveIntensity = 2;
            material.opacity = 0.08;
            material.blendType = BLEND_ADDITIVE;
            material.depthWrite = false;
            material.cull = CULLFACE_NONE;
            material.update();
            meshInstance.material = material;
        });
    }

    beam.setLocalScale(0.1, 1, 0.1);
    beam.setLocalPosition(0, -0.5, 0);
    searchLight.addComponent('light', {
        type: 'spot',
        color,
        innerConeAngle: 20,
        outerConeAngle: 30,
        range,
        intensity,
        castShadows: false
    });
    root.setPosition(position);
    // PlayCanvas spot lights emit along the entity's negative Y axis.
    // Rotate 90 degrees on X so yaw rotation sweeps horizontally across the scene.
    searchLight.setLocalEulerAngles(90, 0, 0);
    root.addChild(searchLight);
    searchLight.addChild(beam);

    let angle = 0;
    const update = (dt: number) => {
        angle += rotation_speed * dt;
        searchLight.setLocalEulerAngles(90, angle, 0);
    };
    app.on('update', update);
    app.on('destroy', () => {
        app.off('update', update);
    });
    const destroy = () => {
        app.off('update', update);
    };
    app.root.addChild(root);
    return { searchLight, destroy };
};
