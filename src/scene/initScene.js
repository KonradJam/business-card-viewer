import { createScene } from "./createScene";
import { createCamera } from "./createCamera";
import { createRenderer } from "./createRenderer";
import { createTestMesh } from "./createTestMesh";
import { createControls } from "./createControls";
import { createLight } from "./createLight";
import { createShadowPlane } from "./createShadowPlane";
import { setupResizerHandler } from "./setupResizeHandler";
import {
    DEFAULT_CARD_FORMAT_ID,
    DEFAULT_CARD_ORIENTATION
} from '../config/cardFormats.js'

export const initScene = (container) => {
    const scene = createScene();
    const camera = createCamera(container);
    const renderer = createRenderer(container);
    
    const card = createTestMesh();
    scene.add(card.mesh);

    const shadowPlane = createShadowPlane();
    scene.add(shadowPlane);

    const { ambientLight, mainLight } = createLight();
    scene.add(ambientLight, mainLight);

    const controls = createControls(camera, renderer);

    setupResizerHandler({ container, camera, renderer });

    const formatSelect = document.querySelector('#card-format-select');
    const orientationSelect = document.querySelector('#card-orientation-select');

    const applyCurrentCardFormat = () => {
        const formatId = formatSelect?.value ?? DEFAULT_CARD_FORMAT_ID;
        const orientation = orientationSelect?.value ?? DEFAULT_CARD_ORIENTATION;

        const { heightMm } = card.setCardFormat({ formatId, orientation });

        shadowPlane.position.y= -(heightMm / 2 + 8);

        controls.target.set(0, 0, 0);
        controls.update();
    };

    formatSelect?.addEventListener('change', applyCurrentCardFormat);
    orientationSelect?.addEventListener('change', applyCurrentCardFormat);

    applyCurrentCardFormat();

    const animate = () => {
        controls.update();
        renderer.render(scene, camera);
        window.requestAnimationFrame(animate);
    };

    animate();

    return { scene, camera, renderer, controls };
};