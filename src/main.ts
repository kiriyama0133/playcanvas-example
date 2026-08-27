import {
    AppBase,
    AppOptions,
    CameraComponentSystem,
    ContainerHandler,
    FILLMODE_FILL_WINDOW,
    LightComponentSystem,
    RESOLUTION_AUTO,
    RenderComponentSystem,
    ScriptComponentSystem,
    TextureHandler,
    createGraphicsDevice
} from 'playcanvas';

import './style.css';
import { buildMainScene } from './scenes/main-scene';

const canvas = document.getElementById('application-canvas');

if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error('Application canvas was not found.');
}

const device = await createGraphicsDevice(canvas);
device.maxPixelRatio = Math.min(window.devicePixelRatio, 2);

const createOptions = new AppOptions();
createOptions.graphicsDevice = device;
createOptions.componentSystems = [
    RenderComponentSystem,
    CameraComponentSystem,
    LightComponentSystem,
    ScriptComponentSystem
];
createOptions.resourceHandlers = [TextureHandler, ContainerHandler];

const app = new AppBase(canvas);
app.init(createOptions);
app.start();

app.setCanvasFillMode(FILLMODE_FILL_WINDOW);
app.setCanvasResolution(RESOLUTION_AUTO);

const resize = () => app.resizeCanvas();
window.addEventListener('resize', resize);
app.on('destroy', () => {
    window.removeEventListener('resize', resize);
});

await buildMainScene(app);
