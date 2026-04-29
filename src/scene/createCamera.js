import * as THREE from 'three';

export const createCamera = (container) => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 5000);
    camera.position.set(-160, 0, 260);

    return camera;
};