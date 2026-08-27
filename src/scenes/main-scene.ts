import type { AppBase } from 'playcanvas';
import { CameraFrame, Color, Entity, Vec3 } from 'playcanvas';
import { CameraControls } from 'playcanvas/scripts/esm/camera-controls.mjs';

import { createBoardBox } from '../components/box';
import { loadSofaGlb } from '../components/sofa-glb';

export const buildMainScene = async (app: AppBase) => {
    const camera = new Entity('camera');
    camera.addComponent('camera', {
        clearColor: new Color(0.5, 0.6, 0.9)
    });
    camera.setPosition(0, 1.1, 3.2);
    camera.lookAt(0, 0.45, 0);
    camera.addComponent('script');
    app.root.addChild(camera);

    const cameraFrame = new CameraFrame(app, camera.camera!);
    cameraFrame.bloom.intensity = 0.02;
    cameraFrame.bloom.blurLevel = 8;
    cameraFrame.update();

    camera.script?.create(CameraControls, {
        properties: {
            enableFly: false,
            enableOrbit: true,
            focusPoint: new Vec3(0, 0.45, 0)
        }
    });

    const sofa = await loadSofaGlb(app);
    app.root.addChild(sofa);

    const sofaGlowLight = new Entity('sofa-glow-light');
    sofaGlowLight.addComponent('light', {
        type: 'point',
        color: new Color(1, 0.6, 0.2),
        range: 2,
        intensity: 2,
        castShadows: false
    });
    sofaGlowLight.setPosition(0.4, 0.8, 0.2);
    app.root.addChild(sofaGlowLight);

    const box = await createBoardBox(app);
    box.setPosition(1.05, 0.2, 0);
    box.setLocalScale(0.4, 0.4, 0.4);
    app.root.addChild(box);

    const light = new Entity('light');
    light.addComponent('light');
    light.setEulerAngles(45, 0, 0);
    app.root.addChild(light);
};
