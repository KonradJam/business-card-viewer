import { createScene } from "./createScene";
import { createCamera } from "./createCamera";
import { createRenderer } from "./createRenderer";
import { createTestMesh } from "./createTestMesh";
import { createControls } from "./createControls";
import { createLight } from "./createLight";
import { createShadowPlane } from "./createShadowPlane";
import { setupResizerHandler } from "./setupResizeHandler";

export const initScene = (container) => {
    const scene = createScene();
    const camera = createCamera(container);
    const renderer = createRenderer(container);
    
    const testMesh = createTestMesh();
    scene.add(testMesh);

    const shadowPlane = createShadowPlane();
    scene.add(shadowPlane);

    const { ambientLight, mainLight } = createLight();
    scene.add(ambientLight, mainLight);

    const controls = createControls(camera, renderer);

    setupResizerHandler({ container, camera, renderer });

    const animate = () => {
        controls.update();
        renderer. render(scene, camera);
        window.requestAnimationFrame(animate);
    };

    animate();

    return { scene, camera, renderer, controls };
};