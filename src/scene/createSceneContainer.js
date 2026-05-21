import { initScene } from "./initScene";

export const createSceneContainer = () => {
    const container = document.querySelector('#scene-container');

    if (!container) {
        throw new Error('Scene container was not found');
    }
    
    return initScene(container);
};