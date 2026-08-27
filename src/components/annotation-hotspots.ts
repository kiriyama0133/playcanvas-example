import { Color, Entity, Vec3 } from 'playcanvas';
import { Annotation, AnnotationManager } from 'playcanvas/scripts/esm/annotations.mjs';

type HotspotData = {
    label: string;
    title: string;
    text: string;
    position: Vec3;
};

export const createAnnotationManagerEntity = () => {
    const manager = new Entity('annotation-manager');
    manager.addComponent('script');
    manager.script?.create(AnnotationManager, {
        properties: {
            hotspotSize: 28,
            hotspotColor: new Color(0.95, 0.95, 0.95),
            hoverColor: new Color(1, 0.6, 0.2),
            opacity: 1,
            behindOpacity: 0.3
        }
    });
    return manager;
};

export const createHotspotEntity = (data: HotspotData) => {
    const hotspot = new Entity(`annotation-${data.label}`);
    hotspot.setLocalPosition(data.position);
    hotspot.addComponent('script');
    hotspot.script?.create(Annotation, {
        properties: {
            label: data.label,
            title: data.title,
            text: data.text
        }
    });
    return hotspot;
};
