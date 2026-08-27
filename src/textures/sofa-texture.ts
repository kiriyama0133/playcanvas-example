import { FILTER_LINEAR, FILTER_LINEAR_MIPMAP_LINEAR } from 'playcanvas';
import type { AppBase, Texture } from 'playcanvas';

import { loadAsset } from '../utils/loadasset';

const sofaJPGUrl = new URL('../assets/textures/sofa.jpeg', import.meta.url).href;
export const loadSofaTexture = async (app: AppBase) => {
    const asset = await loadAsset(app, {
        name: 'sofa-texture',
        type: 'texture',
        url: sofaJPGUrl
    });

    const texture = asset.resource as Texture;
    texture.mipmaps = true;
    texture.minFilter = FILTER_LINEAR_MIPMAP_LINEAR;
    texture.magFilter = FILTER_LINEAR;
    texture.anisotropy = 8;
    return texture;
};
