import * as THREE from 'three';

export const createLight = () => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.2);
    mainLight.position.set(1, 2, 3);

    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;

    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 15;
    mainLight.shadow.camera.left = -6;
    mainLight.shadow.camera.right = 6;
    mainLight.shadow.camera.top = 6;
    mainLight.shadow.camera.bottom = -6;

    return { ambientLight, mainLight };
};