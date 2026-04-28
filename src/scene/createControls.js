import { OrbitControls } from "three/examples/jsm/Addons.js";

export const createControls = (camera, renderer) => {
    const controls = new OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true;
    controls.enablePan = false;
    controls.dampingFactor = 0.05;

    controls.minDistance = 180;
    controls.maxDistance = 500;

    controls.target.set(0, 0, 0);
    controls.update();

    return controls;
};