// eslint-disable-next-line import-x/order
import {
    AppBase,
    AppOptions,
    CameraComponentSystem,
    Color,
    ContainerHandler,
    Entity,
    FILLMODE_FILL_WINDOW,
    LightComponentSystem,
    ModelComponentSystem,
    ModelHandler,
    RESOLUTION_AUTO,
    RenderComponentSystem,
    ScriptComponentSystem,
    TextureHandler,
    Vec3,
    createGraphicsDevice
} from 'playcanvas';

import './style.css';
import { CameraControls } from 'playcanvas/scripts/esm/camera-controls.mjs';

import { loadSofaGlb } from './components/sofa-glb';

const canvas = document.getElementById('application-canvas') as HTMLCanvasElement;

const device = await createGraphicsDevice(canvas);
device.maxPixelRatio = Math.min(window.devicePixelRatio, 2);

const createOptions = new AppOptions();
createOptions.graphicsDevice = device;
createOptions.componentSystems = [RenderComponentSystem, CameraComponentSystem, LightComponentSystem, ModelComponentSystem, ScriptComponentSystem];
createOptions.resourceHandlers = [TextureHandler, ContainerHandler, ModelHandler];

const app = new AppBase(canvas);
app.init(createOptions);
app.start();

// Set the canvas to fill the window and automatically change resolution to be the same as the canvas size
app.setCanvasFillMode(FILLMODE_FILL_WINDOW);
app.setCanvasResolution(RESOLUTION_AUTO);

// Ensure canvas is resized when window changes size
const resize = () => app.resizeCanvas();
window.addEventListener('resize', resize);
app.on('destroy', () => {
    window.removeEventListener('resize', resize);
});

// Create camera entity
const camera = new Entity('camera');
camera.addComponent('camera', {
    clearColor: new Color(0.5, 0.6, 0.9)
});
camera.setPosition(0, 1.1, 3.2);
camera.lookAt(0, 0.45, 0);
camera.addComponent('script');
app.root.addChild(camera);

camera.script?.create(CameraControls, {
    properties: {
        enableFly: false,
        enableOrbit: true,
        focusPoint: new Vec3(0, 0.45, 0)
    }
});

const sofa = await loadSofaGlb(app);
app.root.addChild(sofa);

// Create directional light entity
const light = new Entity('light');
light.addComponent('light');
light.setEulerAngles(45, 0, 0);
app.root.addChild(light);
