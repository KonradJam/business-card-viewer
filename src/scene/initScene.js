import * as THREE from 'three';
import { createScene } from "./createScene";
import { createCamera } from "./createCamera";
import { createRenderer } from "./createRenderer";
import { createCard } from "./createCard.js";
import { createControls } from "./createControls";
import { createLights } from "./createLights.js";
import { setupResizerHandler } from "./setupResizeHandler";


export const initScene = (container) => {
    const scene = createScene();
    const camera = createCamera(container);
    const renderer = createRenderer(container);
    
    const card = createCard();
    scene.add(card.mesh);

    const { ambientLight, frontLight, frontLightSecondary, backLight, backLightSecondary } = createLights();
    scene.add( ambientLight, frontLight, frontLightSecondary, backLight, backLightSecondary );

    const controls = createControls(camera, renderer);

    setupResizerHandler({ container, camera, renderer });

    const animate = () => {
        controls.update();
        renderer.render(scene, camera);
        window.requestAnimationFrame(animate);
    };

    animate();

    return { card, scene, camera, renderer, controls };
};