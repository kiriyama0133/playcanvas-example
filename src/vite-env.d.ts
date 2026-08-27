/// <reference types="vite/client" />

declare module 'playcanvas/scripts/esm/camera-controls.mjs' {
    import type { Script } from 'playcanvas';

    export const CameraControls: typeof Script & (new () => Script);
}

declare module 'playcanvas/scripts/esm/grid.mjs' {
    import type { Script } from 'playcanvas';

    export const Grid: typeof Script & (new () => Script);
}

declare module 'playcanvas/scripts/esm/sky/procedural-sky.mjs' {
    import type { Script } from 'playcanvas';

    export const ProceduralSky: typeof Script & (new () => Script);
}

declare module 'playcanvas/scripts/esm/annotations.mjs' {
    import type { Script } from 'playcanvas';

    export const AnnotationManager: typeof Script & (new () => Script);
    export const Annotation: typeof Script & (new () => Script);
}

declare module 'playcanvas/scripts/esm/parsers/obj-model.mjs' {
    import type { GraphicsDevice, ResourceParser } from 'playcanvas';

    export class ObjModelParser implements ResourceParser {
        constructor(device: GraphicsDevice);
        canParse(context: {
            ext: string;
        }): boolean;
        load(
            url: string | { load: string; original: string },
            callback: (err: string | null, response?: any) => void,
            asset?: any
        ): void;
        open?(url: string, data: any, asset?: any): any;
    }
}
