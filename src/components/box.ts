import { Entity } from 'playcanvas';
import type { AppBase, StandardMaterial } from 'playcanvas';

import { loadBoardTexture } from '../textures/board-texture';

export const createBoardBox = async (app: AppBase) => {
    const box = new Entity('board-box');
    box.addComponent('render', {
        type: 'box',
        castShadows: true,
        receiveShadows: true
    });

    const texture = await loadBoardTexture(app);
    box.render?.meshInstances?.forEach((meshInstance) => {
        const material = meshInstance.material.clone() as StandardMaterial;
        material.diffuseMap = texture;
        material.update();
        meshInstance.material = material;
    });

    return box;
};
