import * as THREE from 'three';

export const createLights = () => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);

    const frontLight = new THREE.DirectionalLight(0xffffff, 2.2);
    frontLight.position.set(80, 120, 140);

    const backLight = new THREE.DirectionalLight(0xffffff, 2.2);
    backLight.position.set(-80, 120, -140);

    const lightTarget = new THREE.Object3D();
    lightTarget.position.set(0, 0, 0);

    frontLight.target = lightTarget;
    backLight.target = lightTarget;

    // frontLight.castShadow = true;
    // frontLight.shadow.mapSize.width = 2048;
    // frontLight.shadow.mapSize.height = 2048;

    // frontLight.shadow.camera.near = 10;
    // frontLight.shadow.camera.far = 500;
    // frontLight.shadow.camera.left = -200;
    // frontLight.shadow.camera.right = 200;
    // frontLight.shadow.camera.top = 200;
    // frontLight.shadow.camera.bottom = -200;

    return { ambientLight, frontLight, backLight, lightTarget };
};