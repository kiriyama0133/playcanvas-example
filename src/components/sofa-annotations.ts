import { Entity, Vec3 } from 'playcanvas';
import { createHotspotEntity } from './annotation-hotspots';

const SOFA_HOTSPOTS = [
    {
        label: '1',
        title: 'Armrest',
        text: 'The wide armrest gives the sofa a heavier silhouette and a more lounge-like feel.',
        position: new Vec3(-0.46, 0.42, 0.16)
    },
    {
        label: '2',
        title: 'Seat Cushion',
        text: 'This central hotspot marks the main sitting area where softness and fabric details read best.',
        position: new Vec3(0.02, 0.34, 0.08)
    },
    {
        label: '3',
        title: 'Backrest',
        text: 'The backrest carries the main profile line of the sofa and is a good place to explain comfort or style.',
        position: new Vec3(0.0, 0.62, -0.14)
    }
] as const;

export const attachSofaAnnotations = (sofaRoot: Entity) => {
    SOFA_HOTSPOTS.forEach((hotspot) => {
        sofaRoot.addChild(createHotspotEntity(hotspot));
    });
};
