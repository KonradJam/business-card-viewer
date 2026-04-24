import { OrbitControls } from "three/examples/jsm/Addons.js";

export const createControls = (camera, renderer) => {
    const controls = new OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 0, 0);
    controls.maxDistance = 8;

    return controls;
};