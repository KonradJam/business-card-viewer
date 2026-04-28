import * as THREE from 'three';

export const createLight = () => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.2);
    mainLight.position.set(80, 120, 140);

    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;

    mainLight.shadow.camera.near = 10;
    mainLight.shadow.camera.far = 500;
    mainLight.shadow.camera.left = -200;
    mainLight.shadow.camera.right = 200;
    mainLight.shadow.camera.top = 200;
    mainLight.shadow.camera.bottom = -200;

    return { ambientLight, mainLight };
};