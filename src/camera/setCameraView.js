import { VIEW_PRESETS } from "./viewPresets";

export const setCameraView = (camera, controls, viewName = 'front') => {
    const view = VIEW_PRESETS[viewName] ?? VIEW_PRESETS.front;

    camera.position.set(...view.position);
    controls.target.set(...view.target);
    controls.update();
};